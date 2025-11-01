const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');

app.use(bodyParser.json());

//Mongoose Username: Vanshika
//Password: XyqWEcnMwIBfgKWy

const Employee = mongoose.model('employee');
const mongUri =
  'mongodb+srv://Vanshika:XyqWEcnMwIBfgKWy@cluster1.fjir8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(mongUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeahh');
});

mongoose.connection.on('error', error => {
  console.log('error', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

app.get('/', (req, res) => {
  Employee.find({}).then(data => res.send(data));
  //   res.send('welcome to node js');
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary,
    phone: req.body.phone,
    picture: req.body.picture,
    position: req.body.position,
  });
  employee
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ error: 'Failed to save employee' });
    });
});

app.post('/delete', (req, res) => {
  Employee.findByIdAndDelete(req.body.id)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ error: 'Failed to delete employee' });
    });
});

app.post('/update', (req, res) => {
  Employee.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      phone: req.body.phone,
      picture: req.body.picture,
      position: req.body.position,
    },
    { new: true }
  )
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ error: 'Failed to update employee' });
    });
});

app.listen(3000, () => {
  console.log('server running');
});
