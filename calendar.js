/**************************************************
calendar.gs Google Calendarに指定された予定を自動で登録します。
その際、コマンドが投稿されたチャンネル名をタイトル先頭に表示します。

# 使い方
+ 「スクリプトのプロパティ」に検索対象のチャンネル(プライベートチャンネル)名を登録しておきます。
+ その際、キーは"Oldfile"を含んだ文字列としてください。
# コマンド
+ !cal [表題] [日付] [開始時刻] [長さ(minutes)] [場所] [説明]
# ToDo
+ 現状順番の変更には非対応
+ エラーメッセージを出すように
+ イベントの削除(IDを使えば可能?)
**************************************************/

function calendarTest(){
  Logger.log(calendarBot("test 会議 2020/1/1 09:00 90 Tokyo,Japan テスト投稿","general"));
}

function calendarBot(text, channel_name){ // ToDo: コマンド引数を解析する、各メソッドに必要な情報を渡す
  var args = text.split(" ");
  var is_allday = !(args[3] / 1 || args[4] / 1); // if allday event : true
  args[1] = '[#' + channel_name + ']' + args[1]; // title
  if(is_allday)
    return createCalendarAlldayEvent(args[1], args[2], args[5], args[6], channel_name);
  else
    return createCalendarEvent(args[1], args[2], args[3], args[4], args[5], args[6]);
}

function createCalendarEvent(title, date, time, duration, location, description){
  var id = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID");
  var cal = CalendarApp.getCalendarById(id);
  var start_date = new Date(date + ' ' +time);
  var end_date = new Date(start_date.getTime());
  end_date.setMinutes(end_date.getMinutes() + duration / 1);
Logger.log(start_date.toString());
  var options = {
    title: title,
    sdate: start_date,
    edate: end_date,
    location: location,
    description: description
  };
  cal.createEvent(options.title, options.sdate, options.edate, {description: options.description, location: options.location});

  var res = 'OK :+1: created *' + options.title + "*";
  if(description) res += ' (' + options.description + ')';
  res += ' from ' + options.sdate.toString() + ' to ' + options.edate.toString();
  if(location) res + ' at ' + options.location;
  return res;
}

function createCalendarAlldayEvent(title, date, location, description){
  var id = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID");
  var cal = CalendarApp.getCalendarById(id);
  var options = {
    title: title,
    date: new Date(date),
    location: location,
    description: description
  };
  cal.createAllDayEvent(options.title, options.date, {description: options.description, location: options.location});

  var res = 'OK :+1: created *' + options.title + "*";
  if(description) res += ' (' + options.description + ')';
  res += ' *all day* on ' + options.date.toString();
  if(location) res + ' at ' + options.location;
  return res;
}
