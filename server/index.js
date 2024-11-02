const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

//DB Connection



//Routes

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.json({message:"Server's answer!"});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
