const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("./routes/crudRoutes");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()

connectDb()

const app = express();

const port = process.env.PORT || 5000

app.use(express.json())
app.use("/api/crud", require("./routes/crudRoutes"));
app.use("/api/auth", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})