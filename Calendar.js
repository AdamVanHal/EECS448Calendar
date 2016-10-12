window.onload = function() {
  $(".Year").show();
  $(".Calendar").hide();
  $(".Day").hide();
  displayMonth();
};
    //global variables
var currentState = "month",
    monthSelect = document.getElementById('monthSelect'),
    currentDate = new Date(),
    currentYear = "2016",
    currentDay = "18",
    currentMonth = "9";
    displayMonth();
var tag = [document.getElementById('day1'), document.getElementById('day2'), document.getElementById('day3'), document.getElementById('day4'), document.getElementById('day5'), document.getElementById('day6'), document.getElementById('day7'), document.getElementById('day8'), document.getElementById('day9'), document.getElementById('day10'), document.getElementById('day11'), document.getElementById('day12'), document.getElementById('day13'), document.getElementById('day14'), document.getElementById('day15'), document.getElementById('day16'), document.getElementById('day17'), document.getElementById('day18'), document.getElementById('day19'), document.getElementById('day20'), document.getElementById('day21'), document.getElementById('day22'), document.getElementById('day23'), document.getElementById('day24'), document.getElementById('day25'), document.getElementById('day26'), document.getElementById('day27'), document.getElementById('day28'), document.getElementById('day29'), document.getElementById('day30'), document.getElementById('day31'), document.getElementById('day32'), document.getElementById('day33'), document.getElementById('day34'), document.getElementById('day35')];
var dateSentence = currentDate;
    $("#addEventButton").click(function() {
      $("#myModal").modal();
    });
    $("#removeEventButton").click(function() {
      $("#myRemove").modal();
    });
    $("#multidayEventButton").click(function() {
      $("#myMultiday").modal();
    });
	$("#recurringEventButton").click(function() {
      $("#myRecurring").modal();
    });
    $("#yButton").click(function () {
      currentState = "year";
      $(".Year").show();
      $(".Calendar").hide();
      $(".Day").hide();
    });
    $("#mButton").click(function () {
      currentState = "month";
      $(".Year").hide();
      $(".Calendar").show();
      $(".Day").hide();
    });
    $("#dButton").click(function () {
      changeDay();
      currentState = "day";
      $(".Year").hide();
      $(".Day").show();
      $(".Calendar").hide();
    });
//helper functions
function addDay(eventdate){
    var date = new Date();
    var split = eventdate.split('-');
    split[1] = parseInt(split[1]);
    split[2] = parseInt(split[2]);
    date.setFullYear(split[0],split[1],0);
    if(split[2] == date.getDate()){
        split[2] = 1;
        split[1] = split[1] + 1;
    }
    else{
        split[2] = split[2]+1;
    }
    split[0] = split[0].toString();
    split[1] = split[1].toString();
    split[2] = split[2].toString();
    eventdate = split.join('-');
    return(eventdate);
}

function addMultidayEvent(){
    var numDays = document.getElementById("numDays").value,
        eventdate = document.getElementById("event_date").value;
    for(var i = 0; i < numDays; i++){
        addMultiday(eventdate);
        eventdate = addDay(eventdate);
    }
}

function addMultiday(eventdate) {
    var  eventName = document.getElementById("eventName").value,
         multDay = 1,
         eventDetails = document.getElementById("eventDetails").value;
//insert to database
  $.ajax({
        url: 'calendar_provider.php',
        type: 'GET',
        data: {method: "addEvent", name : eventName, description : eventDetails, event_date : eventdate, isMultiday: multDay},
        success: function (response) {
        },
        error: function () {
        }
    });
}

//*************************************************************************************
//Work on the two functions below, cant use addToCalendar so the second function will need to add to the db.
//first do an if to check which radio button is selected
//*************************************************************************************

//function whichday is copied from the stackoverflow thread below
//http://stackoverflow.com/questions/17964170/get-the-weekday-name-from-yyyy-mm-dd-format-using-javascript/17964373
function whichDay(dateString) {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][new Date(dateString).getDay()];
}

