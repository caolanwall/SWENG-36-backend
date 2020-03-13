const path = require('path')

const Assignment = require(path.join(__dirname, '..', 'models', 'assignment-model.js'))
const createNewAssignment = async ( Title, Description, Id, Attachments, First_Start, First_End, Final_Start, Final_End, Customer,
 Author, Author_Name, Year, Review_count, Old_Weight, References, References_Score, Marking_Scheme, Marking_Comments, callback
    ) => {
      try {    
        const assignment = new Assignment({
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