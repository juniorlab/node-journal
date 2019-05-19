const router = require('express').Router();
const Post = require('../models').Post;

router.get('/', async (req, res) => {
    res.json(await Post.findAll())
});

router.post('/', async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
});

module.exports = router;
