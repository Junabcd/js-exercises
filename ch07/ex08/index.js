export function reverse(str){
    if(typeof str !== "string"){
        throw new TypeError("str must be strings.");
    }
    const segmenterJa = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const segments = segmenterJa.segment(str);
    const jaArray = [...segments].map(x => x.segment);
    jaArray.reverse();
    return jaArray.join("");
}