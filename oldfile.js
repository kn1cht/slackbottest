/**************************************************
oldfile.gs 指定したチャンネルの古いファイルを検出・削除します。
ファイルが消えても問題ない雑談チャンネル向け。

**************************************************/

/* 雑談チャンネル・グループの名称を検索して古いファイルの検索に使用 */
function FileExecuter(){
  var keyList = PropertiesService.getScriptProperties().getKeys();
  for(i=0;i<keyList.length;++i){
    if(keyList[i].match(/RANDOM/)){
      var Name = PropertiesService.getScriptProperties().getProperty(keyList[i]);
      Logger.log("Processing " + Name);
      getOldFile(Name);
    }
  }
}

/* 特定日数より以前のファイルを削除 */
function deleteOldFile(Name) {
  var channelId = channelNametoId(Name);
  if(!channelId) channelId = groupNametoId(Name); //チャンネルで該当なしであればグループを探す
  if(!channelId) return -1; //グループでもなければ終了

  var days = 40;  // 遡る日数(ユーザが指定)
  var date = new Date();
  var now = Math.floor(date.getTime()/ 1000); // unixtime[second]
  var until = now - 8.64e4 * days + '' // 8.64e4sec = 1days なぜか文字列じゃないと動かないので型変換している

  Logger.log("----------Fetching file list...----------");
  var file_num = slackApp.filesList({channel: channelId, ts_to: until}).files.length;
  for(var i=0;i<file_num;++i){
    var fileId = slackApp.filesList({channel: channelId, ts_to: until}).files[i].id;
    deleteFile("fileId");
  }
}

/* チャンネル名を検索してIDを取得 */
function channelNametoId(Name) {
  for(var i=0;i<slackApp.channelsList(0).channels.length;++i){
    var channelId = slackApp.channelsList(0).channels[i].id;
    var channelName = slackApp.channelsList(0).channels[i].name;
    if (channelName === Name){
      Logger.log("Channel found named " + channelName + " : " + channelId);
      return channelId;
    }
  }
  Logger.log("Channel not found named " + Name);
  return 0;
}

/* グループ名を検索してIDを取得 */
function groupNametoId(Name) {
  for(var i=0;i<slackApp.groupsList().groups.length;++i){
    var groupId = slackApp.groupsList().groups[i].id;
    var groupName = slackApp.groupsList().groups[i].name;
    if (groupName === Name){
      Logger.log("Group found named " + groupName + " : " + groupId);
      return groupId;
    }
  }
  Logger.log("Group not found named " + Name);
  return 0;
}