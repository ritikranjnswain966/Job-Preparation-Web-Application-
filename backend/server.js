require('dotenv').config();
const app = require('./src/app');
const connectToDB = require("./src/config/database")

connectToDB()


if (!process.env.VERCEL) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}

module.exports = app
