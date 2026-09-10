export function eq(a, b) {
  // TODO: ここを実装しなさい
  if(a !== null && b !== null && typeof a === typeof b) return a === b; //aもbも同じ型の場合（typeofの場合nullはobjectと判断されてしまうのでnullは除外）
  if((a === null || a === undefined) && (b === null || b === undefined)) return true; //両方ともnullかundefinedの場合
  if(typeof a === "number" && typeof b === "string") return eq(a,Number(b)); //数値vs文字列
  if(typeof a === "string" && typeof b === "number") return eq(Number(a),b); //文字列vs数値
  if(typeof a === "boolean") return eq(Number(a),b); //aが論理値
  if(typeof b === "boolean") return eq(a,Number(b)); //bが論理値
  if((a !== null && (typeof a === "object" || typeof a === "function") && a instanceof Date) && (typeof b === "number" || typeof b === "string")) return eq(StringPrimitive(a),b); //aがDateオブジェクト（nullではないobjectかfunction）でbが数字か文字列か
  if((a !== null && (typeof a === "object" || typeof a === "function") && !(a instanceof Date)) && (typeof b === "number" || typeof b === "string")) return eq(ValuePrimitive(a),b); //aがDateじゃないオブジェクト（nullではないobjectかfunction）でbが数字か文字列か
  if((b !== null && (typeof b === "object" || typeof b === "function") && b instanceof Date) && (typeof a === "number" || typeof a === "string")) return eq(StringPrimitive(b),a); //bがDateオブジェクト（nullではないobjectかfunction）でbが数字か文字列か
  if((b !== null && (typeof b === "object" || typeof b === "function") && !(b instanceof Date)) && (typeof a === "number" || typeof a === "string")) return eq(ValuePrimitive(b),a); //bがDateじゃないオブジェクト（nullではないobjectかfunction）でbが数字か文字列か

  return false;
}

export function lte(a, b) {
  // TODO: ここを実装しなさい
  if(typeof ValuePrimitive(a) === "string" && typeof ValuePrimitive(b) === "string") return ValuePrimitive(a) < ValuePrimitive(b) || ValuePrimitive(a) === ValuePrimitive(b);
  else return Number(ValuePrimitive(a)) < Number(ValuePrimitive(b)) || Number(ValuePrimitive(a)) === Number(ValuePrimitive(b));
}

function StringPrimitive(obj){
  const n = obj.toString();
  if(n === null || (typeof n !== "object" && typeof n !== "function")) return n;
  else return obj.valueOf();
}

function ValuePrimitive(obj){
  if(obj === null || (typeof obj !== "object" && typeof obj !== "function")) return obj;// lte用に先に基本値かどうかのガードをかける。
  const n = obj.valueOf();
  if(n === null || (typeof n !== "object" && typeof n !== "function")) return n;
  else return obj.toString();
}
