/**************************************************
This is test field about slack api and SlackApp.
Files:
  main.gs 共通で使う変数・関数
  test.gs 新機能テスト用(実際にSlackに変化を加える操作は避けてください。Loggerへの出力推奨。)

Ref:
  https://github.com/slackhq/slack-api-docs
  https://github.com/soundTricker/SlackApp
**************************************************/

/* 初期設定 */
// Configuration: Obtain Slack web API token at https://api.slack.com/web
var SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("TOKEN");
if (!SLACK_ACCESS_TOKEN) {
  throw 'You should set "slack_api_token" property from [File] > [Project properties] > [Script properties]';
}
var slackApp = SlackApp.create(SLACK_ACCESS_TOKEN); //SlackApp インスタンスの取得
/* ------- */

/* 指定チャンネルにメッセージを投稿 */
function postSlackMessage(content, channel) {
  var options = {
    channelId: channel,
    userName: " LYNCSBot",
    message: content,
    bot_icon : "https://pbs.twimg.com/profile_images/716618387418259456/wXNGrDeF.jpg"
  };
  slackApp.postMessage(options.channelId, options.message, {username: options.userName, icon_url: options.bot_icon, link_names: 1});
}

/* ファイルを削除(SlackAppに該当メソッドが未実装のため独自に追加) */
function filesDelete(id){
  var url = "https://slack.com/api/files.delete?";
  var token = "token=" + SLACK_ACCESS_TOKEN;
  var file = "file=" + id + '';
  url += token + '&' + file;
  var resp = UrlFetchApp.fetch(url);
  var data = JSON.parse(resp.getContentText());
  if (data.error) Logger.log("Can't delete file " + id + " Error: " + data.error);
  else Logger.log("Deleted file " + id);
}
