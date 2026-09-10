export function slice(str, indexStart, indexEnd) {
  let indexStart_number = Number(indexStart); // 数字かどうかの判断。
  let indexEnd_number = indexEnd === undefined ? str.length : Number(indexEnd); //indexEndに関してはundefinedかの判断も必要なため。

  indexStart_number = Number.isNaN(indexStart_number) ? 0 : Math.trunc(indexStart_number); //NaNだったら0でそれ以外の場合は整数にする。Infinityもカバー
  indexEnd_number = Number.isNaN(indexEnd_number) ? 0 : Math.trunc(indexEnd_number);

  if (indexStart_number < 0) indexStart_number = Math.max(indexStart_number + str.length, 0); //-のものを0に丸める。
  if (indexStart_number >= 0) indexStart_number = Math.min(indexStart_number, str.length); //文字数よりも大きい値を文字数に丸める。

  if (indexEnd_number < 0) indexEnd_number = Math.max(indexEnd_number + str.length, 0);
  if (indexEnd_number >= 0) indexEnd_number = Math.min(indexEnd_number, str.length);
  let str_final = "";
  for(var i = indexStart_number; i < indexEnd_number; i++)
  {
    str_final += str[i];
  }

  return str_final;
}