var d = new Date();
var gregMonth = d.getMonth(); // Current month of the year (Gregorian)
var gregDay = d.getDate(); // Current day of the year (Gregorian)
var curMonth = 0; // The month that is currently selected
var curDay = 0; // The day that is currently selected (unused right now)
var fixMonth = 0; // Current month of the year (Fixed I.)
var fixDay = 0; // Current day of the year (Fixed I.)
var monthTitle = 0; // 0 = Number titles, 1 = Month titles "Refer to updateMonth function"
var leapYear = leapYear(); //Checks for a leap year.
var fuckMonths = [31,28,31,30,31,30,31,31,30,31,30,31] // This is why I hate the Gregorian calendar.
var dayOfYear = 0; // Day of the year as a number out of 364 (0 - 364)
var x = 0; // Temporary variable

// Possible Names for the months: (Maybe switch to csv?)
var FixedTitle = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", 1];
var GregTitle = ["January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December", 0];


//Get the day of the year as a variable
function findDayOfYear(){
    dayOfYear = 0;

    for (var i = 0; i < gregMonth; ++i){ // Makes dayOfYear equal to the current day of the year (- the days in the current month)
        dayOfYear += fuckMonths[i];
    }
    dayOfYear += gregDay;
    return dayOfYear;
};
// Cycle forward through the months
function nxtMonth(){
    if (curMonth==12) {
        curMonth = 0;
    } else {
        curMonth = curMonth+1;
    }
    updateMonth(curMonth);
};

// Cycle backwards through the months
function lstMonth(){
    if (curMonth==0) {
        curMonth = 12;
    } else {
        curMonth = curMonth-1;
    }
    updateMonth(curMonth);
};

// Change what title is being displayed
function swapTitles(){
    switch(monthTitle){
        case 0:
            monthTitle = 1;
            break;
        case 1:
            monthTitle = 0;
    }
    updateMonth(curMonth);
};

// Convert the Gregorian day to Fixed I. day
function findToday(){
    dayOfYear -= gregDay; // Subtract days of the month
    x = dayOfYear%28; // number of days off from Gregorian Calendar
    fixMonth = ((dayOfYear-x)/28)
    if(fixMonth >= 6){fixMonth+=1;}// Check if the month 'sol' has passed
    dayOfYear += gregDay; // Re-add days of the month
    fixDay = dayOfYear%28; // Get days into the month
    updateMonth(fixMonth); // Update current month
};

// Check for leap year
function leapYear(){
    x = 0;
    fullYear = d.getFullYear();
    
    // If year is divisible by 4, and not divisible by 100. Or if it is divisible by 400 then Leap Year.
    if ((fullYear%4 == 0) && (fullYear%100 != 0) || (fullYear%400 == 0)){
        x = true;
        console.log("leap year");
    } else{
        x = false;
        console.log("Not leap year");
    }
    return x;
};

//Change the display of the current month (Please rewrite this soon)
function updateMonth(monthNumber) {
    x = 0;
    document.getElementById('yearDay').style.opacity = 0;

    // Check style, and asign "x" the text
    switch(monthTitle){
        case 0:
            x = FixedTitle[monthNumber];
            if(FixedTitle[13]){ x = "Month " + x;}
            break;
        case 1:
            x = GregTitle[monthNumber]; 
            if(GregTitle[13]){ x = "Month " + x;}
            break;
    }
    // Check Leap year and Year Day
    if(monthNumber == 5 && leapYear){
        document.getElementById('yearDay').style.opacity = 1;
        document.getElementById('yearDayName').innerHTML = "Leap Day";
    }  else if(monthNumber == 12){
        document.getElementById('yearDay').style.opacity = 1;
        document.getElementById("yearDayName").innerHTML = "Year Day";
    }
    document.getElementById("monthNum").innerHTML = x;
    curMonth = monthNumber // Update curMonth to make it accurate.
    //Make sure current day is blue.
    if(curMonth==fixMonth){    
        document.getElementById(fixDay).style.backgroundColor = '#00bfff';
    }else{
        document.getElementById(fixDay).style.backgroundColor = '#333';
    }
};