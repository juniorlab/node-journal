'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Posts', {
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Posts');
    }
};
