// create express here
//import all the modules needed for this web application
const express = require("express"); //require() loads the modules much similar to the #include in philosophy
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//ROUTES HAVE BEEN IMPORTED HERE:
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//to use .env use config() to configure
dotenv.config();

//connecting to mongo database
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connection successfull")
}).catch((e) => {
    console.log(e.message)
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common")); //the format inside morgan() [in this case common] defines how you want to display the stats

//ROUTES ARE BEING USED HERE
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.listen(8080, () => {
    console.log("Backend server is running.") //listen(port, callback); listen indicates a readiness to accept client connection
})