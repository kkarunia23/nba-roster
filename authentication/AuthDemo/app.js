var express = require('express');

const PORT = process.env.PORT || 3000;


var app = express();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('./views/home.ejs');
});

app.listen(PORT, () => console.log('Check out NBA', PORT));