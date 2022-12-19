require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require("./routes")
app.use("/api", routes)

// Error Handler
const errorHandler = require("./middlewares/errorHandler")
app.use(errorHandler)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})