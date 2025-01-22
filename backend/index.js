const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require('./db');

mongoDB();

app.use(cors());
app.use(express.json());

// Include routes
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
//app.use("/api", require("./routes/OrderRoutes"));
 // Add the saveOrder route
app.use('/api',require("./routes/UserRoutes") );

// Default route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
