/**************************************************
oldfile.gs 指定したチャンネルの古いファイルを検出・削除します。
ファイルが消えても問題ない雑談チャンネル向け。

# 使い方
+ 「スクリプトのプロパティ」に検索対象のチャンネル(プライベートチャンネル)名を登録しておきます。
+ その際、キーは"Oldfile"を含んだ文字列としてください。
+ oldFileExecuter()のdays変数に指定したい日数を入れておきます。
+ oldFileExecuter()を実行するとファイル削除が実行されます。ログを確認しておきましょう。
**************************************************/

/* 雑談チャンネル・グループの名称を検索して古いファイルを削除 */
function oldFileExecuter(){
  var days = 40;  // 遡る日数(ユーザが指定)
  var keyList = PropertiesService.getScriptProperties().getKeys();
  for(i=0;i<keyList.length;++i){
    if(keyList[i].match(/Oldfile/)){
      var name = PropertiesService.getScriptProperties().getProperty(keyList[i]);
      Logger.log("Processing " + name);
      deleteOldFile(days, name);
    }
  }
}

/* 指定チャンネル内・特定日数より以前のファイルを削除 */
function deleteOldFile(days, name) {
  var channelId = channelNametoId(name);
  if(!channelId) channelId = groupNametoId(name); //チャンネルで該当なしであればグループを探す
  if(!channelId) return -1; //グループでもなければ終了

  var date = new Date();
  var now = Math.floor(date.getTime()/ 1000); // unixtime[second]
  var until = now - 8.64e4 * days + '' // 8.64e4sec = 1days なぜか文字列じゃないと動かないので型変換している

  Logger.log("----------Fetching file list...----------");
  var file_num = slackApp.filesList({channel: channelId, ts_to: until}).files.length;
  for(var i=0;i<file_num;++i){
    var fileId = slackApp.filesList({channel: channelId, ts_to: until}).files[i].id;
    filesDelete(fileId);
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