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
