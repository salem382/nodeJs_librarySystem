export const generateCode = ():string => {

    const symbols:string = 'qwertyuioplkjhgfdsazxcvbnm';
    let code:string = "";

    for (let i:number= 0; i < 5; ++i) {
        let randomNum:number = Math.floor(Math.random() * 26);
        code+= symbols[randomNum];
    }

    return code;
}
