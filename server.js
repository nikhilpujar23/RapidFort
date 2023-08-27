const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    const uploadedFile = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      destination: req.file.destination,
      filename: req.file.filename,
    };
    res.json({ message: 'File uploaded successfully.', file: uploadedFile });
  } else {
    res.status(400).send('No file uploaded.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
