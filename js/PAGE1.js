$(document).ready(function(){
    $(".chapter-nav").hide();
    $("#list").mouseover(function(){
      $(".chapter-nav").slideToggle("slow");
    });
  });