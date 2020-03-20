const path = require('path')

const Assignment = require(path.join(__dirname, '..', 'models', 'assignment-model.js'))

const createNewAssignment = async ( Module_Name, Title, Description, Id, Attachments, First_Start, First_End, Final_Start, Final_End, Customer,
 Author, Author_Name, Year, Review_count, Old_Weight, References, References_Score, Marking_Scheme, Marking_Comments, callback
    ) => {
      try {    
        const assignment = new Assignment({
        module_Name : Module_Name,
        title : Title,
		    description : Description,
		    id : Id,
		    attachments : Attachments,
		    first_Start : First_Start,
		    first_End : First_End,
		    final_Start : Final_Start,
		    final_End: Final_End,
		    customer : Customer,
		    author : Author,
		    author_Name : Author_Name,
		    year : Year,
		    review_Count : Review_count,
	  	  old_Weight : Old_Weight,
  		  references : References,
	  	  references_Score : References_Score,
	  	  marking_Scheme : Marking_Scheme,
	  	  marking_Comments : Marking_Comments,
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

    module.exports = createNewAssignment

 export const updateAssignment = async (id, callback) => {
  try {
    const ret = await Assignment.findById({ id });
    console.log(ret);
    const data = new Assignment(ret);

    //update something

    data
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(ret);
    callback(ret);
  } catch (e) {
    error();
  }
};

export const getAssignmentById = async (id, callback) => {
  try {
    const ret = await Assignment.findById({ id });
    callback(ret);
  } catch (e) {
    error();
  }
};

export const getAssignment = async (callback) => {
  try {
    const ret = await Assignment.find({});
    callback(json(ret));
  } catch (e) {
    error();
  }
};
