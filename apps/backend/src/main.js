
import express from 'express';
import bodyParser from 'body-parser';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? process.env.PORT : 3000;

const app = express();

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for clipboard content
let clipboardContent = '';

// Endpoint to get the current clipboard content
app.get('/clipboard', (req, res) => {
  res.send({ content: clipboardContent });
});

// Endpoint to set the clipboard content
app.post('/clipboard', (req, res) => {
  const { content } = req.body;
  if (typeof content === 'string') {
    clipboardContent = content;
    res.send({ message: 'Clipboard content updated successfully.' });
  } else {
    res.status(400).send({ message: 'Invalid content provided. Content must be a string.' });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
