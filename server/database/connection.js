const mongoose = require('mongoose');

const mongourl = "mongodb://admin:123456@localhost/admin"

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(mongourl/*process.env.MONGO_URI*/, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB