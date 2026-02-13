var express = require('express');
var router = express.Router();
const petController = require('../controllers/pet_controller');
const userController = require('../controllers/user_controller');
const sightingController = require('../controllers/sighting_Controller');

function addUserToViews(req, res, next) {
    if(req.user) {
        res.locals.user = req.user;
    }
    next();
}

function redirectGuests(req, res, next) {
    if(!req.user) {
        res.redirect('login');
    } else {
        next();
    }
}

//Pets
router.get('/', addUserToViews, petController.index);

router.get('/add', addUserToViews, redirectGuests, petController.renderAddLost);
router.post('/add', addUserToViews, petController.addPet);

router.get('/edit/:id', addUserToViews, redirectGuests, petController.renderEditPet);
router.post('/edit/:id', addUserToViews, petController.updatePet);

router.get('/delete/:id', addUserToViews, petController.deletePet);

//Sightings
router.get('/forum',addUserToViews, sightingController.forum);

//Users
router.get('/register', addUserToViews, userController.renderRegistration)
router.post('/register', addUserToViews, userController.registerUser)
router.get('/login', addUserToViews, userController.renderLogin)
router.post('/login', addUserToViews, userController.authenticate)
router.get('/logout', addUserToViews, userController.logout)

router.get('/profile/:id', addUserToViews ,userController.renderProfile)
module.exports = router;
