export function getRandom(min:number,max:number){
    const gap = max - min;
    return Math.floor(Math.random() * gap + min)
}