function addRecurringEvent(){
	var eventdate = document.getElementById("event_date2").value;
	var Flag = 0;
    if(document.getElementById("byDay").checked == true){
		addRecurring(eventdate);
		eventdate = addDay(eventdate);
		var param1 = 17;
		var split = eventdate.split('-');
		while(split[1] <= param1){
		  if(document.getElementById("Sun").checked == true){
		    if(whichDay(eventdate) == "Monday"){Flag = 1;}
		  }
		  if(document.getElementById("Mon").checked == true){
		    if(whichDay(eventdate) == "Tuesday"){Flag = 1;}
		  }
		  if(document.getElementById("Tue").checked == true){
		    if(whichDay(eventdate) == "Wednesday"){Flag = 1;}
		  }
		  if(document.getElementById("Wed").checked == true){
		    if(whichDay(eventdate) == "Thursday"){Flag = 1;}
		  }
		  if(document.getElementById("Thur").checked == true){
		    if(whichDay(eventdate) == "Friday"){Flag = 1;}
		  }
		  if(document.getElementById("Fri").checked == true){
		    if(whichDay(eventdate) == "Saturday"){Flag = 1;}
		  }
		  if(document.getElementById("Sat").checked == true){
		    if(whichDay(eventdate) == "Sunday"){Flag = 1;}
		  }
		  if(Flag == 1){addRecurring(eventdate);Flag = 0;}
		  eventdate = addDay(eventdate);
		  split = eventdate.split('-');
		  if(split[0] == "2017"){param1 = 5;}
		  alert(eventdate);
		}
		alert("byDay");
	}
	else if(document.getElementById("byWeek").checked == true){
		var param1 = 17;
		var split = eventdate.split('-');
		while(split[1] <= param1){
			addRecurring(eventdate);
			for(var j = 0; j < 14; j ++){
				eventdate = addDay(eventdate);
			}
			split = eventdate.split('-');
			if(split[0] == 2017){param1 = 5;}
		}
		alert("byWeek");
	}
	else if(document.getElementById("byMonth").checked == true){
	  var split = eventdate.split('-');
	  split[1] = parseInt(split[1]);
	  if(split[0] == "2016"){
		while(split[1] < 12){
			//push event
			split[1] = split[1].toString();
			eventdate = split.join('-');
			addRecurring(eventdate);
			split[1] = parseInt(split[1]);
			split[1] = split[1] + 1;
		}
		split[1] = split[1].toString();
		eventdate = split.join('-');
		addRecurring(eventdate);
		split[0] = parseInt(split[0]);
		split[1] = parseInt(split[1]);
		split[0] = split[0] + 1;
		split[1] = 01;
	  }
	  while(split[1] < 6){
	    split[1] = split[1].toString();
		eventdate = split.join('-');
		addRecurring(eventdate);
		split[1] = parseInt(split[1]);
		split[1] = split[1] + 1;
	  }
		alert("byMonth");
	}
	else{
		alert("Choose a method by which to make the event recurring");
	}
}

function addRecurring(eventdate) {
	alert(eventdate);
   /* var  eventName = document.getElementById("eventName2").value,
         eventDetails = document.getElementById("eventDetails2").value;
    var startTime =  document.getElementById("start_time2").value;
    var endTime =  document.getElementById("end_time2").value;
    alert("hello");
//insert to database
  $.ajax({
        url: 'calendar_provider.php',
        type: 'GET',
        data: {method: "addEvent", name: eventName, description: eventDetails, event_date: eventdate, startTime: startTime, endTime: endTime, isRecurring = "1"},
        success: function (response) {
        },
        error: function () {
        }
    });*/
}
//*************************************************************************************

function addToCalendar(eventdate) {
    var  eventdate = document.getElementById("event_date1").value,
         eventName = document.getElementById("eventName1").value,
         eventDetails = document.getElementById("eventDetails1").value;
    var startTime =  document.getElementById("start_time").value;
    var endTime =  document.getElementById("end_time").value;
//insert to database
  $.ajax({
        url: 'calendar_provider.php',
        type: 'GET',
        data: {method: "addEvent", name: eventName, description: eventDetails, event_date: eventdate, startTime: startTime, endTime: endTime},
        success: function (response) {
        },
        error: function () {
        }
    });
}

