const multer = require("multer")

function onlyPdf(req, file, cb) {
    const isPdf = file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")

    if (!isPdf) {
        const error = new Error("Resume must be a PDF file.")
        error.status = 400
        return cb(error)
    }

    cb(null, true)
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    fileFilter: onlyPdf
})


module.exports = upload
