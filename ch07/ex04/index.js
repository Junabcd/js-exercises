const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

function mathSum(data){
    let sum = 0;
    data.forEach(obj => {sum += obj.math;}); //合計
    return sum;
}

console.log(mathSum(data)); //530

function chemistryAve(data){
    let sum = 0;
    data.forEach(obj => {sum += obj.chemistry;});
    return sum/data.length; //合計したものをdataの要素数で割って平均値を算出
}

console.log(chemistryAve(data)); //49.44444444444444

function classCAve(data){
    let sum = 0;
    const classCArray = data.filter(obj => obj.class === "C"); //クラスCのものだけ取り出す。
    classCArray.forEach(obj => {sum += obj.math + obj.chemistry + obj.geography;});
    return sum/classCArray.length;
}

console.log(classCAve(data)); //176.66666666666666

function maxSumName(data){
    const max = data.reduce((acc, cur) => ((acc.math + acc.chemistry + acc.geography) > (cur.math + cur.chemistry + cur.geography) ? acc : cur)); //合計得点が高い要素を取り出す
    return max.name; //合計得点が高いオブジェクトから名前を取り出す
}

console.log(maxSumName(data)); //Frank

function geographyStdDev(data){
    let ave = 0;
    let sum = 0;
    data.forEach(obj => {sum += obj.geography;});
    ave = sum/data.length; //平均値を求める
    const squaredDiffs = data.map(obj => (obj.geography - ave) ** 2); //平均値との差の2乗を算出して新たな配列に入れる
    let squaredDiffsSum = 0;
    squaredDiffs.forEach(value => {squaredDiffsSum += value;}); //新たな配列の各要素の合計値を算出
    return Math.sqrt(squaredDiffsSum/squaredDiffs.length); //平均して平方根を取る
}

console.log(geographyStdDev(data)); //22.3330569358242