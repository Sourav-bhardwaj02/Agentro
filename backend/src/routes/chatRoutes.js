const express = require('express');
const router = express.Router();
const {
  getSessions,
  getSession,
  createSession,
  sendMessage,
  deleteSession,
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSessions).post(protect, createSession);
router.route('/:id').get(protect, getSession).delete(protect, deleteSession);
router.post('/:id/message', protect, sendMessage);

module.exports = router;
