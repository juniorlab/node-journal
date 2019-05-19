module.exports = (db, Sequelize) => {
    return db.define('Post', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        body: {
            allowNull: false,
            type: Sequelize.TEXT,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        }
    })
};
