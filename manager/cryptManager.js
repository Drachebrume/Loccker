// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// module.exports = {
//   encrypt: async function (passwordPlain) {
//     return bcrypt.hash(passwordPlain, saltRounds);
//   },
//   // returns true or false
//   compare: async function (passwordPlain, passwordCrypted) {
//     return bcrypt.compare(passwordPlain, passwordCrypted)
//   },
// }
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  encrypt: function (passwordPlain) {
    return bcrypt.hashSync(passwordPlain, salt);
  },
  // returns true or false
  compare: async function (passwordPlain, passwordCrypted) {
    return bcrypt.compareSync(passwordPlain, passwordCrypted)
  },
}