function removeEvent() {
  var id = document.getElementById("eventID").value;
  debugger;
  $.ajax({
        url: 'calendar_provider.php',
        type: 'GET',
        data: {method: "deleteEvent", event_id : id},
        success: function (response) {
        },
        error: function () {
        }
    });
}
function getEvents(eventdate) {
  $.ajax({
        url: 'calendar_provider.php',
        type: 'GET',
        data: {method: "getEvents", event_date : eventdate},
        success: function (response) {
            var data = JSON.parse(response);
            var i = 0;
            while(i < data.length) {
              document.getElementById("events").innerHTML += "<br><u>" + data[i].name + "(" + data[i].event_id + ") </u><br>" + "start time: " + data[i].StartTime + " end time: " + data[i].EndTime + "<br>" + data[i].description;
              i++;
            }
        },
        error: function () {
        }
    });
}
function clickMonth(mon){
mon = mon.toString();
  document.getElementById("monthSelect").value = mon;
  currentState = "month";
  $(".Year").hide();
  $(".Calendar").show();
  $(".Day").hide();
  backEnd(mon);
}

function monthDown() {
  if(currentMonth == "1" || currentMonth == "01")
  {currentMonth = "12";}
  else if (currentMonth == "2"|| currentMonth == "02")
  {currentMonth = "1";}
  else if (currentMonth == "3" || currentMonth == "03")
  {currentMonth = "2";}
  else if (currentMonth == "4" || currentMonth == "04")
  {currentMonth = "3";}
  else if (currentMonth == "5" || currentMonth == "05")
  {currentMonth = "4";}
  else if (currentMonth == "6" || currentMonth == "06")
  {currentMonth = "5";}
  else if (currentMonth == "7" || currentMonth == "07")
  {currentMonth = "6";}
  else if (currentMonth == "8" || currentMonth == "08")
  {currentMonth = "7";}
  else if (currentMonth == "9" || currentMonth == "09")
  {currentMonth = "8";}
  else if (currentMonth == "10")
  {currentMonth = "9";}
  else if (currentMonth == "11")
  {currentMonth = "10";}
  else if (currentMonth == "12")
  {currentMonth = "11";}
    displayMonth();
    backEnd(currentMonth);
}

function monthUp(){
  if(currentMonth == "1" || currentMonth == "01")
  {currentMonth = "2";}
  else if (currentMonth == "2"|| currentMonth == "02")
  {currentMonth = "3";}
  else if (currentMonth == "3" || currentMonth == "03")
  {currentMonth = "4";}
  else if (currentMonth == "4" || currentMonth == "04")
  {currentMonth = "5";}
  else if (currentMonth == "5" || currentMonth == "05")
  {currentMonth = "6";}
  else if (currentMonth == "6" || currentMonth == "06")
  {currentMonth = "7";}
  else if (currentMonth == "7" || currentMonth == "07")
  {currentMonth = "8";}
  else if (currentMonth == "8" || currentMonth == "08")
  {currentMonth = "9";}
  else if (currentMonth == "9" || currentMonth == "09")
  {currentMonth = "10";}
  else if (currentMonth == "10")
  {currentMonth = "11";}
  else if (currentMonth == "11")
  {currentMonth = "12";}
  else if (currentMonth == "12")
  {currentMonth = "1";}
    displayMonth();
        backEnd(currentMonth);
}

function monthToDay(element){
  currentDay = document.getElementById(element).innerHTML;
  $(".Year").hide();
  $(".Day").show();
  $(".Calendar").hide();
  changeDay();
}
function changeDay()
{
//  getYear();
  switch (currentMonth){
    case "0":
      currentMonth = "0" + currentMonth;
    break;
    case "1":
      currentMonth = "0" + currentMonth;
    break;
    case "2":
      currentMonth = "0" + currentMonth;
    break;
    case "3":
      currentMonth = "0" + currentMonth;
    break;
    case "4":
      currentMonth = "0" + currentMonth;
    break;
    case "5":
      currentMonth = "0" + currentMonth;
    break;
    case "6":
      currentMonth = "0" + currentMonth;
    break;
    case "7":
      currentMonth = "0" + currentMonth;
    break;
    case "8":
      currentMonth = "0" + currentMonth;
    break;
    case "9":
      currentMonth = "0" + currentMonth;
    break;
  }
  switch (currentDay){
    case "0":
      currentDay = "0" + currentDay;
    break;
    case "1":
      currentDay = "0" + currentDay;
    break;
    case "2":
      currentDay = "0" + currentDay;
    break;
    case "3":
      currentDay = "0" + currentDay;
    break;
    case "4":
      currentDay = "0" + currentDay;
    break;
    case "5":
      currentDay = "0" + currentDay;
    break;
    case "6":
      currentDay = "0" + currentDay;
    break;
    case "7":
      currentDay = "0" + currentDay;
    break;
    case "8":
      currentDay = "0" + currentDay;
    break;
    case "9":
      currentDay = "0" + currentDay;
    break;
  }
  dateSentence = "Date: " + currentMonth + "-" + currentDay + "-" + currentYear;
  var eventdate = currentYear + "-" + currentMonth + "-" + currentDay;
  var data = getEvents(eventdate);
  document.getElementById("DisplayDate").innerHTML = dateSentence;
}
function displayMonth()
{

  if(currentMonth == "1" || currentMonth == "01")
  {document.getElementById("DisplayMonth").innerHTML = "January";
  document.getElementById("monthSelect").value = 1;}
  else if (currentMonth == "2"|| currentMonth == "02")
  {document.getElementById("DisplayMonth").innerHTML = "Febuary";
  document.getElementById("monthSelect").value = 2;}
  else if (currentMonth == "3" || currentMonth == "03")
  {document.getElementById("DisplayMonth").innerHTML = "March";
  document.getElementById("monthSelect").value = 3;}
  else if (currentMonth == "4" || currentMonth == "04")
  {document.getElementById("DisplayMonth").innerHTML = "April";
  document.getElementById("monthSelect").value = 4;}
  else if (currentMonth == "5" || currentMonth == "05")
  {document.getElementById("DisplayMonth").innerHTML = "May";
  document.getElementById("monthSelect").value = 5;}
  else if (currentMonth == "6" || currentMonth == "06")
  {document.getElementById("DisplayMonth").innerHTML = "June";
  document.getElementById("monthSelect").value = 6;}
  else if (currentMonth == "7" || currentMonth == "07")
  {document.getElementById("DisplayMonth").innerHTML = "July";
  document.getElementById("monthSelect").value = 7;}
  else if (currentMonth == "8" || currentMonth == "08")
  {document.getElementById("DisplayMonth").innerHTML = "August";
  document.getElementById("monthSelect").value = 8;}
  else if (currentMonth == "9" || currentMonth == "09")
  {document.getElementById("DisplayMonth").innerHTML = "September";
  document.getElementById("monthSelect").value = 9;}
  else if (currentMonth == "10")
  {document.getElementById("DisplayMonth").innerHTML = "October";
  document.getElementById("monthSelect").value = 10;}
  else if (currentMonth == "11")
  {document.getElementById("DisplayMonth").innerHTML = "November";
  document.getElementById("monthSelect").value = 11;}
  else if (currentMonth == "12")
  {document.getElementById("DisplayMonth").innerHTML = "December";
  document.getElementById("monthSelect").value = 12;}
}

function getYear()
{
  if(month.parseInt() > 7)
  currentYear = "2016";

  else
  currentYear = "2017";
}



