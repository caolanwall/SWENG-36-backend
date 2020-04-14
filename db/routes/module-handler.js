const path = require('path')

const Module = require(path.join(__dirname, '..', 'models', 'Module-model.js'))

//works
const createNewModule = async (Id, Name, Instructor_IDs, Student_IDs, Assignment_IDs, callback
    ) => {

      try {
        const Module = new Module({
          id: Id,
          name: Name,
          instructor_IDs : Instructor_IDs,
          student_IDs : Student_IDs,
          assignment_IDs : Assignment_IDs
        });
        Module
          .save()
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
        callback(Module);
      } catch (e) {
        console.log(e);
      }
    };

//works
 const updateModule = async (Id, Name, Instructor_IDs, Student_IDs, Assignment_IDS, callback
  ) => {
  try {
    const dummy = await Module.updateOne({"_id": Id }, {$set:
      {
          "id": Id,
          "name": Name,
          "instructor_IDs" : Instructor_IDs,
          "student_IDs" : Student_IDs,
          "assignment_IDS" : Assignment_IDS
      }
    });
    const ret = await Module.find({"_id": Id});
    callback(ret);
  } catch (e) {
    console.log(e);
  }
};

//works
const getModuleById = async (id, callback) => {
  try {
    const ret = await Module.find({ "_id":id });
    callback(ret);
  } catch (e) {
    error();
  }
};

//TODO:returned empty array
const getModule = async (callback) => {
  try {
    const ret = await json(Module.find({}));
    callback(ret);
  } catch (e) {
    error();
  }
};

//works
const deleteModule = async (id, callback)=>{
  try{
    const ret = await Module.deleteOne({ "_id": id});
    callback(ret);
  }catch(e){
    callback(e);
  }
}


module.exports = {
  createNewModule: createNewModule,
  updateModule: updateModule,
  getModule: getModule,
  getModuleById: getModuleById,
  deleteModule: deleteModule
};
