
$(document).on("click", ".btn-large", function(){   

$.getJSON("/scrape", function (data) {
console.log(data);
window.location.reload();



    // });
});
});
$(document).on("click", "#save", function(){   
    
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

          $(document).on("click", ".delete", function(){   
            let id = $(this).data("id");
        
            //PUT request.
            $.ajax("/delete/" + id, {
              type: "PUT",
            }).then(
              function () {
                console.log("deleted");
                // Reload the page to get the updated list
                location.reload();
              });
          }); 

$(document).on("click", ".addBtn", function() {
    let thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {

        body: $(".materialize-textarea").val()
      }
    })
      .then(function(data) {
        console.log(data);
      });
  
    $(".materialize-textarea").val("");
    location.reload();

  });
    