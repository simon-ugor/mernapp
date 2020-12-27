const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// setup express

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("The server is running on port: " + PORT))

// setup mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established")
})

// set up routes

app.use("/users", require("./routes/emailRoutes"))


