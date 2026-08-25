// +のパターンを書く
console.log(Infinity+Infinity); // Infinity
console.log(Infinity+NaN); // NaN
console.log(Infinity+(-Infinity)); // NaN
console.log(NaN+Infinity); // NaN
console.log(NaN+NaN); // NaN
console.log(NaN+(-Infinity));
console.log(-Infinity+Infinity); // NaN
console.log(-Infinity+NaN); // NaN
console.log(-Infinity+(-Infinity)); // -Infinity
console.log("--------------");

// -のパターンを書く
console.log(Infinity-Infinity); // NaN
console.log(Infinity-NaN); // NaN
console.log(Infinity-(-Infinity)); // Infinity
console.log(NaN-Infinity); // NaN
console.log(NaN-NaN); // NaN
console.log(NaN-(-Infinity)); //NaN
console.log(-Infinity-Infinity); // -Infinity
console.log(-Infinity-NaN); // NaN
console.log(-Infinity-(-Infinity)); // NaN
console.log("--------------");

// *のパターンを書く
console.log(Infinity*Infinity); // Infinity
console.log(Infinity*NaN); // NaN
console.log(Infinity*(-Infinity)); // -Infinity
console.log(NaN*Infinity); // NaN
console.log(NaN*NaN); // NaN
console.log(NaN*(-Infinity)); //NaN
console.log(-Infinity*Infinity); // -Infinity
console.log(-Infinity*NaN); // NaN
console.log(-Infinity*(-Infinity)); // Infinity
console.log("--------------");

// /のパターン
console.log(Infinity/Infinity); // NaN
console.log(Infinity/NaN); // NaN
console.log(Infinity/(-Infinity)); // NaN
console.log(NaN/Infinity); // NaN
console.log(NaN/NaN); // NaN
console.log(NaN/(-Infinity)); // NaN
console.log(-Infinity/Infinity); // NaN
console.log(-Infinity/NaN); // NaN
console.log(-Infinity/(-Infinity)); // NaN
console.log("--------------");