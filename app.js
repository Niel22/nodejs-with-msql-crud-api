const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const postRoute = require('./routes/posts');

app.use(bodyParser.json());
app.use('/posts', postRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/blog', (req, res) => {
    res.send('Hello world');
})


module.exports = app;