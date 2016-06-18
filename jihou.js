/**************************************************
jihou.gs 特定日時にいろんなお知らせを投下してくれます。

現在はTrello整理のタイミングを告知するのに使っています。
**************************************************/

/* 報告タイムの開始をPost */
function  reporttime(){ 
  postSlackMessage(jihou());
  postSlackMessage("<!channel> 報告タイムです！各自 * `#report` ボード* の自分のカードを最新の状態にしてください。");
  Utilities.sleep(120000);
  postSlackMessage("今日の報告タイムを終わります。お疲れ様でした。");
  }

function  trellotime(){ //Trello記入タイムの開始をPost
  postSlackMessage(jihou());
  postSlackMessage("<!channel> Trello整理タイムです！各自自分が担当になっているカード( `@me is:open` で検索)をチェックしてください。\n終わった人はボードを整理整頓しましょう。");
  Utilities.sleep(240000);
  postSlackMessage("今週のTrello整理タイムを終わります。お疲れ様でした。");
  }

function postSlackMessage(content) {
  var options = {
    channelId: "#announce",
    userName: "LyncsBot",
    message: content,
    bot_icon : "https://pbs.twimg.com/profile_images/716618387418259456/wXNGrDeF.jpg"
  };
 
  slackApp.postMessage(options.channelId, options.message, {username: options.userName, icon_url: options.bot_icon});
}

/* 現在時刻を取得して整形 */
function jihou(){
  var now = new Date();
  var month = now.getMonth()+1;
  var date = now.getDate();
  var hour = toDoubleDigits(now.getHours());
  var min = toDoubleDigits(now.getMinutes());

  var jihou = (month +"月" + date + "日" + hour + ":" + min + "をお知らせします");
  return jihou;
}

/* 時刻の0詰め: 01:02が1:2などど表示されるのを防ぐ */
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};