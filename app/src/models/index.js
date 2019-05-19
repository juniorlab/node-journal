const Sequelize = require('sequelize');
const createPost = require('./Post');

const db = new Sequelize('postgres://postgres:example@localhost:5432/postgres');
const Post = createPost(db, Sequelize);

module.exports = {
    db,
    Post,
};
