$(document).ready(function() {

    $("#getMessage").on("click", function() {
     var searchvalue = $('#getText').val()
     if (searchvalue === "") {
      return;
     }
     select();
    });
  
   
    function select() {
     var ddvalue = $('#select_id').val();
     var searchvalue = $('#getText').val()
     var searchCity = "&q=" + searchvalue;
     var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + ddvalue + "&entity_type=city" + searchCity + "&count=100",
      "method": "GET",
      "headers": {
       "user-key": "2721256bd8c208dfd3bc77e5332478fc",
       'Content-Type': 'application/x-www-form-urlencoded'
      }
     }
   
     $.getJSON(settings, function(data) {
   
      data = data.restaurants;
      var html = "";
   
      $.each(data, function(index, value) {
   
       var x = data[index];
        console.log(typeof x);
       $.each(x, function(index, value) {
        var location = x.restaurant.location;
        var userRating = x.restaurant.user_rating;
        html += "<div class='data img-round'>";
        html += "<div class='rating'>";
   
        html += "<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
       
        html += "</div>";
        html += "<img class='resimg img rounded-circle' src=" + value.thumb + " alt='Restaurant Image' height='155' width='175'>";
        html += "<a href=" + value.url + " target='_blank' class='action_link'><h2 style='color:whitesmoke;'><strong>" + value.name + "</strong></h2></a>";
        html += "  <strong class='text-light'>" + location.locality + "</strong><br>";
        html += "  <h6 style='color:grey;'><strong>" + location.address + "</strong></h6><br>";
        html += "  <strong>CUISINES</strong>: " + value.cuisines + "<br>";
     
        html += "</div><br>";
       });
      });
      $(".message").html(html);
     });
   
    }
    
    $("#select_id").change(function() {
     select();
    });
   });