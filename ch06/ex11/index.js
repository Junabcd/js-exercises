export let p = {
    // rとthetaはデータプロパティ
    r: 0,
    theta: 0,
    get x(){return this.r * Math.cos(this.theta);},
    set x(newX){
        if(!Number.isFinite(newX)){ //数値以外、NaN、Infinityを全部はじく。Infinityはrやthetaを計算しなおした結果、xやyをNaNにしてしまう場合があるのではじく。
            throw new RangeError("x must be a finite number");
        }
        let oldY = this.y;
        this.r = Math.hypot(newX, oldY);
        this.theta = Math.atan2(oldY, newX);
    },
    get y(){return this.r * Math.sin(this.theta);},
    set y(newY){
        if(!Number.isFinite(newY)){ //数値以外、NaN、Infinityを全部はじく。Infinityはrやthetaを計算しなおした結果、xやyをNaNにしてしまう場合があるのではじく。
            throw new RangeError("y must be a finite number");
        }
        let oldX = this.x;
        this.r = Math.hypot(oldX, newY);
        this.theta = Math.atan2(newY, oldX);
    },
};