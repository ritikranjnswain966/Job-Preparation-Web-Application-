require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function handler(req, res) {
    try {
        await connectToDB()
        return app(req, res)
    } catch (error) {
        console.error("Request failed because MongoDB is unavailable.")
        return res.status(503).json({ message: "Database connection is unavailable." })
    }
}

// async function startServer() {
//     try {
//         await connectToDB()
//         const port = process.env.PORT || 3000
//         app.listen(port, () => console.log(`Server is running on port ${port}`))
//     } catch (error) {
//         console.error("Server did not start because MongoDB is unavailable.")
//         process.exit(1)
//     }
// }

// if (require.main === module) {
//     startServer()
// }

module.exports = handler
