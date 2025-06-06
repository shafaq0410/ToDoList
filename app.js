//  //jshint esversion:6

//  const express = require("express");
//  const bodyParser = require("body-parser");

//  const app = express();

//  let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems =[];

//  app.set('view engine', 'ejs');

//  app.use(bodyParser.urlencoded({extended:true}));
//  app.use(express.static("public"));

//  app.get("/" , function(req,res){
 
//     // our logic code
//  let today = new Date();

//  let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//  };

//  let day = today.toLocaleDateString("en-US" , options);

               
//     res.render("list" , {listTitle: day , newListItem: items}); 

//  });

//  app.post("/",function(req , res){

//     let item = req.body.newItem;

//   if(req.body.list === "Work")
//       {

//   workItems.push(item);
//   res.redirect("/work");

//   } 
//     else
//   {
//     items.push(item);

//     res.redirect("/");  
//   }             // here list is the key in button html value

//  });

//  app.get("/work", function(req,res){
//      res.render("list",{listTitle: "Work List", newListItem: workItems});
//  });

//  app.get("/about", function(req , res){
//         res.render("about");
//  });

//  app.post("/work", function(req, res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
//  });



//  app.listen(5000 , function(){
//     console.log("Server on port 5000");
//  });


// jshint esversion:6

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// --- Connect to MongoDB Atlas ---
const uri = process.env.MONGO_URI;


mongoose.connect(uri)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("Connection error:", err));

// --- Schema and Models ---
const itemsSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemsSchema);

// For tracking the last reset date
const dateSchema = new mongoose.Schema({ lastUpdated: String });
const DateTracker = mongoose.model("DateTracker", dateSchema);

// --- Default items (Item 3 removed) ---
const item1 = new Item({ name: "Welcome to your todo list!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const defaultItems = [item1, item2];

// --- In-memory Work List ---
let workItems = [];

// --- GET Home Route ---
app.get("/", async function (req, res) {
  try {
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    const storedDate = await DateTracker.findOne({});

    if (!storedDate || storedDate.lastUpdated !== formattedDate) {
      await Item.deleteMany({});
      await Item.insertMany(defaultItems);

      await DateTracker.deleteMany({});
      const newDateEntry = new DateTracker({ lastUpdated: formattedDate });
      await newDateEntry.save();

      console.log("New day detected. Todo list has been reset.");
    }

    const foundItems = await Item.find({});
    res.render("list", { listTitle: formattedDate, newListItem: foundItems });

  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).send("Server Error");
  }
});

// --- POST Home Route ---
app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  if (listName === "Work") {
    workItems.push(itemName);
    return res.redirect("/work");
  }

  const item = new Item({ name: itemName });

  try {
    await item.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(500).send("Error saving item");
  }
});

// --- Work List GET Route ---
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

// --- Work List POST Route ---
app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

// --- About Page Route ---
app.get("/about", function (req, res) {
  res.render("about");
});

// --- Server Listener ---
app.listen(5000, function () {
  console.log("Server running on port 5000");
});
