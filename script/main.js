$(function() {
  // $('.later').hide();
  $("#contents").accordion({
    event:"click, mouseover",
    heightStyle: "content"
  });

  $("#dialog").hide();

  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "slide",
      direction: "right",
      duration: 500
    },
    hide: {
      effect: "slide",
      direction: "left",
      duration: 500
    }
  });

  $("h1").click(function() {
    $("#dialog").dialog("open");
  });

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // mobile
    console.log("mobile");
  } else {
    console.log("desktop");
  }
});

