import express from 'express';
import Data from '../model/Data.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/data', authenticate, async (req, res) => {
  try {
    const data = await Data.find({}, { _id: 0 }).sort({ timestamp: -1 }).lean();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transformer data' });
  }
});

router.post('/data', authenticate, async (req, res) => {
  try {
    const { voltage, current, temperature } = req.body;

    if (![voltage, current, temperature].every(Number.isFinite)) {
      return res.status(400).json({ error: 'Invalid transformer data' });
    }

    const record = await Data.create({ voltage, current, temperature });
    req.app.get('io').emit('newData', record.toJSON());

    res.status(201).json(record.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Failed to store transformer data' });
  }
});

export default router;
