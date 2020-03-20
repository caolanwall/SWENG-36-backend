const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const createNewUser = require('./db/routes/user-handler.js')
const createNewAssignment = require('./db/routes/assignment-handler.js')

const API_PORT = 3001;
const app = express();
const router = express.Router();
const dbRoute =
  'mongodb+srv://admin:Pass_word@cluster0-nlfof.mongodb.net/test?retryWrites=true&w=majority';

app.use(cors());

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);

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


router.post('/user', cors(), (req, res) => {
    const userName = req.query.name;
    const id = req.query.id;
    const pass = req.query.pass;
    const modules = req.query.modules;
    const role = req.query.role;
    createNewUser(
        userName,
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

router.post('/assignment', cors(), (req, res) => {
  const module_Name = req.query.module_Name;
  const title = req.query.title;
  const description = req.query.description;
  const id = req.query.id;
  const attachments = req.query.attachments;
  const first_start = req.query.first_start;
  const first_end = req.query.first_end;
  const final_start = req.query.final_start;
  const final_end = req.query.final_end;
  const customer = req.query.customer;
  const author = req.query.author;
  const author_name = req.query.author_name;
  const year = req.query.year;
  const review_count = req.query.review_count;
  const old_weight = req.query.old_weight;
  const references = req.query.references;
  const references_score = req.query.references_score;
  const marking_scheme = req.query.marking_scheme;
  const marking_comments = req.query.marking_comments;

    createNewAssignment(
        module_Name,
        title,
        description,
        id,
        attachments,
        first_start,
        first_end,
        final_start,
        final_end,
        customer,
        author,
        author_name,
        year,
        review_count,
        old_weight,
        references,
        references_score,
        marking_scheme,
        marking_comments,
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