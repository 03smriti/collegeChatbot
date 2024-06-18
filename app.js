const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then((res) => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

//database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

//index route
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//login route
app.get("/login", async(req,res)=>{
    res.render("login.ejs");
})

//signup route
app.get("/signup",async(req,res)=>{
    res.render("signup.ejs");
})

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

let port = 3000;
app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
