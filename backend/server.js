const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const CalendarRouter=require('./routes/calendar.routes');
const EducationRouter =require('./routes/eductaion.route');
// Import routes
const volunteerRoutes = require('./routes/volunteer.routes'); // Adjust the path as needed

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Hod', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

// Static files for images
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

// Routes
app.use('/', volunteerRoutes);

// Upload route
app.post('/upload', upload.single('volunteerImage'), (req, res) => {
  res.json({
    success: 1,
    imageUrl: `http://localhost:${PORT}/images/${req.file.filename}`
  });
});

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helpsondemand@gmail.com',
    pass: 'vxyv gflv dzln sjdr', // Use your App Password here
  },
});

// Send email route
app.post('/send-email', (req, res) => {
  const { email, subject, text } = req.body;
  console.log('Email request received:', { email, subject, text });
  const mailOptions = {
    from: 'helpsondemand@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email', details: error.toString() });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: `Email sent: ${info.response}` });
  });
});
app.use('/', CalendarRouter);
app.use('/',EducationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
