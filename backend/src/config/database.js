const mongoose = require("mongoose")

async function connectToMongoDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        throw error
    }
}


module.exports = connectToMongoDB
