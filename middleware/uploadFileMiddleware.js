import multer from 'multer';
import path from 'path';

const uploadFileMiddleware = (req, res, next) => {
  try {
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
    const upload = multer({ storage, fileFilter }).single('file');

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json({ error: err.message });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { uploadFileMiddleware };
