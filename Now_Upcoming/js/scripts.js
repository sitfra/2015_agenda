// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1kDNE6--FAQ5igOZBw4KrK6XsIshdarSlyhroI7_-jic/edit#gid=2';

// akutelles Datum holen
var today = new Date();

// Querry zusammenbauen
var query = 'select %StartTime%, %EndTime%, %MediaCredit%, %Headline%, %Topics% where ',
  current = ' order by M desc limit 1',
  next = ' limit 1',

  currentTime = '%StartTime% < "' + today.toLocaleTimeString() + '" AND ',
  nextTime = '%StartTime% > "' + today.toLocaleTimeString() + '" AND ',

  room1 = '( %Room% ="Room 1" OR %Room% ="all" OR %Room% ="bar")',
  room2 = '( %Room% ="Room 2" OR %Room% ="all" OR %Room% ="bar")',

  sqlRoom1Current = query + currentTime + room1 + current,
  sqlRoom2Current = query + currentTime + room2 + current,

  sqlRoom1Next = query + nextTime + room1 + next,
  sqlRoom2Next = query + nextTime + room2 + next,

  columnLabels = ['Start', 'End', 'Speakers', 'Title', 'Tags'];

$('#room1_current').sheetrock({
  url: mySpreadsheet,
  sql: sqlRoom1Current,
  labels: columnLabels,
  resetStatus: true,
  debug: true // DEBUG DEBUG ;)
});

$('#room2_current').sheetrock({
  url: mySpreadsheet,
  sql: sqlRoom2Current,
  labels: columnLabels,
  resetStatus: true
});

$('#room1_next').sheetrock({
  url: mySpreadsheet,
  sql: sqlRoom1Next,
  labels: columnLabels,
  resetStatus: true
});

$('#room2_next').sheetrock({
  url: mySpreadsheet,
  sql: sqlRoom2Next,
  labels: columnLabels,
  resetStatus: true
});

function autoRefresh() {
  window.location = window.location.href;
}
setInterval('autoRefresh()', 1200000);