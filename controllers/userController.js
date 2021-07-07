const User = require('../models/user');
const createError = require('http-errors');

exports.create = (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        res.json(user);
    })
    .catch(next);
};


exports.list = (req, res, next) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(next);
};


exports.show = (req, res, next) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) throw createError(404, "User not found.");
        res.json(user);
    })
    .catch(next);
};


exports.update = (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    User.findByIdAndUpdate(req.params.id, data)
    .then(updatedUser => {
        if(!updatedUser) throw createError(404, "User not found.");
        res.json();
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(deleted => {
        if(!deleted) throw createError(404, "User not found.");
        res.json({message: "User deleted"});
    })
    .catch(next);
};