function getDate() {
    var x = document.getElementById("dateSubmit");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }

    var temp = text.substring(0,4);
    if (temp == "2016" || temp == "2017")
    {
      temp2 = text.substring(5,7);
      if(temp == "2016" && (temp2 == "08" || temp2 == "09" || temp2 == "10" || temp2 == "11" || temp2 == "12"))
      {
        currentYear = text.substring(0,4);
        currentMonth = text.substring(5,7);
        currentDay = text.substring(8,10);
          displayMonth();
          changeDay();
          currentState = "day";
          $(".Year").hide();
          $(".Day").show();
          $(".Calendar").hide();
      }
      else if(temp == "2017" && (temp2 == "01" || temp2 == "02" || temp2 == "03" || temp2 == "04" || temp2 == "05" || temp2 == "06" || temp2 == "07"))
      {
        currentYear = text.substring(0,4);
        currentMonth = text.substring(5,7);
        currentDay = text.substring(8,10);
          displayMonth();
          changeDay();
          currentState = "day";
          $(".Year").hide();
          $(".Day").show();
          $(".Calendar").hide();
      }
      else{
              alert("Please enter a date in this school year!");
      }
    }
    else {
      alert("Please enter a date in this school year!");
    }
}
//var tag = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day30, day31, day32, day33, day34, day35];
monthSelect.onchange = function() {
  var month = monthSelect.value;
  backEnd(month);
  };
function backEnd(num)
{
  currentMonth = num;
  displayMonth();
  switch (num){
    case "5":
      for(var i = 0; i < 35; i++)
      {
        var temp = i;
        if(i < 1 || i > 31)
        {
          switch (i){
            case 0:
            temp = 31;
            break;
            case 32:
            temp = 1;
            break;
            case 33:
            temp = 2;
            break;
            case 34:
            temp = 3;
            break;
          }
        }
        tag[i].innerHTML = temp;
      }
      break;
    case "2":
      for(var i = -2; i < 33; i++)
      {
        var temp = i;
        if(i < 1 || i > 28)
        {
          switch (i){
            case -2:
            temp = 29;
            break;
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
            case 29:
            temp = 1;
            break;
            case 30:
            temp = 2;
            break;
            case 31:
            temp = 3;
            break;
            case 32:
            temp = 4;
            break;
          }
        }
        tag[i+2].innerHTML = temp;
      }
      break;
    case "3":
      for(var i = -2; i < 33; i++)
      {
        var temp = i;
        if(i < 1 || i > 30)
        {
          switch (i){
            case -2:
            temp = 26;
            break;
            case -1:
            temp = 27;
            break;
            case 0:
            temp = 28;
            break;
            case 32:
            temp = 1;
            break;
          }
        }
        tag[i+2].innerHTML = temp;
      }
      break;
    case "4":
      for(var i = -5; i < 30; i++)
      {
        var temp = i;
        if(i < 1 )
        {
          switch (i){
            case -5:
            temp = 26;
            break;
            case -4:
            temp = 27;
            break;
            case -3:
            temp = 28;
            break;
            case -2:
            temp = 29;
            break;
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
          }
        }
        tag[i+5].innerHTML = temp;
      }
      break;
    case "1":
      for(var i = 1; i < 36; i++)
      {
        var temp = i;
        if(i > 31)
        {
          switch (i){
            case 32:
            temp = 1;
            break;
            case 33:
            temp = 2;
            break;
            case 34:
            temp = 3;
            break;
            case 35:
            temp = 4;
            break;
          }
        }
        tag[i-1].innerHTML = temp;
      }
      break;
    case "6":
      for(var i = -3; i < 32; i++)
      {
        var temp = i;
        if(i < 1 || i > 30)
        {
          switch (i){
            case -3:
            temp = 28;
            break;
            case -2:
            temp = 29;
            break;
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
            case 31:
            temp = 1;
            break;
          }
        }
        tag[i+3].innerHTML = temp;
      }
      break;
    case "7":
      for(var i = -5; i < 30; i++)
      {
        var temp = i;
        if(i < 1 )
        {
          switch (i){
            case -5:
            temp = 25;
            break;
            case -4:
            temp = 26;
            break;
            case -3:
            temp = 27;
            break;
            case -2:
            temp = 28;
            break;
            case -1:
            temp = 29;
            break;
            case 0:
            temp = 30;
            break;
          }
        }
        tag[i+5].innerHTML = temp;
      }
      break;
    case "8":
      for(var i = 0; i < 35; i++)
      {
        var temp = i;
        if(i < 1 || i > 31)
        {
          switch (i){
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
            case 32:
            temp = 1;
            break;
            case 33:
            temp = 2;
            break;
          }
        }
        tag[i+1].innerHTML = temp;
      }
      break;
    case "9":
      for(var i = -3; i < 32; i++)
      {
        var temp = i;
        if(i < 1 || i > 30)
        {
          switch (i){
            case -3:
            temp = 28;
            break;
            case -2:
            temp = 29;
            break;
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
            case 31:
            temp = 1;
            break;
          }
        }
        tag[i+3].innerHTML = temp;
      }
      break;
    case "10":
      for(var i = -5; i < 30; i++)
      {
        var temp = i;
        if(i < 1 )
        {
          switch (i){
            case -5:
            temp = 25;
            break;
            case -4:
            temp = 26;
            break;
            case -3:
            temp = 27;
            break;
            case -2:
            temp = 28;
            break;
            case -1:
            temp = 29;
            break;
            case 0:
            temp = 30;
            break;
          }
        }
        tag[i+5].innerHTML = temp;
      }
      break;
    case "11":
      for(var i = -1; i < 34; i++)
      {
        var temp = i;
        if(i < 1 || i > 30)
        {
          switch (i){
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
            case 31:
            temp = 1;
            break;
            case 32:
            temp = 2;
            break;
            case 33:
            temp = 3;
            break;
          }
        }
        tag[i+1].innerHTML = temp;
      }
      break;
    case "12":
      for(var i = -3; i < 32; i++)
      {
        var temp = i;
        if(i < 1)
        {
          switch (i){
            case -3:
            temp = 28;
            break;
            case -2:
            temp = 29;
            break;
            case -1:
            temp = 30;
            break;
            case 0:
            temp = 31;
            break;
          }
        }
        tag[i+3].innerHTML = temp;
      }
      break;
  }
}

