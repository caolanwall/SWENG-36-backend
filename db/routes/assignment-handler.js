const path = require('path')

const Assignment = require(path.join(__dirname, '..', 'models', 'assignment-model.js'))

//works
const createNewAssignment = async ( Id, Title, Description, Module_Code, Attachments, Draft_Start, Draft_End, Review_Start, Review_End, Final_Start, Final_End,
    Review_Count, Old_Weight, Samples, Samples_Score, Marking_Scheme, callback
    ) => {
    
      try {    
        const assignment = new Assignment({
          id : Id,
          title : Title,
          description : Description,
          module_Code : Module_Code,
          attachments : Attachments,
          draft_Start : Draft_Start,
          draft_End : Draft_End,
          review_Start : Review_Start,
          review_End : Review_End,
          final_Start : Final_Start,
          final_End : Final_End,
          review_Count : Review_Count,
          old_Weight : Old_Weight,
          samples : Samples,
          samples_Score : Samples_Score,
          marking_Scheme : Marking_Scheme,
        });
        assignment
          .save()
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
        callback(assignment);
      } catch (e) {
        console.log(e);
      }
    };

//works
 const updateAssignment = async ( Id, Title, Description, Module_Code, Attachments, Draft_Start, Draft_End, Review_Start, Review_End, Final_Start, Final_End,
  Review_Count, Old_Weight, Samples, Samples_Score, Marking_Scheme, callback
  ) => {
  try {
    const dummy = await Assignment.updateOne({"id": Id }, {$set: 
      { 
        "id" : Id,
        "title" : Title,
        "description" : Description,
        "module_Code" : Module_Code,
        "attachments" : Attachments,
        "draft_Start" : Draft_Start,
        "draft_End" : Draft_End,
        "review_Start" :  Review_Start,
        "review_End" : Review_End,
        "final_Start" : Final_Start,
        "final_End" : Final_End,
        "review_Count" : Review_Count,
        "old_Weight" : Old_Weight,
        "samples" : Samples,
        "samples_Score" : Samples_Score,
        "marking_Scheme" : Marking_Scheme
      }
    });
    const ret = await Assignment.find({"id": Id});
    callback(ret);
  } catch (e) {
    console.log(e);
  }
};

//works
const getAssignmentById = async (id, callback) => {
  try {
    const ret = await Assignment.find({ "id":id });
    callback(ret);
  } catch (e) {
    error();
  }
};

//TODO:returned empty array
const getAssignment = async (callback) => {
  try {
    const ret = await json(Assignment.find({}));
    callback(ret);
  } catch (e) {
    error();
  }
};

//works
const deleteAssignment = async (id, callback)=>{
  try{
    const ret = await Assignment.deleteOne({ "id": id});
    callback(ret);
  }catch(e){
    callback(e);
  }
}

    
module.exports = {
  createNewAssignment: createNewAssignment,
  updateAssignment: updateAssignment,
  getAssignment: getAssignment,
  getAssignmentById: getAssignmentById,
  deleteAssignment: deleteAssignment
};