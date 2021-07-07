const Post = require('../models/post');
const createError = require('http-errors');

exports.create = (req, res, next) => {
    let model = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id
    });

    model.save()
        .then(post => {
            res.json();
        })
        .catch(next);
};

exports.list = (req, res, next) => {
    Post.find()
        .select("-Comments")
        .sort({ created_at: 'desc' })
        .populate('author', 'name')
        .then(posts => {
            res.json(posts);
        })
        .catch(next);
}

exports.details = (req, res, next) => {
    let PostId = req.params.id;
    Post.findById(PostId)
        .populate('author','name')
        .populate('comments.author','name')
        .then(post => {
            if (!post) throw createError(404);
            res.json(post);
        })

        .catch(next);
}


exports.update = (req, res, next) => {
    let PostId = req.params.id;
    let data = {
        title: req.body.title,
        content: req.body.content

    };

    Post.findOneAndUpdate({
        _id: PostId, author: req.user.id
    }, data, { runValidators: true })
        .then(post => {
            if (!post) throw createError(404);
            res.json();
        })

        .catch(next);
}

exports.delete = (req, res, next) => {
    let postId = req.params.id;
    Post.findOneAndDelete({_id: postId, author: req.user.id})
    .then(post => {
        if(!post) throw createError(404);
        res.json();
    })
    .catch(next);
};