
// $(document).ready(function() {
$(document).on("click", ".btn-large", function(){   
// $("#button").on("click",  function() {

// console.log("I'm working");
//     $("#newsDiv").empty();
    $.getJSON("/scrape", function (data) {
console.log(data);


    // });
});
});