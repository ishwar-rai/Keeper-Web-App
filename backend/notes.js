const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const passportLocaleMongoose = require("passport-local-mongoose");

const app = express();
const apiPort = 5000;

app.use(
  session({
    secret: "My Keeper App Secret passport Project.",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

const db = require("./db/db-connection");
const User = require("./models/user-schema");
let userDetail;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", function (req, res) {
  console.log("/register");
  if(req.body.password === req.body.confPassword){
    User.register(
        { username: req.body.email },
        req.body.password,
        function (err, user) {
          // console.log(user);
          if (err) {
            console.log(err);
            // res.render("/register");
          } else {
            passport.authenticate("local")(req, res, function () {
              console.log("Register Authentication done");
              // res.send("Authentication done")
              res.redirect("/keeper");
            // window.location.href = "keeper"
            });
          }
        }
      );
} else {
  res.send("Password Confpassword doesn't match")
}
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confPassword;
//   console.log(password + "  " + confirmPassword);
//   User.findOne({ email: email }, function (err, foundUser) {
//     if (foundUser) {
//       res.send({
//         code: 1,
//         message: "Email Already Exist Please Login or Used Different Email",
//       });
//     } else {
//       if (password === confirmPassword) {
//         const user = new User({
//           email: email,
//           password: password,
//         });

//         user.save(function (err) {
//           if (!err) {
//             res.send({ code: 2, message: "User Created Succefully" });
//           }
//         });
//       } else {
//         res.send("Password Doesn't Match");
//       }
//     }
//   });
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.email,
    password: req.body.password
  });

  // console.log(user.username);
  // console.log(user.password);
  req.login(user, function (err) {
    console.log("login");
    if (err) {
      console.log(err);
      console.log("Error in login function");
      response.status(400).send({
        message: "Error in login function",
        result,
      });
      //   res.redirect("/login");
    } else {
      // userDetail = user;
      // res.redirect("/keeper")
      // console.log("under authenticate");
      //     res.redirect("http://localhost:5000/keeper");
      console.log("before authenticate");
        passport.authenticate("local")(req, res, function () {
          console.log("under authenticate");
          res.redirect("http://localhost:5000/keeper");
        });
      // res.send(user)
          // res.send("Authentication done")
          // window.location.href = "/keeper";
        
      // console.log("Before Auth");
      // passport.authenticate("local")(req, res, function () {

      //   console.log("Authentication done");
      //   response.status(201).send({
      //     message: "Authentication done"
      //   });
      //   // res.send("Authentication done")
      //   // window.location.href = "/keeper";
      // });
      // console.log("After Auth");
    }
  });
});

app.get("/keeper", (req, res) => {
  console.log("req: "+req);
  console.log("before req.user "+req.isAuthenticated());
  if(req.isAuthenticated()) {
    console.log("req.user "+req.user);
    res.status(200).send({
      success: true,
      message: "success",
      user: req.user.username
    })
  }
});

app.get("/login/failed", (req, res) => {
  res.send("Login Failed")
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
