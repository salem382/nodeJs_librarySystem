"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
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
const fileUpload = (fields) => {
    const multerFields = fields.map((field) => ({ name: field, maxCount: 1 }));
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, (0, uuid_1.v4)() + file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    const upload = (0, multer_1.default)({ storage });
    return upload.fields(multerFields);
};
exports.fileUpload = fileUpload;
