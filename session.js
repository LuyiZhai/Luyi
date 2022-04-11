const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.session({
    secret: 'topsecret'
}));


app.use(express.urlencoded());

app.post('/users', (req, res) => {
    req.session.name = req.body.name;
    res.send(req.session.name);
});


app.get('/users', (req, res) => {

    res.send(req.session.usernames);

});

app.delete('/users', (req, res) => {

    res.session.destroy();
    res.send('Session has been destroyed');

});



app.listen(3000, () => {
    console.log('Server runing');
});