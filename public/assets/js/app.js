
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
     
        $(document).on("click", ".saved", function(){   
            let id = $(this).data("id");
        
            //PUT request.
            $.ajax("/save/" + id, {
              type: "PUT",
            }).then(
              function () {
                console.log("SAVED");
                // Reload the page to get the updated list
                location.reload();
              });
          }); 
            // });
    