const express = require('express');
const router = express.Router();
const { upload, uploadFile, deleteFile } = require('../controllers/uploadController');

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// Delete file
router.post('/delete', deleteFile);

module.exports = router;
