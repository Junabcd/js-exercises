export function add(x,y){
    const z = {a: x.a + y.a, b: x.b+y.b}; //実部同士（プロパティa）と虚部同士（プロパティb）を足し算
    return z;
};

export function sub(x,y){
    const z = {a: x.a - y.a, b: x.b - y.b};//実部同士（プロパティa）と虚部同士（プロパティb）を引き算（x-y）
    return z;
};

export function mul(x,y){
    const z = {a: (x.a * y.a - x.b * y.b), b: (x.a * y.b + y.a * x.b)};//(a1+b1i)(a2+b2i)=a1a2+a1b2i+a2b1i-b1b2=(a1a2-b1b2)+(a1b2+a2b1)i→(プロパティa同士の掛け算-プロパティb同士の掛け算)+(プロパティaとプロパティbの掛け算同士の足し算)
    return z;
};

export function div(x,y){
    const n2 = y.a * y.a + y.b * y.b;// 分母をn2としてy.aの2乗+y.bの2乗とする
    const z = {a: (x.a * y.a + x.b * y.b)/n2, b: (-x.a * y.b + y.a * x.b)/n2};//(a1a2-a1b2i+a2b1i+b1b2)/(a2^2+b2^2)=(a1a2+b1b2)/(a2^2+b2^2)+(-a1b2+a2b1)i/(a2^2+b2^2)→(a1a2+b1b2)/n2+(-a1b2+a2b1)i/n2
    return z;
};