import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    const newArray= car_data.map(element => element.x)
    let result = car_data.filter(element => element.horsepower > minHorsepower)
    .filter(element => element.torque > minTorque).sort(function (p1, p2) {
        return p2.horsepower - p1.horsepower;
      });
    return result;
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let result = car_data.filter(element => element.city_mpg > minCity)
    .filter(element => element.highway_mpg > minHighway).sort(function (p1, p2) {
        return p2.highway_mpg - p1.highway_mpg;
      });
    return result;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let result = car_data.filter(element => element.id.toLowerCase() == searchTerm.toLowerCase())
    return result;
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let result=[]
    for (var i in years){
        result.concat(car_data.filter(element => element.year == i))
    }
    result=result.sort(function (p1, p2) {
        return p2.year - p1.year;
      });
    return result;
}
