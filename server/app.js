require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin request
app.use(cors());

const mongoDB = process.env.DB_CONNECTION;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('hey!!! We connected ------');
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});