const express = require('express');
// const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const app = express();
const {v4} = require('uuid')

let CONTACTS = [];
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());
app.set('port', process.env.PORT || 8080);

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4()}
  CONTACTS.push(contact)
  res.status(201).json(contact);
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(app.get('port'), () => console.log('Server has been started on port 8080...'))