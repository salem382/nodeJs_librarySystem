"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
const generateCode = () => {
    const symbols = 'qwertyuioplkjhgfdsazxcvbnm';
    let code = "";
    for (let i = 0; i < 5; ++i) {
        let randomNum = Math.floor(Math.random() * 26);
        code += symbols[randomNum];
    }
    return code;
};
exports.generateCode = generateCode;
