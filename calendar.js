var curMonth = 0;
var curDay = 0;
console.log("initialize" + curMonth);
var monthTitle = 0; // 0 = Number titles, 1 = Month titles "Refer to calendar.js"
var leapYear = leapYear();
var i = 0;
function nxtMonth(){
    console.log("nxtMonth Init" + curMonth);
    if (curMonth==12) {
        curMonth = 0;
    } else {
            curMonth = curMonth+1;
        }
        updateMonth(curMonth);
        console.log("nxtMonth end" + curMonth);
    }
function lstMonth(){
    console.log("lstMonth Init" + curMonth);
    if (curMonth==0) {
        curMonth = 12;
    } else {
        curMonth = curMonth-1;
    }
    updateMonth(curMonth);
    console.log("lstMonth end" + curMonth);
}
function swapTitles(){
    console.log("swap Init" + curMonth);
    switch(monthTitle){
        case 0:
            monthTitle = 1;
        break;
    case 1:
        monthTitle = 0;
    }
    updateMonth(curMonth);
    console.log("swap end" + curMonth);
}
function findToday(){
    console.log("findToday Init" + curMonth)
    var d = new Date();
    curDay = d.getDate();
    curMonth = d.getMonth()+1;
    updateMonth(curMonth);
    document.getElementById(curDay).style.backgroundColor = 'white';
    console.log(curDay);
    console.log(curMonth);
};
//            between 0 - 12    0 - 28
function checkDate(checkMonth, checkDay){
    var d = new Date();
    curMonth = d.getMonth();
    curDay = d.getDate();
    if(curMonth == checkMonth && curDay == checkDay){
        return 1;
    }else{
        return 0;
    }

};
function leapYear(){
    var d = new Date();
    var result;
    d = d.getFullYear();
    
    if ((d%4 == 0) && (d%100 != 0) || (d%400 == 0)){
        result = true;
        console.log("leap year");
    } else{
        result = false;
        console.log("Not leap year");
    }
    return result;
};
function updateMonth(curMonthNumber) {
    var month;
    document.getElementById('yearDay').style.opacity = 0;
    if (monthTitle == 0){
        switch(curMonthNumber){
            case 0:
                month = "Zero";
                break;
            case 1:
                month = "One";
                break;
            case 2:
                month = "Two";
                break;
            case 3:
                month = "Three";
                break;
            case 4:
                month = "Four";
                break;
            case 5:
                month = "Five";
                if(leapYear){
                    document.getElementById('yearDay').style.opacity = 1;
                    document.getElementById('yearDayName').innerHTML = "Leap Day";
                }                
                break;
            case 6:
                month = "Six";
                break;
            case 7:
                month = "Seven";
                break;
            case 8:
                month = "Eight";
                break;
            case 9:
                month = "Nine";
                break;
            case 10:
                month = "Ten";
                break;
            case 11:
                month = "Eleven";
                break;
            case 12:
                month = "Twelve";
                document.getElementById('yearDay').style.opacity = 1;
                document.getElementById("yearDayName").innerHTML = "Year Day";
                break;
        }
        document.getElementById("monthNum").innerHTML = month + " Month";
    } else {
        switch(curMonthNumber){
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                if(leapYear){
                    document.getElementById('yearDay').style.opacity = 1;
                    document.getElementById('yearDayName').innerHTML = "Leap Day";
                }    
                break;
            case 6:
                month = "Sol";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                document.getElementById('yearDay').style.opacity = 1;
                document.getElementById('yearDayName').innerHTML = "Year Day";
                break;
      }
      document.getElementById("monthNum").innerHTML = month;
    }
    
};
function dateConvert(convMonth, convDate){
    var dayOfYear = 0;
    monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for(i = 0; i <= convMonth; i++){
        dayOfYear += monthDays[i];
    }
    dayOfYear += convDate;
    return dayOfYear;
}
function dayOfToMonth(dayOfYear){
    prize = dayOfYear%28;
    if(prize>12){
        prize = 12;
    }
    result = prize-1;
}