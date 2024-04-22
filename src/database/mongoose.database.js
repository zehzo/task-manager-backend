const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsw-task-manager-cluste.mt1peuz.mongodb.net/?retryWrites=true&w=majority&appName=fsw-task-manager-cluster`,
        );
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(`Could not connect to MongoDB: ${error.message}`);
    }
};

module.exports = connectToDatabase;
