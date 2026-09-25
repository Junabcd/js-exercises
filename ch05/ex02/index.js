export const converter = {
  // オブジェクトの中では function キーワードなしで書ける(メソッド省略記法)
  convertIf(s) {
    let str = "";
    for(let ch of s){
        if(ch === "\0"){
            str += "\\0"
        }
        else if(ch === "\b"){
            str += "\\b";
        }
        else if(ch === "\t"){
            str += "\\t";
        }
        else if(ch === "\n"){
            str += "\\n";
        }
        else if(ch === "\v"){
            str += "\\v";
        }
        else if(ch === "\f"){
            str += "\\f";
        }
        else if(ch === "\r"){
            str += "\\r";
        }
        else if(ch === '\"'){
            str += '\\"';
        }
        else if(ch === "\'"){
            str += "\\'";
        }
        else if(ch === "\\"){
            str += "\\\\";
        }
        else {
            str += ch;
        }
    }
    return str;
  },
  convertSwitch(s) {
    let str = "";
    for(let ch of s){
        switch(ch){
            case "\0":
                str += "\\0";
                break;
            case "\b":
                str += "\\b";
                break;
            case "\t":
                str += "\\t";
                break;
            case "\n":
                str += "\\n";
                break;
            case "\v":
                str += "\\v";
                break;
            case "\f":
                str += "\\f";
                break;
            case "\r":
                str += "\\r";
                break;
            case '\"':
                str += '\\"';
                break;
            case "\'":
                str += "\\'";
                break;
            case "\\":
                str += "\\\\";
                break;
            default:
                str += ch;
                break;
        }
    }
    return str;
  },
};