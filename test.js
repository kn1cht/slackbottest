/**************************************************
test.gs 新機能テスト用(実際にSlackに変化を加える操作は避けてください。Loggerへの出力推奨。)
**************************************************/

/*function postSlackMessage() {
  var content = "test"
  var channelId = slackApp.channelsList().channels[0].id;
  var options = {
    channelId: "#random",
    userName: "BOT",
    message: content ,
    bot_icon : ""
  };
  slackApp.postMessage(options.channelId, options.message, {username: options.userName, icon_url: options.bot_icon});
  }*/

function getChannelInfo() {
  for(var i=0;i<slackApp.channelsList().channels.length;++i){
    var channelId = slackApp.channelsList().channels[i].id;
    var channelName = slackApp.channelsList().channels[i].name;
    Logger.log(channelId + " : " + channelName);
  }
}

function getGroupInfo() {
  Logger.log(slackApp.groupsList(false).groups.length);
  for(var i=0;i<slackApp.groupsList().groups.length;++i){
    var groupId = slackApp.groupsList().groups[i].id;
    var groupName = slackApp.groupsList().groups[i].name;
    Logger.log(groupId + " : " + groupName);
  }
}
