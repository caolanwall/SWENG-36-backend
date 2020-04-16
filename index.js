const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const userHandler = require('./db/routes/user-handler.js');
const auth = require('./db/routes/userAuth-handler.js');
const assignmentHandler = require('./db/routes/assignment-handler.js');
const submissionHandler = require('./db/routes/submission-handler.js');
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const API_PORT = 3001;
const app = express();
const router = express.Router();

let dotenv = require("dotenv")
dotenv.config()
const dbRoute = process.env.CONNECTION_STRING

mongoose.connect(dbRoute, { useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let gfs;
db.once("open", () => {
	// init stream
	console.log('connected to the database')
	gfs = new mongoose.mongo.GridFSBucket(db.db, {
		bucketName: "uploads"
	});
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.use(express.json());


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
app.get('/', (req, res) => {
	res.send('Working!')
})

// Create User
router.post('/user', cors(), (req, res) => {
	console.log("create user", req.body);
	const userName = req.body.name;
	const pass = req.body.pass;
	const modules = req.body.modules;
	const role = req.body.role;
	console.log(userName);
	console.log(pass);
	userHandler.createNewUser(
		userName,
		pass,
		modules,
		role,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Update User
router.put('/user', cors(), (req, res) => {
	const userName = req.query.name;
	const id = req.query.id;
	const pass = req.query.pass;
	const modules = req.query.modules;
	const role = req.query.role;
	console.log(userName);
	console.log(id);
	console.log(pass);
	userHandler.updateUser(
		userName,
		pass,
		modules,
		role,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Add module to user
router.patch('/userModule', cors(), (req, res) => {
	console.log("addModuleToUser");
	const id = req.query.id;
	const moduleID = req.query.module;

	userHandler.addModuleToUser(
		id,
		moduleID,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);

});

// Remove module from user
router.delete('/userModule', cors(), (req, res) => {
	console.log("");
	const id = req.body.id;
	const moduleID = req.body.module;

	userHandler.removeModuleUser(
		id,
		moduleID,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

router.get('/user', cors(), (req, res) => {
	if(req.query.id != null){
		console.log("getUserByID");
		const id = req.query.id;

		userHandler.getUserById(
			id,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);

	} else if(req.query.role != null){
		console.log("getUserByRole");
		const role = req.query.role;
		console.log(role)

		userHandler.getUserByRole(
			role,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	} else if(req.query.module != null){
		console.log("getUserByModule");
		const module = req.query.module;
		console.log(module)

		userHandler.getUserByModule(
			module,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	} else {
		console.log("getUser");
		userHandler.getUser(
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	}
});

// Delete User
router.delete('/user', cors(), (req, res) => {
	console.log("deleteUser");
	const id = req.body.id;
	console.log(id);
	userHandler.deleteUser(
		id,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Authenticate User
router.post('/auth', (req, res) => {
	const username = req.body.username;
	const role = req.body.role;
	console.log(username);
	console.log(role);
	auth(
		username,
		role,
		(success, hash, id) => {
			return res.json({success, hash, id});
		}
	);
});

// Create new assignment
router.post('/assignment', cors(), (req, res) => {
	console.log("createNewAssignment");
	const title = req.body.title;
	const description = req.body.description;
	const module_Code = req.body.module_Code;
	const attachments = req.body.attachments;
	const draft_Start = req.body.draft_Start;
	const draft_End = req.body.draft_End;
	const review_Start = req.body.review_Start;
	const review_End = req.body.review_End;
	const final_Start = req.body.final_Start;
	const final_End = req.body.final_End
	const review_Count = req.body.review_Count;
	const old_Weight = req.body.old_Weight;
	const samples = req.body.samples;
	const samples_Score = req.body.samples_Score;
	const marking_Scheme = req.body.marking_Scheme;

	assignmentHandler.createNewAssignment(
		title,
		description,
		module_Code,
		attachments,
		draft_Start,
		draft_End,
		review_Start,
		review_End,
		final_Start,
		final_End,
		review_Count,
		old_Weight,
		samples,
		samples_Score,
		marking_Scheme,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Update assignment
router.put('/assignment', cors(), (req, res) => {
	console.log("updateAssignment");
	const title = req.query.title;
	const description = req.query.description;
	const module_Code = req.query.module_Code;
	const attachments = req.query.attachments;
	const draft_Start = req.query.draft_Start;
	const draft_End = req.query.draft_End;
	const review_Start = req.query.review_Start;
	const review_End = req.query.review_End;
	const final_Start = req.query.final_Start;
	const final_End = req.query.final_End
	const review_Count = req.query.review_Count;
	const old_Weight = req.query.old_Weight;
	const samples = req.query.samples;
	const samples_Score = req.query.samples_Score;
	const marking_Scheme = req.query.marking_Scheme;

	assignmentHandler.updateAssignment(
		title,
		description,
		module_Code,
		attachments,
		draft_Start,
		draft_End,
		review_Start,
		review_End,
		final_Start,
		final_End,
		review_Count,
		old_Weight,
		samples,
		samples_Score,
		marking_Scheme,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Get assignment by ID or Module
router.get('/assignment', cors(), (req, res) => {

	if(req.query.id != null){
		console.log("getAssignmentById");
		const id = req.query.id;

		assignmentHandler.getAssignmentById(
			id,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	} else if(req.query.module != null){
		console.log("getAssignmentByModule");
		const module = req.query.module;

		assignmentHandler.getAssignmentByModule(
			module,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	} else {
		console.log("getAssignment");
		assignmentHandler.getAssignment(
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	}
});

// Delete Assignment
router.delete('/assignment', cors(), (req, res) => {
	console.log("deleteAssignment");
	const id = req.body.id;

	assignmentHandler.deleteAssignment(
		id,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}



// Storage
//Hexs filename before uploading
const storage = new GridFsStorage({
	url: dbRoute,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads"
				};
				resolve(fileInfo);
			});
		});
	}
});

const upload = multer({
	storage
});

// get / page
//Uploads file to GridFsStorage
//Records contentType as application/pdf
app.get("/upload", (req, res) => {
	if(!gfs) {
		console.log("some error occured, check connection to db");
		res.send("some error occured, check connection to db");
		process.exit(0);
	}
	gfs.find().toArray((err, files) => {
		// check if files
		if (!files || files.length === 0) {
			return res.json({
				files: false
			});
		} else {
			const f = files
				.map(file => {
					if (
						file.contentType === "application/pdf"
					) {
						file.isPDF = true;
					} else {
						file.isPDF = false;
					}
					return file;
				})
				.sort((a, b) => {
					return (
						new Date(b["uploadDate"]).getTime() -
						new Date(a["uploadDate"]).getTime()
					);
				});
			console.log("Uploaded Successfully");
			return res.json({
				files: f
			});
		}
	});
});

// // Called in Upload.js to upload file from your computer
app.post("/uploadPDF", upload.single("file"), (req, res) => {
	res.redirect("/upload");
});

// //Returns id and filenames of all files on server
app.get("/files", (req, res) => {
	console.log("get files should be running")
	gfs.find().toArray((err, files) => {
		// check if files
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: "no files exist"
			});
		}
		return res.json(files);
	});
});

// //This works with postman but can't integrate
// //Can download a file put on the server from postman
// //might need to change this to get ids
app.get("/files/:filename", (req, res) => {
	console.log('running get file');
	const file = gfs
		.find({
			filename: req.params.filename
		})
		.toArray((err, files) => {
			if (!files || files.length === 0) {
				console.log('fail');
				return res.status(404).json({
					err: "no files exist"
				});
			}
			console.log('Returning file');
			return gfs.openDownloadStreamByName(req.params.filename).pipe(res);
		});
});


// // files/del/:id
// // Delete chunks from the db
// app.post("/files/del/:id", (req, res) => {
//   gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//     if (err) return res.status(404).json({ err: err.message });
//     res.redirect("/");
//   });
// });


//works (allow duplicates)
// Create Submission
router.post('/submission', cors(), (req, res) => {
	console.log("create submission", req.body);
	const submission_Id = req.body.submission_Id;
	const user_Id = req.body.user_Id;
	const assignment_Id = req.body.assignment_Id;
	const pdf_Ids = req.body.pdf_Ids;
	const reviewer_Id = req.body.reviewer_Id;
	const review_Comment = req.body.review_Comment;
	const review_Score = req.body.review_Score;
	const review_Date = req.body.review_Date;

	console.log(user_Id);
	submissionHandler.createNewSubmission(
		submission_Id,
		user_Id,
		assignment_Id,
		pdf_Ids,
		reviewer_Id,
		review_Comment,
		review_Score,
		review_Date,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

//works
// Update Submission
router.put('/submission', cors(), (req, res) => {
	const submission_Id = req.body.submission_Id;
	const user_Id = req.body.user_Id;
	const assignment_Id = req.body.assignment_Id;
	const pdf_Ids = req.body.pdf_Ids;
	const reviewer_Id = req.body.reviewer_Id;
	const review_Comment = req.body.review_Comment;
	const review_Score = req.body.review_Score;
	const review_Date = req.body.review_Date;
	console.log(user_Id);

	submissionHandler.updateSubmission(
		submission_Id,
		user_Id,
		assignment_Id,
		pdf_Ids,
		reviewer_Id,
		review_Comment,
		review_Score,
		review_Date,
		data => {
			if(isEmptyObject(data)){
				return res.json("No such submission")
			}
			else{
				return res.json({ data, success: true });
			}
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Update Submission with pdf_Id
router.patch('/submission', cors(), (req, res) => {
	const submission_Id = req.body.submission_Id;
	const pdf_Ids = req.body.pdf_Ids;
	console.log(submission_Id);
	console.log(pdf_Ids);

	submissionHandler.updatePDFLinkToSubmission(
		submission_Id,
		pdf_Ids,
		data => {
			if(isEmptyObject(data)){
				return res.json("No such submission")
			}
			else{
				return res.json({ data, success: true });
			}
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// Update Submission with review
router.patch('/submissionReview', cors(), (req, res) => {
	const submission_Id = req.body.submission_Id;
	const reviewer_Id = req.body.reviewer_Id;
	const review_Comment = req.body.review_Comment;
	const review_Score = req.body.review_Score;
	const ts = new Date(Date.now())
	console.log(submission_Id);
	console.log(reviewer_Id);
	console.log(review_Comment);
	console.log(review_Score);

	submissionHandler.updateReviewToSubmission(
		submission_Id,
		reviewer_Id,
		review_Comment,
		review_Score,
		ts,
		data => {
			if(isEmptyObject(data)){
				return res.json("No such submission")
			}
			else{
				return res.json({ data, success: true });
			}
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});

// works
// Get submission by _id or user_Id and assignment_Id
router.get('/submission', cors(), (req, res) => {
	if(req.query.id != null){
		console.log("getSubmissionByID");
		const id = req.query.id;
		submissionHandler.getSubmissionById(
			id,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	}
	else if(req.query.submission_Id != null){
		console.log("getSubmissionBySubmissionId");
		const submission_Id = req.query.submission_Id;
		submissionHandler.getSubmissionBySubmissionId(
			submission_Id,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);

	}else if(req.query.user_Id != null && req.query.assignment_Id != null){
		console.log("getSubmissionByUserAssignmentId");
		const user_Id = req.query.user_Id;
		const assignment_Id = req.query.assignment_Id;

		submissionHandler.getSubmissionByUserAssignmentId(
			user_Id,
			assignment_Id,
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	} else {
		console.log("getSubmissions");
		submissionHandler.getSubmissions(
			data => {
				if(isEmptyObject(data)){
					return res.json("No result");
				}
				else
					return res.json({ data, success: true });
			},
			() => {
				return res.json({
					success: false,
				});
			},
		);
	}
});

// Delete Submission
router.delete('/submission', cors(), (req, res) => {
	console.log("deleteSubmission");
	const id = req.body.id;

	submissionHandler.deleteSubmission(
		id,
		data => {
			return res.json({ data, success: true });
		},
		() => {
			return res.json({
				success: false,
			});
		},
	);
});
