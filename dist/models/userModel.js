"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "active";
    UserStatus["NotActive"] = "notactive";
})(UserStatus || (UserStatus = {}));
var roleStatus;
(function (roleStatus) {
    roleStatus["customer"] = "customer";
    roleStatus["admin"] = "admin";
})(roleStatus || (roleStatus = {}));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String, minlength: [3, "error in name length"], maxlength: [25, "error in name length"]
    },
    email: {
        type: String, minlength: 3, maxlength: 30
    },
    password: { type: String, minlength: [1, 'error in length'], maxlength: [200, 'error in length'], },
    confirmEmail: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.Active },
    role: { type: String, enum: Object.values(roleStatus), default: roleStatus.customer },
    verifyCode: { type: String, default: "dfadfh52dfh" },
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
