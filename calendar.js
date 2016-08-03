/**************************************************
calendar.gs Google Calendarに指定された予定を自動で登録します。
その際、コマンドが投稿されたチャンネル名をタイトル先頭に表示します。

# 使い方
+ 「スクリプトのプロパティ」に検索対象のチャンネル(プライベートチャンネル)名を登録しておきます。
+ その際、キーは"Oldfile"を含んだ文字列としてください。
# コマンド
+ calendarbot [TITLE][-a(if allday event)][-d DATE][-s START TIME][-e END TIME][-l LOCATION][-s DESCRIPTION][-h][--help][-v][--version]
**************************************************/

function calendarBot(text, channel_name){ // ToDo: コマンド引数を解析する、各メソッドに必要な情報を渡す
  var res;
  if(text.match('-a'))
    if(!createCalendarAlldayEvent(channel_name)){
      res = 'created event.';
    }
  if(!createCalendarEvent(channel_name)){
    res = 'created event.';
  }
  return res;
}

function createCalenderEvent(channel_name){
  var id = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID");
  var cal = CalendarApp.getCalendarById(id);
  var options = {
    title: '[' + channel_name + ']' + 'TITLE',
    sdate: new Date('2020/01/01 00:00:00'),
    edate: new Date('2020/01/01 01:00:00'),
    description: 'DESCRIPTION',
    location: '場所'
  };
  
  cal.createAlldayEvent(options.title, options.sdate, options.edate, {description: options.description, location: options.location});
  return 0;
}

function createCalenderAlldayEvent(channel_name){
  var id = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID");
  var cal = CalendarApp.getCalendarById(id);
  var options = {
    title: '[' + channel_name + ']' + 'TITLE',
    date: new Date('2020/01/01'),
    description: '概要',
    location: '場所'
  };
  
  cal.createAllDayEvent(options.title, options.date, {description: options.description, location: options.location});
  return 0;
}