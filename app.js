const morgan = require(`morgan`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const layout = require('./views/layout');
const app = express();
const PORT = 8888;


app.listen(PORT, () => {
    console.log('listening');
});

app.use(morgan(`dev`));
app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/views', layout);

app.get('/', async (req, res) => {
     await res.send(layout(''));
    console.log(`hello world`);

});
