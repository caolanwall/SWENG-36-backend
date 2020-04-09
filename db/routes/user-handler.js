const path = require('path')

const User = require(path.join(__dirname, '..', 'models', 'user-model.js'))


const createNewUser = async ( userName, Id, Pass, Modules, Role, Assignments, callback
    ) => {
      try {
        const user = new User({
          name: userName,
          id: Id,
          pass: Pass,
          modules: Modules,
          role: Role,
          assignments: Assignments,
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

//works
const updateUser = async ( userName, Id, Pass, Modules, Role, Assignments, callback
  ) => {
  try {
    const dummy = await User.updateOne({"id": Id }, {$set:
      {
        "name": userName,
        "id": Id,
        "pass": Pass,
        "modules": Modules,
        "role": Role,
        "assignments": Assignments,
      }
    });
    const ret = await User.find({"id": Id});
    callback(ret);
  } catch (e) {
    console.log(e);
  }
};

const addModuleToUser = async (id, module, callback) => {
  try {
    const ret = await User.findOne({ id :id });
    if (ret != null){
      console.log(ret);
      const data = new User(ret);
      data.modules.push(module);
      data
      .save()
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
      callback(data);
    } else {
      callback("User not found");
    }
  } catch (e) {
    error();
  }
};

const removeModuleUser = async (id, module, callback) => {
  try {
    const ret = await User.findOne({ id :id });
    if (ret != null){
      console.log(ret);
      const data = new User(ret);
      for( var i = 0; i < data.modules.length; i++){
        console.log(data.modules[i])
        if ( data.modules[i] === module) {
          data.modules.splice(i, 1);
        }
      }
      data
      .save()
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
      callback(data);
    } else {
      callback("User not found");
    }
  } catch (e) {
    error();
  }
};

//works
const getUserById = async (id, callback) => {
  try {
    const ret = await User.find({ "id":id });
    callback(ret);
  } catch (e) {
    error();
  }
};

const getUserByRole = async (role, callback) => {
  try {
    const ret = await User.find({ "role":role });
    callback(ret);
  } catch (e) {
    error();
  }
};

//TODO:returned empty array
const getUser = async (callback) => {
  try {
    const ret = await json(User.find({}));
    callback(ret);
  } catch (e) {
    error();
  }
};

//works
const deleteUser = async (id, callback)=>{
  try{
    const ret = await User.deleteOne({ "id": id});
    callback(ret);
  }catch(e){
    callback(e);
  }
}

module.exports = {
  createNewUser: createNewUser,
  updateUser: updateUser,
  getUser: getUser,
  getUserById: getUserById,
  getUserByRole: getUserByRole,
  deleteUser:deleteUser,
  addModuleToUser: addModuleToUser,
  removeModuleUser: removeModuleUser
};
