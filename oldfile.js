/**************************************************
oldfile.gs 指定したチャンネルの古いファイルを検出します。
+ 追加予定機能
  + 古いファイルの削除(ファイルが消えても問題ない雑談チャンネル向け)
**************************************************/

/* 雑談チャンネルを指定 */
function FileExecuter(){
  randomList = ["random_2016"]
  for(i=0;i<randomList.length;++i){
    getOldFile(randomList[i]);
  }
}

/* 特定日数より以前のファイルを検出 */
function getOldFile(Name) {
  var channelId = channelNametoId(Name);
  if(!channelId) return -1; //チャンネルがなかったら終了
  
  var days = 40;  // 遡る日数(ユーザが指定)
  var date = new Date();
  var now = Math.floor(date.getTime()/ 1000); // unixtime[second]
  var until = now - 8.64e4 * days + '' // 8.64e4sec = 1days なぜか文字列じゃないと動かないので型変換している
  
  var file_n = slackApp.filesList({channel: channelId, ts_to: until}).files.length;
  for(var i=0;i<file_n;++i){
    var fileId = slackApp.filesList({channel: channelId, ts_to: until}).files[i].id;
    var fileName = slackApp.filesList({channel: channelId, ts_to: until}).files[i].name;
    Logger.log(fileId + " : " + fileName);
  }
}

/* チャンネル名を検索してIDを取得 */
function channelNametoId(Name) {
  for(var i=0;i<slackApp.channelsList(0).channels.length;++i){
    var channelId = slackApp.channelsList(0).channels[i].id;
    var channelName = slackApp.channelsList(0).channels[i].name;
    if (channelName === Name){
      Logger.log("found " + channelName + " : " + channelId);
      return channelId;
    }
  }
  return -1;
}
