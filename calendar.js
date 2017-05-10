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