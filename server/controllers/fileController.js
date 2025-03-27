// File Controller
// Importing necessary libraries and modules
const multer = require("multer");
const path = require("path");
global.__basedir = path.resolve();
const fs = require("fs");

// Configuring storage for uploaded profile pictures
const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set destination folder for uploaded profile pictures
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
    // If you want to rename files, uncomment the following lines:
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const fileExtension = path.extname(file.originalname);
    // cb(null, `${req.params.id}_${uniqueSuffix}${fileExtension}`);
  },
});

// Creating a multer instance for uploading profile pictures
const upload = multer({
  storage: profilePicStorage,
  limits: {
    fileSize: 1024 * 1024 * 2, // Limit file size to 2MB (2,048 KB)
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific image file types
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Supported File Types: .jpeg, .jpg, .png"));
    }
  },
}).single("profilePic");

// Upload profile pictures
const uploadProfileImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(400).json({ error: err.message });
    }

    res.json({
      success: true,
      message: "Profile picture uploaded successfully",
      fileName: req.file.filename,
    });
  });
};

// Download profile pictures
const downloadFile = (req, res) => {
  try {
    const fileName = req.params.fileName;
    // const filePath = path.join(__basedir, "/uploads/", fileName);
    const filePath = __basedir + "/uploads/" + fileName;

    res.download(filePath, (error) => {
      if (error) {
        console.error("Error downloading file:", error);
        res.status(500).send({ message: "File cannot be downloaded" });
      }
    });
  } catch (error) {
    console.error("Error during file download:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Exporting the router
module.exports = { uploadProfileImage, downloadFile };
