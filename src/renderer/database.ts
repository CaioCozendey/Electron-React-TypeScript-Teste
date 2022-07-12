import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/electronchallenge',{
})
    .then(db => console.log('DB Conectado!'))
    .catch(err => console.log(err));
