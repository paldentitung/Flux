// import multer from "multer";

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png|webp/;

//   const ext = allowed.test(
//     file.originalname.split(".").pop().toLowerCase()
//   );

//   const mime = allowed.test(file.mimetype);

//   if (ext && mime) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;

  const ext = allowed.test(file.originalname.split(".").pop().toLowerCase());

  const mime = allowed.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
