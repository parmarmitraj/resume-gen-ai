const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        filesize: 3*1024*1024 // 3 MB max size
    }
})

module.exports = upload