const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
const workoutroutes = require('./routes/workout'); // Ensure this path is correct
const userroutes = require('./routes/user'); // Ensure this path is correct

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/workouts", workoutroutes);
app.use("/api/users", userroutes);

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log("Connected to DB");
        app.listen(process.env.PORT, () => {
            console.log('Listening on port ' + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
