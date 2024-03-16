const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const {ObjectId} = require('mongodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { MongoClient, Collection } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://saidehasan:0jmNuXJzjFg68JYL@orgnickdb.xbkizcl.mongodb.net/?retryWrites=true&w=majority&appName=orgnickdb";

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("organicdb");
    const collection = database.collection("product");
    app.get("/products", async (req, res) => {
      const cursor = collection.find();
      const results = await cursor.toArray();
      res.send(results);
    });

    app.post("/addProduct", async (req, res) => {
      const product = req.body;
      await collection.insertOne(product).then((reasult) => {
        console.log("data aded successfully");
        res.send("success");
      });
    });
    app.get('/product/:id', async (req, res) => {
  
      const data = collection.find({ _id: new ObjectId(req.params.id)});
      const results = await data.toArray();
      res.send(results[0]);

    })
    app.patch('/update/:id', async (req, res) => {
      console.log(req.body.price)
      collection.updateOne({ _id: new ObjectId(req.params.id)},
      {
        $set:{price:req.body.price,quantity:req.body.quantity}
      })
      .then(result=>{
        console.log(result)
      })
    })
    app.delete("/delete/:id", async (req, res) => {
      await collection.deleteOne({ _id: new ObjectId(req.params.id)})
      .then((result) => {
        console.log(result);
      });
    });

    console.log("db is connect");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
