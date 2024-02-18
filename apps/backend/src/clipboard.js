import { Router } from 'express';

const router = Router();
let clipboardContent = '';

router.get('/', (req, res) => {
  res.send({ content: clipboardContent });
});

router.post('/', (req, res) => {
  const { content } = req.body;
  if (typeof content === 'string') {
    clipboardContent = content;
    // You will need to find a way to access the 'io' instance here to emit events
    res.send({ message: 'Clipboard content updated successfully.' });
  } else {
    res.status(400).send({ message: 'Invalid content provided. Content must be a string.' });
  }
});

export { router as clipboardRouter };
