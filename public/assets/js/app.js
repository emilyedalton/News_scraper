
// $(document).ready(function() {
$(document).on("click", ".btn-large", function(){   
// $("#button").on("click",  function() {

console.log("I'm working");
//     $("#newsDiv").empty();
    $.getJSON("/scrape", function (data) {
console.log(data);


    // });
});
});
$(document).on("click", "#save", function(){   
    // $("#button").on("click",  function() {
    
    // console.log("I'm working");
    //     $("#newsDiv").empty();
        $.getJSON("/saved", function (data) {
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



          // When you click the savenote button
$(document).on("click", ".addBtn", function() {
    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        // Value taken from note textarea
        body: $(".materialize-textarea").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $(".materialize-textarea").val("");
  });
            // });
    