//function to gray out the day check boxes when the radio button is not selected

function checkDisable()
{
  if(document.getElementById("byDay").checked == true)
  {
    var eventdate = document.getElementById("event_date2").value;
	var dOw = whichDay(eventdate);
	if(dOw == "Sunday"){document.getElementById("Sun").checked = true;}
	else{document.getElementById("Sun").disabled = false;}
	if(dOw == "Monday"){document.getElementById("Mon").checked = true;}
	else{document.getElementById("Mon").disabled = false;}
	if(dOw == "Tuesday"){document.getElementById("Tue").checked = true;}
	else{document.getElementById("Tue").disabled = false;}
	if(dOw == "Wednesday"){document.getElementById("Wed").checked = true;}
	else{document.getElementById("Wed").disabled = false;}
	if(dOw == "Thursday"){document.getElementById("Thur").checked = true;}
	else{document.getElementById("Thur").disabled = false;}
	if(dOw == "Friday"){document.getElementById("Fri").checked = true;}
	else{document.getElementById("Fri").disabled = false;}
	if(dOw == "Saturday"){document.getElementById("Sat").checked = true;}
	else{document.getElementById("Sat").disabled = false;}
  }
  else
  {
    document.getElementById("Sun").disabled = true;
	document.getElementById("Mon").disabled = true;
	document.getElementById("Tue").disabled = true;
	document.getElementById("Wed").disabled = true;
	document.getElementById("Thur").disabled = true;
	document.getElementById("Fri").disabled = true;
	document.getElementById("Sat").disabled = true;
	
	document.getElementById("Sun").checked = false;
	document.getElementById("Mon").checked = false;
	document.getElementById("Tue").checked = false;
	document.getElementById("Wed").checked = false;
	document.getElementById("Thur").checked = false;
	document.getElementById("Fri").checked = false;
	document.getElementById("Sat").checked = false;
  }
}

function radioEnable(){
  var eventdate = document.getElementById("event_date2").value;
  document.getElementById("byDay").disabled = false;
  document.getElementById("byWeek").disabled = false;
  document.getElementById("byMonth").disabled = false;
}

