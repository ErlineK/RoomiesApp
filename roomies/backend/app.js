const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const chores = require("./routes/api/chores");

const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));
app.use("/api/chores", chores);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
