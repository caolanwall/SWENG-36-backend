const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

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
router.post('/user', (req, res) => {
    
});

