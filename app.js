const morgan = require(`morgan`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const layout = require('./views/layout');
const app = express();
const PORT = 8888;

// const db = require('./models').db;
const {db, Page, User} = require('./models');
//const { db } = require('./models');




app.use(morgan(`dev`));
app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/views', layout);

app.get('/', async (req, res) => {
     await res.send(layout(''));
    console.log(`hello world`);

});

db.authenticate().
then(() => {
  console.log('connected to the database');
})

//database synchronization
//http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
const init = async () =>{
    //we can get each individual model in the DB
    // await User.sync();
    // await Page.sync();

    //or just get the whole thing, and start listening at the same time!
    await db.sync();
    app.listen(PORT, () => {
        console.log('listening');
    });
    console.log('initializing!')
    db.sync({force: true});
    console.log('DROP TABLE')
}


init();
