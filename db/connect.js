const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/node_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(()=> console.log("Database connection successfull"))
  .catch((err)=> console.log(err));