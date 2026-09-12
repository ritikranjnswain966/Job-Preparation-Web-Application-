const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((error, req, res, next) => {
    console.error(error)

    if (error.name === "MulterError" && error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "Resume must be 3 MB or smaller." })
    }

    const status = error.status || 500
    const message = status >= 500 ? "Something went wrong while processing your request." : error.message

    res.status(status).json({ message })
})



module.exports = app
