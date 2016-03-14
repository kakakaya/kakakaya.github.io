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
    }
  });

  var loading_html = '<h3>Now loading!</h3><p>読み込み中です。</p><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div>';

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
      data: "key=KEY&interest="+title,
      timeout: 5000,
      url: url,
      success: function(data, status) {
        if (status == "success") {
          $("#dialog_content").html(data.html+"<p>もっと詳しく見たい場合は<a href=\""+alt_url+"\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        } else {
          $("#dialog_content").html("<p>取得に失敗しました。</p><p>かわりに<a href=\""+alt_url+"\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        }
      },
      error: function(data, status) {
        if (status == "timeout") {
          $("#dialog_content").html("<h3>Timeout</h3><p>読み込みに時間がかかっているようです。</p><p>かわりに<a href=\""+alt_url+"\" target=\"_blank\">こちらを参照してみてください。</a></p>");
        }
      }
    });

    // データを待ちつつダイアログを表示する
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
