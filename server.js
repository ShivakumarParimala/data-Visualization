const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsondata.json'), 'utf-8'));

const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: String,
  region: String,
  city: String,
});

const DataModel = mongoose.model('Data', dataSchema);

mongoose.connect('mongodb://localhost:27017/dataVizDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await DataModel.insertMany(jsonData);
    console.log('Data inserted');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
