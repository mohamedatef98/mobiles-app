//My imported modules
const express = require('express');
var cors = require('cors')
const app = express();
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const assert = require('assert');

app.use(cors());

//DataBase Constants
const url = 'mongodb://localhost:27017';
const dbName = 'gsmArena';

mongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);


    //The default route
    //  sends the top three viewed phones by the views property in the db
    app.get('/api/', function (req, res) {
        var obj = {}; //expected to fill with TWO things
        // the First is an array of the top Three mobiles
        // The Second is also 'a' (YES a not an) unique set of brands in the database



        //The First Array (The One with the Top three)

        //We have to chain the order of statments to insure that we get the two complete arrays
        db.collection('mobiles').find({}).sort({ 'views': -1 }).limit(3).project({
            'Name': 1,
            'Image': 1,
            'views': 1
        }).toArray((err, docs) => {
            assert.equal(null, err);
            obj.top = docs;


            //The Second Array (The One unique set with brand names)
            db.collection('mobiles').find({}).project({
                'Brand': 1,
                '_id': 0
            }).toArray((err, docs) => {
                assert.equal(null, err);
                var set = [];


                for(let i = 0; i < docs.length; i++){
                    let inSet = set.some((ele)=>{
                            return ele === docs[i]['Brand'];
                        });
                    if(inSet)
                        continue;
                    set.push(docs[i]['Brand']);
                }

                obj.brands = set.sort();
                
                //Sending The Output in JSON Form
                res.send(JSON.stringify(obj));
            });
        });
    });

    /*
      A route for getting the mobiles in the database for certain brand or gives a 404 error if that
      brand doesn't exist.
    */
    app.get('/api/brand/:brand', function (req, res) {
        const brand = req.params['brand'];
        db.collection('mobiles').find({ 'Brand': brand }).sort({ 'order': 1 }).project({
            'Name': 1,
            'Image': 1,
            'views': 1,
            'Launched': 1
        })
            .toArray((err, docs) => {
                assert.equal(null, err);
                if (docs.length > 0) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
                    res.send(JSON.stringify(docs));
                }
                else {
                    res.statusCode = 404;
                    res.send('Brand Not Found!')
                }
            });
    });

    //A route for getting a single mobile data by its _id
    app.get('/api/mobile/:id', function (req, res) {
        var id = mongo.ObjectID(req.params['id']);
        db.collection('mobiles').find({'_id':id}).toArray((err,doc)=>{
            assert.equal(null, err);
            res.send(JSON.stringify(doc[0]));
            db.collection('mobiles').updateOne({'_id':id},{'$inc':{'views':1}},(err,r)=>{
                assert.equal(null, err);
                assert.equal(1, r.matchedCount);
                assert.equal(1, r.modifiedCount);
            });
        });
    });


    app.listen(3000, () => console.log('Example app listening on port 3000!'))
});
