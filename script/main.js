$(function() {
  // $('.later').hide();
  $("#contents").accordion({
    event:"click, mouseover",
    heightStyle: "content"
  });

  // $("#dialog").hide();

  var dialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    show: {
      effect: "slide",
      direction: "right",
      duration: 500
    },
    hide: {
      effect: "slide",
      direction: "left",
      duration: 500
    },
    open: function() {
      $(".ui-widget-overlay").on("click", function() {
        console.log("close!");
        dialog.dialog("close");
      });
    }
  });

  $("h1").click(function() {
    dialog.dialog("open");
  });

  $(".interest").click(function() {
    console.log($(this).text());
    dialog.dialog("option", "title", $(this).text());
    dialog.dialog("open");
  });

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // mobile
    console.log("mobile");
  } else {
    console.log("desktop");
  }

});

