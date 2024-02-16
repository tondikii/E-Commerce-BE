// require("dotenv").config();

// const express = require('express')
// const serverless = require('serverless-http')
// const app = express()
// const port = process.env.PORT || 3001
// const cors = require("cors")

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// const routes = require("../routes")
// app.use("/.netlify/functions/api", routes)

// // Error Handler
// const errorHandler = require("../middlewares/errorHandler")
// app.use(errorHandler)



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// module.exports.handler = serverless(app)

// functions/hello.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express serverless function!' });
});

module.exports.handler = serverless(app);
