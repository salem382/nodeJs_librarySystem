import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';


// export const fileUpload = (filename:any) => {

//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, 'uploads/')
//           console.log (req.body);
//         },
//         filename: function (req, file, cb) {
//           cb(null,uuidv4() + file.originalname)
//         }
//       })

//       function fileFilter (req:any, file:any, cb:any) {

//         if (file.mimetype.startsWith('image'))
//           return  cb(null, true)
          
//         cb(null, false)
        
//       }
      
//       const upload = multer({ storage: storage })
//       return upload.single(filename)
// }

export const fileUpload = (fields: string[]) => {
  const multerFields = fields.map((field) => ({ name: field, maxCount: 1 }));
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + file.originalname);
    },
  });
  const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({ storage });
  return upload.fields(multerFields);
};
