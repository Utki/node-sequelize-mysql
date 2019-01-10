//Dependency
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db configuration including cinfig model and controller file
const db = require("./config/config");
db.connection.sync().then(() => {
  console.log("Database is Configured Successfully");
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

//Configure for JWT Strategy
require("./strategies/jwtStrategy")(passport);

//express users routes that are exported
require("./routes/userInfoRoute")(app);

//express community routes that are exported
require("./routes/communityInfoRoute")(app);

//express role routes that are exported
require("./routes/roleInfoRoute")(app);

//express login routes that are exported
require("./routes/loginRoute")(app);

//express message routes that are exported
require("./routes/messageRoute")(app);

//express webpage routes that are exported
require("./routes/webpageRoute")(app);

//express addUser routes that are exported
require("./routes/addUserRoute")(app);

//Test Route
app.get("/", (req, res) => {
  res.send(req.headers);
});

app.listen(port, () => console.log("App is listening on Port " + port));
