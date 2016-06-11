/**************************************************
This is test field about slack api and SlackApp.
Files:
  main.gs 共通で使う変数・関数
  test.gs 新機能テスト用(実際にSlackに変化を加える操作は避けてください。Loggerへの出力推奨。)

Ref:
  https://github.com/slackhq/slack-api-docs
  https://github.com/soundTricker/SlackApp
**************************************************/

// Configuration: Obtain Slack web API token at https://api.slack.com/web
var SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("TOKEN");
if (!SLACK_ACCESS_TOKEN) {
  throw 'You should set "slack_api_token" property from [File] > [Project properties] > [Script properties]';
}
var slackApp = SlackApp.create(SLACK_ACCESS_TOKEN); //SlackApp インスタンスの取得
