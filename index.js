const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const userHandler = require('./db/routes/user-handler.js');
const auth = require('./db/routes/userAuth-handler.js');
const assignmentHandler = require('./db/routes/assignment-handler.js');

const API_PORT = 3001;
const app = express();
const router = express.Router();

let dotenv = require("dotenv")
dotenv.config()
const dbRoute = process.env.CONNECTION_STRING

app.use(cors());

mongoose.connect(dbRoute,{ useNewUrlParser: true , useUnifiedTopology: true })

const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

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
  const id = req.query.id;
  const moduleID = req.query.module;

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

// Get user by ID or Role or Module
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
		console.log("Unknown User property!")
	}
});

// Delete User
router.delete('/user', cors(), (req, res) => {
  console.log("deleteUser");
  const id = req.query.id;

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
router.post('/auth', cors(), (req, res) => {
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
		console.log("No ID or Module provided!")
	}
});

// Delete Assignment
router.delete('/assignment', cors(), (req, res) => {
  console.log("deleteAssignment");
  const id = req.query.id;

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
