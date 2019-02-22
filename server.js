const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items')

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Db config
const db = require('./config/keys').mongoURI;

//db connection
mongoose
.connect(db, { useNewUrlParser: true })
.then(()=>console.log('connected'))
.catch(err=> console.log(err))

//routes
app.use('/api/items',items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started at port ${port}`));
