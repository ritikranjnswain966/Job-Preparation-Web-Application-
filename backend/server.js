require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    try {
        await connectToDB()

        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error("Server did not start because MongoDB is unavailable.")
        process.exit(1)
    }
}

startServer()
