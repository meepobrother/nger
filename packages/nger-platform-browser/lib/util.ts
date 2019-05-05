export const deepFlattenFn = (arr) => {
    arr = Array.isArray(arr) ? arr : [arr];
    return [].concat(...arr.map(v => Array.isArray(v) ? deepFlattenFn(v) : v))
}