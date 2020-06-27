const {
  Sequelize,
  Model,
  DataTypes: { STRING },
} = require('sequelize')
const { hashSync, genSaltSync } = require('bcrypt')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: null,
  storage: 'test.db',
})

class User extends Model {}
User.init(
  {
    password: STRING,
    email: STRING,
    salt: STRING,
  },
  { sequelize, modelName: 'users' }
)

module.exports = () => {
  sequelize.sync({ force: true }).then(() => {
    console.log('DB INIT DONE')
    const salt = genSaltSync()
    // creating the default user
    User.create({
      email: '123@123.123',
      password: hashSync('123123', salt),
      salt,
    }).then(() => console.log('created the default user'))
  })
  return User
}
