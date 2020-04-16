const path = require('path')

const Assignment = require(path.join(__dirname, '..', 'models', 'assignment-model.js'))

//works
const createNewAssignment = async (Title, Description, Module_Code, Attachments, Draft_Start, Draft_End, Review_Start, Review_End, Final_Start, Final_End,
    Review_Count, Old_Weight, Samples, Samples_Score, Marking_Scheme, callback
    ) => {

      try {
        const assignment = new Assignment({
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
 const updateAssignment = async (Title, Description, Module_Code, Attachments, Draft_Start, Draft_End, Review_Start, Review_End, Final_Start, Final_End,
  Review_Count, Old_Weight, Samples, Samples_Score, Marking_Scheme, callback
  ) => {
  try {
    const dummy = await Assignment.updateOne({"_id": Id }, {$set:
      {
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
    const ret = await Assignment.find({"_id": Id});
    callback(ret);
  } catch (e) {
    console.log(e);
  }
};

//works
const getAssignmentById = async (id, callback) => {
  try {
    const ret = await Assignment.find({ "_id":id });
    callback(ret);
  } catch (e) {
    error();
  }
};

const getAssignmentByModule = async (module, callback) => {
	try {
		console.log("GETTING ASSM BY MODULE")
		const ret = await Assignment.find({ "module_Code": module });
		callback(ret);
	} catch (e) {
		callback({})
		console.log(e)
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

const deleteAssignment = async (id, callback)=>{
  try{
    const ret = await Assignment.deleteOne({ "_id": id});
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
  getAssignmentByModule: getAssignmentByModule,
  deleteAssignment: deleteAssignment
};
