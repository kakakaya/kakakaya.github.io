$(function() {
  // $('.later').hide();
  $("#contents").accordion({
    event: "click, mouseover",
    heightStyle: "content"
  });

  // $("#dialog").hide();

  var dialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    height: $(window).height() * 0.85,
    width: $(window).width() * 0.85,
    show: {
      effect: "slide",
      direction: "right",
      duration: 300
    },
    hide: {
      effect: "slide",
      direction: "left",
      duration: 300
    },
    open: function() {
      $(".ui-widget-overlay").on("click", function() {
        dialog.dialog("close");
      });
    }
  });

  var loading_html = '<h3>Now loading!</h3><p>読み込み中です。</p><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div>';

  $(".interest").mouseenter(function () {
    $(this).css("background-color", "#507050");
  });

  $(".interest").mouseleave(function () {
    $(this).css("background-color", "");
  });

  $(".interest").click(function() {
    var title = $.trim($(this).text());
    // GAS側の更新に合わせてここを変える必要あり
    var url = "https://script.google.com/macros/s/AKfycbxQTXf_cRFiqPFVEHJVKEEBUrns9sG82eSMpdFve9U676wY6B4f/exec";
    var alt_url = $(this).attr("alt-href");
    console.log(url);
    console.log(alt_url);
    dialog.dialog("option", "title", title);

    // 読み込み中……
    $("#dialog_content").html(loading_html);

    // 非同期でデータ取得
    $.ajax({
      dataType: "json",
      data: "key=KEY&interest=" + title,
      timeout: 8000,
      url: url,
      success: function(data, status) {
        if (status == "success") {
          $("#dialog_content").html(data.html + "<p>もっと詳しく見たい場合は<a href=\"" + alt_url + "\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        } else {
          $("#dialog_content").html("<p>取得に失敗しました。</p><p>かわりに<a href=\"" + alt_url + "\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        }
      },
      error: function(data, status) {
        if (status == "timeout") {
          $("#dialog_content").html("<h3>Timeout</h3><p>読み込みに時間がかかっているようです。</p><p>かわりに<a href=\"" + alt_url + "\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        }
      }
    });

    // データを待ちつつダイアログを表示する
    dialog.dialog("open");
  });

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // mobile
    console.log("mobile");
  } else {
    console.log("desktop");
  }

});
