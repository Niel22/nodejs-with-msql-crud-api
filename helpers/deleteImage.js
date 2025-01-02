const fs = require("fs");
const path = require("path");

const deleteImage = (image) => {
    const imagePath = path.join(__dirname, "../uploads", image);
    
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("Error deleting file:", err);
      } else {
        console.log(`Image ${image} deleted successfully.`);
      }
    });
  };

module.exports = {
    deleteImage: deleteImage
}