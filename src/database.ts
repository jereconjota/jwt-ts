import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect('mongodb://localhost:27017/testjwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
    .then(db => console.log('MongoDB is connected'))
    .catch(err => console.log(err));