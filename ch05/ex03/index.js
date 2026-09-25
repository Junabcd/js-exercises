export const MonthChecker = {
  // オブジェクトの中では function キーワードなしで書ける(メソッド省略記法)
  has31DaysIf(s) {
    if((s === "Jan") || (s === "Mar") || (s === "May") || (s === "Jul") || (s === "Aug") || (s === "Oct") || (s === "Dec")){
        return true;
    }
    else return false; //elseは省略可
  },
  has31DaysSwitch(s) {
    switch(s){
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        default:
            return false;
    }
  },
};