export function hash(str) {
    let hashValue = 0;
    if(typeof str !== "string"){
        throw new TypeError("key must be a string");
    }
    for(let i = 0; i < str.length; i++){
        hashValue += str.charCodeAt(i);
    }
    return hashValue;
}

export function newHashTable(capacity) {
    return {
        size: 0, // マッピング数を示すプロパティ
        entries: new Array(capacity), // マッピングを格納する固定長の配列
        get(key) {
            // keyにマップされた値を取得する
            const index = hash(key) % capacity;
            let node = this.entries[index];
            while(node !== undefined){
                if(node.key === key){
                    return node.value;
                }
                node = node.next;
            }    
            return undefined;
        },
        put(key, value) {
            // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
            const index = hash(key) % capacity;
            if(this.entries[index] === undefined){
                this.entries[index] = { key, value, next: undefined };  //プロパティ名と変数名が同じ場合は、片方を省略できる。{ key: key, value: value, next: undefined }
                this.size++;
            }
            else{
                let node = this.entries[index];
                while(node.next !== undefined){
                    if(node.key === key){
                        node.value = value;
                        return;
                    }
                    node = node.next;
                }
                if(node.key === key){
                    node.value = value;
                    return;
                }
                else{
                    node.next = { key, value, next: undefined };
                    this.size++;
                }
            }
            
        },
        remove(key) {
            // keyのマッピングを削除する
            const index = hash(key) % capacity
            let prev = undefined;
            let node = this.entries[index];
            while(node !== undefined){
                if(node.key === key){
                    if(prev === undefined){
                        this.entries[index] = node.next;
                        this.size--;
                        return;
                    }
                    else{
                        prev.next = node.next;
                        this.size--;
                        return;
                    }
                }
                prev = node;
                node = node.next;
            }
            
        },
    };
}

function sample() {
    const hashTable = newHashTable(10);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    console.log(`size=${hashTable.size}`); // => size=2
    console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
    console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

    hashTable.put("key2", "new value");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

    hashTable.remove("key2");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
    console.log(`size=${hashTable.size}`); // => size=1
}