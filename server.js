const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

var db, collection;

const bodyParser = require("body-parser");
// const session      = require('express-session');

// var configDB = require('./config/database.js');

const url = "mongodb+srv://DennisTrujilloDev:hiHello@cluster0.olwy9tk.mongodb.net/?retryWrites=true&w=majority";
const dbName = "cafe";

// var db, collection
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("views"));

// const coffeeOrders = {};

app.get("/", (req, res) => {
  db.collection('cafeOrders').find().toArray((err, cafeOrdersArray) => {
    console.log(cafeOrdersArray);
    if (err) return console.log(err)
    res.render('index.ejs', {coffeeOrders: cafeOrdersArray})
  })
});

app.put("/updateOrder", (req, res) => {
  // const oneCoffeeOrder = {type: req.body.type, temp: req.body.temp, sweet: req.body.sweet, id: new Date().toString()}
  db.collection('cafeOrders')
  .findOneAndUpdate({id: req.body.id }, {
    $set: {
      status:req.body.status = "completed"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

//   console.log("Whats this", coffeeOrders[req.body.id].sweet);
//   coffeeOrders[req.body.id].status = "Completed";
//   res.render("index.ejs", { coffeeOrders });
//   res.redirect("/");
// });

app.post("/order", (req, res) => {
  //req from browser, res is what will be sent back via ejs aka html
  const oneCoffeeOrder = {
    type: req.body.type,
    temp: req.body.temp,
    sweet: req.body.sweet,
    id: new Date().toString(),
    status: "in process",
  };
  // coffeeOrders[oneCoffeeOrder.id] = oneCoffeeOrder;
  db.collection('cafeOrders').insertOne(oneCoffeeOrder, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
});

app.delete("/deleteEm", (req, res) => {
    db.collection('cafeOrders').deleteMany({}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })
  // let plsDelete = req.body.id.split(";");
  // plsDelete.forEach((elementToDelete) => {
  //   delete coffeeOrders[elementToDelete];
  // });
  // res.send("Message deleted!");


app.listen(7000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );

  console.log("running port 7000");
});
