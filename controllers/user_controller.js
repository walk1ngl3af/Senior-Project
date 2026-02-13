const {User} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistration = function (req, res) {
    res.render('users/register');
}

module.exports.registerUser = async function (req, res) {
    const existingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (existingUser) {
        res.render('users/register', {
            error: 'User Already Exists'
        })
    } else {
        await User.create(
            {
                name: req.body.name,
                password: md5(req.body.password),
                email: req.body.email
            }
        );
        res.redirect('/')
    }
}

module.exports.renderLogin = function (req, res) {
    let error = null
    console.log(req.session);
    if (req.session.messages && req.session.messages.length > 0) {
        error = req.session.messages[0]
    }
    res.render('users/login', {error});
}

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function (req, res, next) {
    req.logout(function(err){
        if(err) {return next(err);}
        res.redirect('/login');
    });
}

module.exports.renderProfile = async function (req, res) {
    const Cuser = await User.findByPk(req.params.id);
    res.render('users/profile', {Cuser})
}