import express from 'express';
import multer from 'multer';
import path from 'path'

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const fileFilter = function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.csv') {
        return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
};

// Initialize upload
const upload = multer({ storage, fileFilter });

router.post('/uploadFile', upload.single('file'), (req, res) => {
    try {
        res.send({
            message: 'File Uploaded',
            file: `${req.file.path}`
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router;