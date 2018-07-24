const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {

});



// console.log(__dirname + '/../public');
// console.log(publicPath);

app.listen(port, () => {
    console.log(`Started up at port: ${port}`);
});


