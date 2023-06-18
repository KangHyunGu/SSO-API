const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = function(config, modelPath, log = true) {
    const sequelizeConfig = {
        ...config,
        dialect: "mysql",
        timezone : "+09:00",
		dialectOptions: {
			charset: 'utf8mb4',
			dateStrings: true,
			typeCast: true
		},
		define: {
			timestamps: true
		},
        logging: log ? console.log : false
    }
    const sequelize = new Sequelize(
        config.database,
        config.user,
        config.password,
        sequelizeConfig
    );
    
    const db = {};
    fs.readdirSync(modelPath).filter(file => {
        return file.slice(-3) == '.js';
    }).forEach( file => {
        const model = require(path.join(modelPath, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });
    
    Object.keys(db).forEach(modelName => {
        if(db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.sequelize.sync({
        alter : process.env.NODE_ENV == 'development'
    });

    return db;
}