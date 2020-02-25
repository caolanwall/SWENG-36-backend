const path = require('path')

const User = require(path.join(__dirname, '..', 'models', 'user-model.js'))
const createNewUser = async ( userName, Id, callback

    ) => {
      try {    
        const user = new User({
          name: userName,
          id: Id,
        });
        user
          .save()
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
        callback(user);
      } catch (e) {
        console.log(e);
      }
    };

module.exports = createNewUser