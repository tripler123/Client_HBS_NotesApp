const router = require('express').Router();

const Note = require('../models/Note')

router.get('/notes/add', (req, res) => {
  res.render('notes/new-note')
});

router.get('/notes', async (req, res) => {
 const notes = await Note.find().sort({date:'desc'});
 res.render('notes/all-notes', {notes})
});

router.post('/notes/new-note', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
 
  if(!title){
    errors.push({text :'Ingrese el titulo'})
  }
  if(!description){
    errors.push({text: 'Ingrese una descripción'})
  }
  if(errors.length > 0){
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  }
  else{
   const newNote = new Note({title, description});
    console.log(newNote);  
    await newNote.save();
    res.redirect('/notes')
  }
});

module.exports = router;