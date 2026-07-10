const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dn0bmsj49',
  api_key: process.env.CLOUDINARY_API_KEY || '734895963178181',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'kqB72GAa1kfoCcmgrlYY-fFChP8',
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow PDF, images, and common document formats
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, images, and Word documents are allowed.'));
    }
  },
});

// Upload single file to Cloudinary
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'college-admission-documents',
        public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ 
            success: false, 
            message: 'Error uploading to Cloudinary',
            error: error.message 
          });
        }

        res.json({
          success: true,
          data: {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            size: result.bytes,
            original_name: req.file.originalname,
          },
        });
      }
    ).end(req.file.buffer);

  } catch (error) {
    next(error);
  }
};

// Delete file from Cloudinary
const deleteFile = async (req, res, next) => {
  try {
    const { public_id } = req.body;
    
    if (!public_id) {
      return res.status(400).json({ success: false, message: 'Public ID is required' });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    
    res.json({
      success: true,
      message: 'File deleted successfully',
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadFile,
  deleteFile,
};
