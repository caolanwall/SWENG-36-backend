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

//works
router.post('/user', cors(), (req, res) => {
	console.log("create user", req.body);
    const userName = req.body.name;
    const id = req.body.id;
    const pass = req.body.pass;
    const modules = req.body.modules;
    const role = req.body.role;
    const assignments = req.body.assignments;
    console.log(userName);
    console.log(id);
    console.log(pass);
    userHandler.createNewUser(
        userName,
        id,
        pass,
        modules,
        role,
        assignments,
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
router.put('/user', cors(), (req, res) => {
  const userName = req.query.name;
  const id = req.query.id;
  const pass = req.query.pass;
  const modules = req.query.modules;
  const role = req.query.role;
  const assignments = req.query.assignments;
  console.log(userName);
  console.log(id);
  console.log(pass);
  userHandler.updateUser(
      userName,
      id,
      pass,
      modules,
      role,
      assignments,
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

router.patch('/userModule', cors(), (req, res) => {
  console.log("");
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

//works
router.get('/user', cors(), (req, res) => {
  console.log("getUserById");
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
});

//works
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

router.post('/auth', cors(), (req, res) => {
  const username = req.body.username;
  const role = req.body.role;
  console.log(username);
  console.log(role);
  auth(
      username,
      role,
      (success, hash) => {
		  return res.json({success, hash});
      }
    );
});

//works
router.post('/assignment', cors(), (req, res) => {
  console.log("createNewAssignment");
  const id = req.query.id;
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

    assignmentHandler.createNewAssignment(
        id,
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

//works
router.put('/assignment', cors(), (req, res) => {
  console.log("updateAssignment");
  const id = req.query.id;
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
        id,
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

//works
router.get('/assignment', cors(), (req, res) => {
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
});

//works
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
