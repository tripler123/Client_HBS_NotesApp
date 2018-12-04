const router = require('express').Router();

const Note = require('../models/Note');

//Helpers
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note')
});

router.get('/notes',isAuthenticated,  async (req, res) => {
 const notes = await Note.find({user: req.user.id}).sort({date:'desc'});
 res.render('notes/all-notes', {notes})
});


router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.render('notes/edit-note', {note})
})


router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const { title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Nota Actualizada')
  res.redirect('/notes')
})

router.delete('/notes/delete/:id' , isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Nota Eliminada')
  res.redirect('/notes');
})

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
   newNote.user = req.user.id;
    console.log(newNote);  
    await newNote.save();
    req.flash('success_msg', 'Nota Agregada')
    res.redirect('/notes')
  }
});

module.exports = router;