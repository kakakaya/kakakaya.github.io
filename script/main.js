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
    height: $(window).height()*0.85,
    width: $(window).width()*0.85,
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
    },
    close: function() {
      $("#dialog_content").html("<h3>Now loading!</h3><p>読み込み中です。</p>");
    }
  });

  $(".interest").click(function() {
    var title = $.trim($(this).text());
    var url = $(this).attr("data-href");
    dialog.dialog("option", "title", title);
    console.log(url == "");
    if (url === "") {
      $("#dialog_content").html("<h3>Unknown Type!</h3><p>"+title+":この項目のデータをまだ作っていません。</p>");
    } else {
      $("#dialog_content").html("<h3>Now loading!</h3><p>読み込み中です。</p>");
      $.ajax({
        dataType: "json",
        data: "key=KEY",
        timeout: 5000,
        url: url,
        success: function(data, status) {
          console.log(data);
          console.log(status);
          if (status == "success") {
            $("#dialog_content").html(makeDialogContent(title, data));
          } else {
            $("#dialog_content").html("<p>取得に失敗しました。</p>");
          }
        }
      });
    }
    dialog.dialog("open");
  });

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // mobile
    console.log("mobile");
  } else {
    console.log("desktop");
  }

});

// GETしてきたデータを内容毎にパースしてダイアログの具を作る
function makeDialogContent(interestType, data){
  var html = "";
  if (interestType == "アニメ") {
    html += "<h3>"+data.season+"アニメについて</h3>";
    if (data.items.length == 0) {
      html += "<p>最近アニメ見てないです……。(データ取得元:<a href=\"http://animetick.net/\" target=\"_blank\">Animetick</a>)</p>";
    } else {
      html += "<p>最近はこの辺を見ています(データ取得元:<a href=\"http://animetick.net/\" target=\"_blank\">Animetick</a>)。</p>";
      html += "<div class=\"dialog_content_table\"><table>";
      for(var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        var p = item.progress;
        html += "<tr><th>"+item.title+"</th><td class=\"count\">"+p.slice(p.indexOf("/")+1)+
          "</td><td>話中</td><td class=\"count\">"+p.slice(0, p.indexOf("/"))+
          "</td><td>話視聴済み</td></tr>";
      }
      html += "</table></div>";
      html += "<a href=\"http://animetick.net/users/kakakaya\" target=\"_blank\">続きを見る......</a>";
    }
    return html;
  } else {
    return "<h1>Unknown Type!</h1><p>"+interestType+":この項目のデータをまだ作っていません。</p>";
  }
}
