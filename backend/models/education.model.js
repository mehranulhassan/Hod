const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Hod")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

const ScholarshipApplicationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

const ScholarshipApplication = mongoose.model('ScholarshipApplication', ScholarshipApplicationSchema);

module.exports = ScholarshipApplication;

