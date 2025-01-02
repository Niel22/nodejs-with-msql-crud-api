const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/posts', postRoute);
app.use('/user', userRoute);
app.use('/image', imageRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/blog', (req, res) => {
    res.send('Hello world');
})


module.exports = app;