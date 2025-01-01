const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use('/posts', postRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/blog', (req, res) => {
    res.send('Hello world');
})


module.exports = app;