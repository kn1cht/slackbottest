/**************************************************
oldfile_for_groups.gs 指定したグループの古いファイルを検出します。
+ 追加予定機能
  + 古いファイルの削除(ファイルが消えても問題ない雑談グループ向け)
**************************************************/

/* 雑談グループを指定 */
function FileExecuter_gr(){
  var keyList = PropertiesService.getScriptProperties().getKeys();
  for(i=0;i<keyList.length;++i){
    if(keyList[i] === "RANDOM_GR"){
      var name = PropertiesService.getScriptProperties().getProperty(keyList[i])
      Logger.log("Processing " + name);
      getOldFile_gr(name);
    }
  }
}

/* 特定日数より以前のファイルを検出 */
function getOldFile_gr(Name) {
  var groupId = groupNametoId(Name);
  if(!groupId) return -1; //グループがなかったら終了
  
  var days = 40;  // 遡る日数(ユーザが指定)
  var date = new Date();
  var now = Math.floor(date.getTime()/ 1000); // unixtime[second]
  var until = now - 8.64e4 * days + '' // 8.64e4sec = 1days なぜか文字列じゃないと動かないので型変換している
  
  var file_n = slackApp.filesList({channel: groupId, ts_to: until}).files.length;
  for(var i=0;i<file_n;++i){
    var fileId = slackApp.filesList({channel: groupId, ts_to: until}).files[i].id;
    var fileName = slackApp.filesList({channel: groupId, ts_to: until}).files[i].name;
    Logger.log(fileId + " : " + fileName);
  }
}

/* グループ名を検索してIDを取得 */
function groupNametoId(Name) {
  for(var i=0;i<slackApp.groupsList().groups.length;++i){
    var groupId = slackApp.groupsList().groups[i].id;
    var groupName = slackApp.groupsList().groups[i].name;
    if (groupName === Name){
      Logger.log("found " + groupName + " : " + groupId);
      return groupId;
    }
  }
  return -1;
}
