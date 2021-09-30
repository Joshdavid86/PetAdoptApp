const express      = require('express');
const MongoClient  = require('mongodb').MongoClient;
const objectID     = require('mongodb').ObjectID;
const assert       = require('assert');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const multer       = require('multer');
const path         = require('path');
//const uri        = require('../config/db');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload       = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});

const app          = express();

const port         = process.env.PORT || 5000

// Connection URL
const uri = "mongodb+srv://joshdavid86:rocafella86@cluster0-f3byx.mongodb.net/test?retryWrites=true&w=majority"

//Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Database Name
const dbName = 'adopt';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Index route
app.get('/', function(req, res){
    res.render(__dirname + '/index.html');
  });

// Create data in database
app.post('/add_pet', upload.single('petImage'), function (req, res){
    console.log(req.file);
    
    const pet = {
        species: req.body.species,
        name: req.body.name,
        age: req.body.age,
        petImage: req.body.petImage
    };
    client.connect(err => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
         const db = client.db(dbName);
            db.collection('pet').insertOne(pet).then(function(result) {
                
            // process result
            console.log(result,'Darcel is Beautiful and data inserted!');
            client.close();
          })
    });
    //res.redirect('/');
});

// Read data from database
app.get('/pets', function(req, res){
    const resultArray = [];
    client.connect(err => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const cursor = db.collection('pet').find({});
    iterateFunc = (doc,err) => {
            assert.equal(null, err);
            resultArray.push(doc);
            console.log(JSON.stringify(doc, null, 4));
            if(err) {
                console.log(err)
        }
        }
            cursor.forEach(iterateFunc);
            client.close();
            res.json({pets: resultArray});

      });

});  

// Update data 
app.post('/update_pet', function (req, res) {
    const pet = {
        species: req.body.species,
        name: req.body.name,
        age: req.body.age,
        petImage: req.file.path
    };
    const id = req.body.id;

    client.connect(err => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('pet').updateOne({"_id": objectID(id)},
        {$set: pet}, function(err, result){
            assert.equal(null, err);
            console.log('Pet updated');
            client.close();
            
        });
    });
});
 
// Delete data
app.post('/delete_pet', function (req, res) {
    const id = req.body.id;
    client.connect(err => {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      db.collection('pet').deleteOne({"_id": objectID(id)},
          function(err, result){
           assert.equal(null, err);
           console.log('Pet deleted');
           client.close();
      });
    });
});

app.listen(port, () => console.log(`Server started on port ${port} and Darcel is Beautiful`));




