function updateMonth(curMonthNumber) {
    var month;
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
                break;
      }
      document.getElementById("monthNum").innerHTML = month;
    }
    
};