export function createPoint(){
    return {x: 0, y: 0};
}

export function createNewPoint(point){
    return Object.create(point);
}