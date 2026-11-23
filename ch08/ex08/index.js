export function counterGroup(){
    const counterList = []; //それぞれで作成されたカウンターオブジェクトを管理するための箱
    function counter() { //土台となるカウンターオブジェクトを作成する。
        let n = 0;
        return {
            count: function() { return n++; }, //count: function count()でもいいが、呼ぶときはプロパティ名を使用するのでfunctio()と省略する。省略した場合はプロパティ名から関数名を自動でつける。
            reset: function() { n = 0; }, //上に同じく。
            get: function(){ return n; } //countを呼ぶとカウントを集計するたびに呼んだ際にnが増えてしまうので、nを返すだけのgetプロパティを追加。
        };
    }
    return {
        newCounter: function() { //関数名省略
            const c = counter(); //カウンターオブジェクトを作成。
            counterList.push(c); //カウンターリストに追加。
            return c;
        },
        total: function() { //関数名省略
            let result = 0;
            for(let counter of counterList){ //カウンターリストにあるカウンター分だけループする。
                result += counter.get(); //getメソッドで各カウンターの回数を呼び出して合計する。
            }
            return result;
        },
        average: function() { //関数名省略
            if(counterList.length === 0){ //カウンターが1つもないと0除算になるので。
                throw new TypeError("No counters exist.");
            }
            let sum = 0;
            for(let counter of counterList){ //カウンターリストにあるカウンター分だけループする。
                sum += counter.get(); //getメソッドで各カウンターの回数を呼び出して合計する。
            }
            return sum/counterList.length; //各メソッド内で計算を完結させたいので、このような書き方にした。total()を利用する書き方もあるが、一旦それぞれのメソッドごとに実装する。
        },
        variance: function() { //関数名省略
            if(counterList.length < 2){ //カウンターが1つの場合はばらつきがなくなるので。
                throw new TypeError("variance() requires at least 2 counters.");
            }
            let sum = 0;
            let ave = 0;
            let sumOfSquares = 0;
            for(let counter of counterList){ //ここではカウンターの合計値を算出するためにループ。
                sum += counter.get(); //getメソッドで各カウンターの回数を呼び出して合計する。
            }
            ave = sum/counterList.length;
            for(let counter of counterList){ //ここでは差の2乗の合計値を算出するためにループ。
                sumOfSquares += (counter.get() - ave) ** 2;
            }
            return sumOfSquares/counterList.length;
        }
    };
}