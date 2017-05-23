"use strict";

// this is the base API url
var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/";
var page_num = 3
// var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/${page_num +=1}/3";


function formatCars(carsJSON) {
  // this function shold return a string of properly formatted html
  // refer to app/views/index.erb lines 16 - 22 for an example of how
  // to format three cars, each in a div with a class "col-md-4", in a
  // div with a class "row"
  var original = '<div class=\"row\">'
  var next_three = carsJSON.map(car =>
    `<div class=\"col-md-4 car\">
      <h2>`+car.Make+`</h2><p><strong>Model:</strong></p><p>`+car.Model+`</p><p><strong>Year:</strong>`+car.Year+`</p></div>`
  ).join("")

  let load_next = `${next_three}</div>`
  return original + load_next
}

function addCarsToDOM(carsJSON) {
  // this function should pass carsJSON to formatCars() and then
  // add the resulting HTML to the div with an id of "cars"
  let cars = formatCars(carsJSON)
  $('#cars').append(cars)

}

function fetchJSON() {
  // this function will make the ajax call
  // on success of the ajax call, it will pass the returned data
  // to addCarsToDOM()
  var url = `${baseUrl}/${page_num}/3`
  page_num += 1

  $.ajax({
       url: url,
       contentType: 'application/json',
       dataType: 'jsonp',
       success: function(cars){
         addCarsToDOM(cars)
       },
       error: function(response) {
         $('body').text("Sorry, there was an error with the request. Please refresh the page.")
       }


     });

}

// function fetchJSON() {
//   var url = baseUrl + pageNumber + "/3";
//   pageNumber += 1;
//   $.ajax({
//     url: url,
//     contentType: 'application/json',
//     dataType: 'jsonp',
//     success: function(cars) {
//       addCarsToDOM(cars);
//     },
//     error: function(response) {
//       $('body').text("Sorry, there was an error with the request. Please refresh the page.")
//     }
//   });
// }
