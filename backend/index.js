const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Data = require('./data');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');


const API_PORT = 5000;
const app = express();
const router = express.Router();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());


const CONNECTION_URL = 'mongodb+srv://bito94:bH7WWgibBDj29DHI@cluster0.c79rp.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
const DATABASE_NAME = 'prendaDB'

app.listen(API_PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("newdb");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/personnel", (request, response) => {
    console.log("here")
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.post('/posting', (req, res) => {
    MongoClient.connect(CONNECTION_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DATABASE_NAME);
        console.log(req.body)
        dbo.collection("newdb").insertOne({
            quote: req.body.quote,
            author: req.body.author
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.get("/delete", (request, response) => {
    console.log("here")
    collection.deleteMany({}, ((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    }))
});

