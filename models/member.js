const genPassword = require('../lib/genPassword')

module.exports = (sequelize, DataTypes) => {
	const member = sequelize.define('member', {
		mb_email: {
			type: DataTypes.STRING,
			unique: 'email',
			allowNull: false,
			validate: {
				isEmail: {
					msg: '이메일 형식에 맞게 입력하세요',
				},
			}
		},
		mb_password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				this.setDataValue('mb_password', genPassword(value));
			},
			get() {
				return undefined;
			}
		},
		mb_name: {
			type: DataTypes.STRING,
			defaultValue: '',
			allowNull: false,
			validate: {
				len: {
					args: [2, 30],
					msg : '이름은 2자이상 입력하세요.'
				}
			}
		},
		mb_hp: {
			type: DataTypes.STRING,
			allowNull: true,
			validate : {
				is:{
					args : /^(\d{2,3}-)?\d{3,4}-\d{4}$/,
					msg : "전화번호 형식에 맞게 입력하세요."
				}
			}
		}
	}, {
		freezeTableName: true,
	});
	member.associate = function (models) {
		// associations can be defined here
	};
	return member;
};