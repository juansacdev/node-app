const { Router } = require('express');
const router = Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');


router.get('/notes/add', isAuthenticated,(req, res) => {
    res.render('notes/new-note');
});


router.post('/notes/new-notes', isAuthenticated,async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({text: 'Please Write a Title'});
    }
    if (!description) {
        errors.push({text: 'Please Write a Description'})
    }
    if (errors.length > 0) {
        console.log(errors);
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota agregada exitosamente');
        console.log(newNote);
        res.redirect('/notes');
    }
});


router.get('/notes', isAuthenticated,async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    const note = await Note.findById(req.params.id)
    res.render('notes/edit-notes', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated,async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg','Nota actualizada satifactoriamente');
    res.redirect('/notes')
});

router.delete('/notes/delete/:id', isAuthenticated,async (req, res) => {
    console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Nota borrada satifactoriamente');
    res.redirect('/notes');
});
















module.exports = router;