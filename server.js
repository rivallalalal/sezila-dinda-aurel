const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for static files
app.use(express.static('public'));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

// Route for image uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send('Error uploading file.');
        } else {
            res.send('File uploaded successfully.');
        }
    });
});

// Route for contact form submission
app.post('/contact', express.urlencoded({ extended: true }), (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact form submitted: Name=${name}, Email=${email}, Message=${message}`);
    res.send('Form submitted successfully.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
