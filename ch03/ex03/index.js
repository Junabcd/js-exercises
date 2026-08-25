export function isSimilar(n,m){
    if(Math.abs(n-m) < 1e-10){
        return true;
    } else {
        return false;
    }
};