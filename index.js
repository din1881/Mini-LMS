const Joi = require('joi');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
//const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }));
// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}....`));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'index.html')); 
  });

  app.get('/web/students/create', function(req,res){ 
    res.sendFile(path.join(__dirname,'add_student.html')); 
  }); 
  app.get('/web/courses/create', function(req,res){
    res.sendFile(path.join(__dirname,'add_course.html')); 
  });

const students =[];

const courses = [];

// Get course by id
app.get('/api/courses/:id', (req, res) => 
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('The course is not found'); //404
        return;
    } 
    res.send(req.params);
});

//Get student by id
app.get('/api/students/:id', (req, res) => 
{
    const student = students.find(c => c.id ===parseInt(req.params.id));
    if(!student)
    {
        res.status(404).send('The student is not found'); //404
        return;
    } 
    res.send(req.params);
});


// Get all Courses
app.get('/api/courses/',  (req, res) => 
{
    res.send(courses);
});

// Get all students
app.get('/api/students/', (req, res) => 
{
    res.send(students);
});

// Create course
app.post('/api/courses', urlencodedParser, (req, res) => 
{
    
    //const schema = {
      //  name: Joi.string().min(3).required(),
        //code: Joi.string().alphanum().min(3).required,
        //description: Joi.string().min(3).required()
    //}
    //const result = Joi.validate(req.body);
       
    //if (result.error) {
      //  res.status(400).send(result.error.details[0].message);
        //return;
    //}

    const course = {
        id: courses.length + 1,
        name: req.body.name,
        code: req.body.code,
        description: req.body.description

    };
    courses.push(course);
    res.send(course);
});

// Create student
app.post('/api/students', (req, res) => 
{
    
    //const schema = {
      //  name: Joi.string().min(3).required(),
        //code: Joi.string().alphanum().min(3).required
    //}
    //const result = Joi.validate(req.body);
       
    //if (result.error) {
      //  res.status(400).send(result.error.details[0].message);
        //return;
    //}

    const student = {
        id: students.length + 1,
        name: req.body.name,
        code: req.body.code,
    };
    students.push(student);
    res.send(student);
});


// Update Course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

 
    // Update the course 
    // Return the updated course
    course.name = req.body.name; 
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);   
});


// Upadate Student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student)
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }


    // Update the course 
    // Return the updated course
    student.name = req.body.name;
    student.code = req.body.code;
    res.send(student);
});


// Delete Course
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the deleted course
    res.send(course);
});


// Delete Student
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) {
        res.status(400).send('ID is not found');
        return;
    }

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(students);
})




function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        code: Joi.string().alphanum().min(3).required,
        description: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

function validateStudent(student) {
    const schema = {
        name: Joi.string().min(3).required(),
        code: Joi.string().alphanum().min(3).required
    }
    return Joi.validate(student, schema);
}