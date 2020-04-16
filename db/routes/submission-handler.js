const path = require('path')

const Submission = require(path.join(__dirname, '..', 'models', 'submission-model.js'))

const createNewSubmission = async ( Submission_Id, User_Id, Assignment_Id, Pdf_Ids, Reviewer_Id, Review_Comment, Review_Score, Review_Date, callback) => {
      try {
        const submission = new Submission({
          submission_Id : Submission_Id,
          user_Id : User_Id,
          assignment_Id : Assignment_Id,
          pdf_Ids : Pdf_Ids,
          reviewer_Id : Reviewer_Id,
          review_Comment : Review_Comment,
          review_Score : Review_Score,
          review_Date : Review_Date,
        });
        submission
          .save()
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
        callback(submission);
      } catch (e) {
        console.log(e);
      }
    };

//works
const updateSubmission = async ( Submission_Id, User_Id, Assignment_Id, Pdf_Ids, Reviewer_Id, Review_Comment, Review_Score, Review_Date, callback) => {
  try {
    const dummy = await Submission.updateOne({"submission_Id": Submission_Id }, {$set:
      {
        "user_Id" : User_Id,
        "assignment_Id" : Assignment_Id,
        "pdf_Ids" : Pdf_Ids,
        "reviewer_Id" : Reviewer_Id,
        "review_Comment" : Review_Comment,
        "review_Score" : Review_Score,
        "review_Date" : Review_Date,
      }
    });
    const ret = await Submission.find({"submission_Id": Submission_Id});
    callback(ret);
  } catch (e) {
    console.log(e);
  }
};

const getSubmissionById = async (id, callback) => {
  try {
    const ret = await Submission.find({ "_id":id });
    callback(ret);
  } catch (e) {
	callback({})
    console.log(e)
  }
};

const getSubmissionBySubmissionId = async (Submission_Id, callback) => {
  try {
    const ret = await Submission.find({ "submission_Id": Submission_Id });
    callback(ret);
  } catch (e) {
	callback({})
    console.log(e)
  }
};

const getSubmissionByUserAssignmentId = async (User_Id, Assignment_Id, callback) => {
  try {
    const ret = await Submission.find({ "assignment_Id":Assignment_Id, "user_Id": User_Id});
    callback(ret);
  } catch (e) {
    error();
  }
};

const updatePDFLinkToSubmission = async (Submission_Id, Pdf_Ids, callback) =>{
  try {
    const ret = await Submission.update(
      { "submission_Id": Submission_Id },
      {
          $push: {
              pdf_Ids: Pdf_Ids
          }
      }
    );
    callback(ret);
  } catch (e) {
    error();
  }
}

const updateReviewToSubmission = async (Submission_Id, Reviewer_Id, Review_Comment, Review_Score, Review_Date, callback) =>{
  try {
    const ret = await Submission.update(
     { "submission_Id": Submission_Id },
     {
        $push: {
            reviewer_Id : Reviewer_Id,
            review_Comment : Review_Comment,
            review_Score : Review_Score,
            review_Date: Review_Date
        }
      }
    );
    callback(ret);
  } catch (e) {
    error();
  }
}
//TODO:returned empty array
const getSubmissions = async (callback) => {
  try {
    const ret = await Submission.find({});
    callback(ret);
  } catch (e) {
    error();
  }
};

const deleteSubmission = async (id, callback)=>{
  try{
    const ret = await Submission.deleteOne({ "_id": id});
    callback(ret);
  }catch(e){
    callback(e);
  }
}

module.exports = {
  createNewSubmission: createNewSubmission,
  updateSubmission: updateSubmission,
  getSubmissions: getSubmissions,
  getSubmissionById: getSubmissionById,
  getSubmissionBySubmissionId: getSubmissionBySubmissionId,
  getSubmissionByUserAssignmentId: getSubmissionByUserAssignmentId,
  deleteSubmission:deleteSubmission,
  updatePDFLinkToSubmission: updatePDFLinkToSubmission,
  updateReviewToSubmission : updateReviewToSubmission
};
