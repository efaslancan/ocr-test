const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post('/upload', upload.single('image'), (req, res) => {
  const language = req.body.language;
  Tesseract.recognize(
    req.file.path,
    language,
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    res.send(text);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
