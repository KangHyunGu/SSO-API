module.exports = (sequelize, DataTypes) => {
	const token = sequelize.define('token', {
		socketId : {
			type : DataTypes.STRING,
			primaryKey : true,
		},
		token:{
			type : DataTypes.TEXT
		}
	}, {
		freezeTableName: true,
	});
	token.associate = function (models) {
		// associations can be defined here
	};
	return token;
};