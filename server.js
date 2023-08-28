const path = require('path');
const express = require('express');
const multer = require('multer');



const port = 3000;


const storage = multer.diskStorage({


  destination: (req, file, cb) => {
        cb(null, 'uploads/');
  },


  filename: (req, file, cb) => {
        cb(null, file.fieldname  + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


 express().use(express.static('public'));

 express().post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    const uploadedFile = {
          mimetype: req.file.mimetype,
          originalname: req.file.originalname,
          destination: req.file.destination,
          filename: req.file.filename,
          size: req.file.size,
    };
    res.json({ message: 'File uploaded.', file: uploadedFile });
  } else {
    res.status(400).send('File not Uploaded.');
  }
});

 express().listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
