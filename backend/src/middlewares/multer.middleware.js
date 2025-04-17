import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname) // You can also use the default file.fieldname + '-' + uniqueSuffix.
    }
  });

export const upload = multer({ storage: storage })