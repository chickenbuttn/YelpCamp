const { model } = require('mongoose');
const User = require('../models/user');

module.exports = {
    renderRegister: (req, res) => {
        res.render('users/register')
    },
    register: async (req, res, next) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'Welcome to Yelp Camp!');
                res.redirect('/campgrounds');
            })
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/register')
        }
    },
    renderLogin: (req, res) => {
        res.render('users/login')
    },
    login: (req, res) => {
        req.flash('success', 'Welcome Back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    },
    logout: (req, res) => {
        req.logout(function () {
            req.flash('success', 'Goodbye!');
            res.redirect('/campgrounds');
        });
    }
}