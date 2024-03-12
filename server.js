const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://saidehasan:0jmNuXJzjFg68JYL@orgnickdb.xbkizcl.mongodb.net/?retryWrites=true&w=majority&appName=orgnickdb";

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("organicdb");
    const collection = database.collection("products");
    app.post("/addProduct", (req, res) => {
      const product = req.body;
      console.log(product)

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
