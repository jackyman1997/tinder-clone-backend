import express from "express";
import mongoose from "mongoose";
import Cors from "cors"; 
import Cards from './models/dbCards.js';

// App Config
const app = express();  // define an instance
const port = process.env.PORT || 8001  // define port
const connection_url = 'mongodb+srv://admin:NSrxgKKECuE5mABa@cluster0.saemy.mongodb.net/tinderdb?retryWrites=true&w=majority';


// Middlewares
app.use(express.json())
app.use(Cors());


// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true, 
    // useCreateIndex: true,
    useUnifiedTopology: true,
})


// API Endpoints
app.get('/', (req, res) => res.status(200).send('DONE, 200')); // root resource
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});  // send data to db
app.get('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});  // get data from db

// Listener 
app.listen(port, () => console.log(`listening on localhost: ${port}`));