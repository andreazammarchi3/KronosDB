const path = require('path');
const moviesModel = require('../models/moviesModel');

exports.list_movies = async (req, res) => {
    if (req.query) {
        if ("last" in req.query) {
            try {
                res.json(await moviesModel.findOne({}).sort('-released')).limit(1);
            } catch (err) {
                res.json(err);
            }
        } else {
            try {
                res.json(await moviesModel.find(req.query));
            } catch (err) {
                res.json(err);
            }
        }
    } else {
        try {
            res.json(await moviesModel.find({}));
        } catch (err) {
            res.json(err);
        }
    }
};

exports.get_movie = async (req, res) => {
    try {
        res.json(await moviesModel.findById(req.params.id));
    } catch (err) {
        res.json(err);
    }
};

exports.create_movie = async (req, res) => {
    const Movie = new moviesModel(req.body);
    try {
        res.json(await Movie.save());
    } catch (err) {
        res.json(err);
    }
};

exports.update_movie = async (req, res) => {
    try {
        res.json(await moviesModel.findByIdAndUpdate(req.params.id, req.body, {new: true}));
    } catch (err) {
        res.json(err);
    }
};

exports.delete_movie = async (req, res) => {
    try {
        res.json(await moviesModel.findByIdAndDelete(req.params.id));
    } catch (err) {
        res.json(err);
    }
};
