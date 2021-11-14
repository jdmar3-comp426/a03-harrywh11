import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {
    avgMpg: {city:mpg_data.map(element => element.city_mpg).reduce((a, b) => a + b, 0)/mpg_data.length,highway:pg_data.map(element => element.highway_mpg).reduce((a, b) => a + b, 0)/mpg_data.length},
    allYearStats: getStatistics(mpg_data.map(element => element.year)),
    ratioHybrids: mpg_data.map(element => element.hybrid).filter(Boolean).length/mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.reduce(function (a,b) {
   let currentmake = b.make;
  if (a.find(c => c.make === currentmake)) {
    if (b.hybrid){
      a.find(c => c.make === currentmake).hybrids.push(b.id)
    }
  }
  else {
    if (b.hybrid){
      a.push({"make": currentmake,"hybrids":[b.id]})
    }
  }
  return a
}, []).sort(function (p1, p2) {
  return p2.hybrids.length - p1.hybrids.length;
}),
    avgMpgByYearAndHybrid: mpg_data.reduce(function (a,b) {
        let currentyear = b.year;
       if (a.find(c => Object.keys(c)[0] == currentyear)) {
         if (b.hybrid){
           a.find(c => Object.keys(c)[0]== currentyear)[currentyear].hybrid.push({city:b.city_mpg,highway:b.highway_mpg})
         }
         else{
           a.find(c => Object.keys(c)[0]== currentyear)[currentyear].notHybrid.push({city:b.city_mpg,highway:b.highway_mpg})
         }
       }
       else {
         a.push({[currentyear]:{hybrid:[],notHybrid:[]}})
         if (b.hybrid){
           a.find(c => Object.keys(c)[0]== currentyear)[currentyear].hybrid.push({city:b.city_mpg,highway:b.highway_mpg})
         }
         else{
           a.find(c => Object.keys(c)[0]== currentyear)[currentyear].notHybrid.push({city:b.city_mpg,highway:b.highway_mpg})
         }
       }
       return a
     }, [])
     .reduce(function (p1, p2) {
       let cy = Object.keys(p2)[0]
       if(p1[cy]){
         p1[cy].hybrid={city:p2[cy].hybrid.map(element => element.city).reduce((a, b) => a + b, 0)/p2[cy].hybrid.length, highway:p2[cy].hybrid.map(element => element.highway).reduce((a, b) => a + b, 0)/p2[cy].hybrid.length}
         p1[cy].notHybrid={city:p2[cy].notHybrid.map(element => element.city).reduce((a, b) => a + b, 0)/p2[cy].notHybrid.length, highway:p2[cy].notHybrid.map(element => element.highway).reduce((a, b) => a + b, 0)/p2[cy].notHybrid.length}
       }
       else{
         p1[cy]={hybrid:{city:p2[cy].hybrid.map(element => element.city).reduce((a, b) => a + b, 0)/p2[cy].hybrid.length, highway:p2[cy].hybrid.map(element => element.highway).reduce((a, b) => a + b, 0)/p2[cy].hybrid.length},
           notHybrid:{city:p2[cy].notHybrid.map(element => element.city).reduce((a, b) => a + b, 0)/p2[cy].notHybrid.length, highway:p2[cy].notHybrid.map(element => element.highway).reduce((a, b) => a + b, 0)/p2[cy].notHybrid.length}}
       }
       return p1;
     },{})
};
