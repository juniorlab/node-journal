const http = require('http');
const express = require('express');
const db = require('./models').db;
const bodyParser = require('body-parser');
const postRouter = require('./api/post');
const nunjucks = require('nunjucks');
const path = require('path');
const Post = require('./models').Post;

const app = express();
app.use(bodyParser.json());
app.use('/api/post', postRouter);
app.use(express.static(path.resolve(__dirname, 'dist')));
nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app,
});

app.get('/', async (req, res) => {
    const posts = await Post.findAll();
    res.render('home.nunj', {
        posts: Array.from(posts).reverse()
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.render('post.nunj', {
            post,
        })
    }
});

db.authenticate()
    .then(() => {
        console.log('Connection to db established');
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log('Server is listening on port 3000')
        })
    })
    .catch((e) => {
        console.log('Unable to connect to db:', e)
    });
