const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

//body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// Use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/chores", require("./routes/api/chores"));
app.use("/api/houses", require("./routes/api/houses"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/bills", require("./routes/api/bills"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
