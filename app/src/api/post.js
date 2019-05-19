const router = require('express').Router();
const Post = require('../models').Post;

router.get('/', async (req, res) => {
    res.json(await Post.findAll())
});

router.post('/', async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});

router.put('/:id', async (req, res) => {
    const [affectedCount] = await Post.update(req.body, {
        where: {
            id: req.params.id,
        }
    });
    if (affectedCount === 0) {
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }
});

router.delete('/:id', async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send(200);
});

module.exports = router;
