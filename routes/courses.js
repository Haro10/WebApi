const express = require('express');
const router = express.Router();


const courses = [
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
];

router.get('/', (req, res) =>{
  res.send(courses);
});

router.get('/:id', (req, res) => {
  // res.send(req.params.id);
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

//POST
router.post('/', (req,res) => {
  const { error } = validateCourse(req.body); // error

  if(error){
     //400 bad request
     res.status(400).send(error.details[0].message);
     return;
  }

   const course = {
     id: courses.length + 1,
     name:req.body.name
   };
   courses.push(course);
   res.send(course);
});

//PUT
router.put('/:id', (req, res)=> {
//Look up the course
// If not existing. return 404
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) return res.status(404).send('The course with the given ID was not found');

const { error } = validateCourse(req.body); // error

if(error){
  //400 bad request
  res.status(400).send(error.details[0].message);
  return;
} 

//Update course
course.name = req.body.name;

//Return the updated course
res.send(course);

});

//DELETE
router.delete('/:id', (req, res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if(!course) res.status(404).send('The course with the given ID was not found');

res.send("run over here");

//having that -> delete that
const index = courses.indexOf(course);
courses.splice(index,1);

//Return the same course
res.send(courses);
});


function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
    };
return Joi.validate(course, schema);
}

module.exports = router;

