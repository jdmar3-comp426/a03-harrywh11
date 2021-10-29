import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let l = array.length;
    let result = 0;
    for (let i = 0; i<l;i++){
        result +=array[i];
    }
    return result;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
let narray = array.sort;
let l = narray.length;
if ((l%2)==0){
    return (narray[l/2]+narray[(l/2)-1]);
}
else{
    return (narray[(l-1)/2]);
}
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
let total = getSum(array);
let l =array.length;
let ave = total/l;
let maxi = Math.max(...array)
let mini = Math.min(...array)
let medi = getMedian(array);
let vari = 0
for (let i =0;i<l;i++){
    vari+=(array[i]-ave)**2
}
vari = vari/l
let stdv = vari**0.5
return {min: mini, max: maxi, median: medi, variance: vari, mean: ave, length: l, sum: total, standard_deviation: stdv}
}

