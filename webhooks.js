/**************************************************
webhook.gs Outgoing WebHooksに対応します
**************************************************/

function doPost(e) {
//  var comm = e.command + '';
//  if (comm == "test"){*/
    if(!e.parameter.text) throw new error("no text");
    var message = calendarBot(e.parameter.text, e.parameter.channel_name);
    postSlackMessage(message, e.parameter.channel_id);
//  }
  /*
  else if (comm == "/akari"){
    if(!e.parameter.text)throw new error("no text");
    var mention = "@" + e.parameter.user_name;
    var message = mention + " わぁい" + e.parameter.text + " あかり" + e.parameter.text + "大好き";
    postSlackMessage(message , e.parameter.channel_id);
  }*/
  return 0;
}