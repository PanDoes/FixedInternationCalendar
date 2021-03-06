Vue.component('month-title', {
    template: `<div class="month-title">Month {{ this.$root.monthTitle }}</div>`
})

Vue.component('year-title', {
    template: `<div class="year-title unimportant" :id=this.$root.yearDate> {{ this.$root.yearDate }}</div>`
})

Vue.component('login', {
    template: `
        <button v-if="$root.currentUser == null" v-on:click="$root.googleLogin()">LOGIN</button>
        <div v-else id="login-container">
            <div class="unimportant" id="login-name">{{ $root.currentUser.displayName }}</div>
            <img :src=$root.currentUser.photoURL id="login-image">
        </div>
    `
})

Vue.component('weekday', {
    template: `
        <div class="week-wrapper">
            <div v-for="name in ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']" :id=name class="week card boxshadow">
                {{ name }}
            </div>
        </div>`
})

Vue.component('month-array', {
    template: `
        <div class="month-wrapper">
            <div class="week-wrapper" v-for="week in 4">    
                <div v-for="day in 7" :id=day+(week-1)*7 class="day-wrapper boxshadow card">
                    <div class="topbar-wrapper">
                        <div>{{ day + (week-1)*7 }}</div>
                        <div class="greg-date unimportant">{{ $root.convertToGreg($root.ficMonthId, day + (week-1)*7) }}</div>
                    </div>
                </div>
            </div>
            <div v-if="($root.isLeapYear && $root.ficMonthId == 5) || $root.displayYearDay" id="special-day" class="day-wrapper boxshadow card">
                <div v-if="($root.isLeapYear && $root.ficMonthId == 5)" class="topbar-wrapper">    
                    <div>Leap Day</div>
                    <div class="greg-date unimportant">Jun 17</div>
                </div>
                <div v-else-if="$root.displayYearDay" class="topbar-wrapper">    
                    <div>Year Day</div>
                    <div class="greg-date unimportant">Dec 31</div>
                </div>
            </div>
        </div>`,
})

// main app
let index = new Vue({
    el: '#app',
    data: {
        currentUser: null,
        userToken: null,
        currentDay: 1,
        currentMonth: 0,
        displayYearDay: false,
        isLeapYear: false,
        gregorianYear: 0,
        gregorianMonth: 0,
        gregorianDay: 0,
        dayOfYear: 0,
        yearDate: 0,
        daysInGregorianMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        gregorianMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        ficMonthId: 0,
        monthTitle: "Zero",
        fixedTitle: ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]
    },
    methods: {
        shiftMonth: function (increment) {
            let temp_ficMonthId = this.ficMonthId + increment;

            while(temp_ficMonthId <= -1) {
                temp_ficMonthId += 13;
                this.yearDate -= 1;
                this.checkLeapYear(this.yearDate);
            }
            while(temp_ficMonthId >= 13) {
                temp_ficMonthId -= 13;
                this.yearDate += 1;
                this.checkLeapYear(this.yearDate);
            }
            

            this.highlightCurrentDay(temp_ficMonthId);
            this.displayYearDay = false;
            if (temp_ficMonthId == 12) this.displayYearDay = true;

            this.ficMonthId = temp_ficMonthId;
            this.monthTitle = this.fixedTitle[temp_ficMonthId];
        },
        highlightCurrentDay: function (monthToCheck) {
            let bordColor = "var(--background)";
            if (monthToCheck == this.currentMonth && this.yearDate == this.gregorianYear) bordColor = "var(--main-accent)";
            
            document.getElementById(this.currentDay).style.borderTopColor = bordColor;
        },
        checkLeapYear: function (yearToCheck) {
            if ((yearToCheck % 4 == 0 && yearToCheck % 100 != 0) || yearToCheck % 400 == 0) {
                console.log("Leap Year")
                this.daysInGregorianMonth[1] = 29;
                this.isLeapYear = true;
            } else {
                console.log("Not Leap Year")
                this.daysInGregorianMonth[1] = 28;
                this.isLeapYear = false;
            }
        },
        sidebarToggle: function () {
            console.log("open sidebar");
        },
        shiftToToday: function () {
            this.checkLeapYear(this.gregorianYear);
            this.getDayOfYear();
            
            this.shiftMonth(this.currentMonthToMonth(this.currentMonth, this.gregorianYear));
            // this.yearDate = this.gregorianYear;
        },
        currentMonthToMonth: function(endingMonth, endingYear) {
            let calc_currentMonth = this.ficMonthId;
            let calc_currentYear = this.yearDate;
            
            return (endingMonth - calc_currentMonth) + (endingYear - calc_currentYear)*13;
        },
        getDayOfYear: function () {
            this.getGregDates();
            let calc_dayOfYear = 0;
            for (let i = 0; i < this.gregorianMonth; ++i) calc_dayOfYear += this.daysInGregorianMonth[i];
            calc_dayOfYear += this.gregorianDay;

            this.currentDay = calc_dayOfYear % 28;
            this.currentMonth = ((calc_dayOfYear - (calc_dayOfYear % 28)) / 28);
            this.dayOfYear = calc_dayOfYear;
        },
        convertToGreg: function (ficMonth, ficDay) {
            let dayOfYear = ficMonth * 28 + ficDay;
            let calc_gregorianMonth = 0;
            let calc_gregorianDay = dayOfYear;
            let i = 0;

            // recalibrate for leap year
            if (this.isLeapYear && dayOfYear >= 169) {
                ++calc_gregorianDay;
            }

            while (calc_gregorianDay - this.daysInGregorianMonth[i] > 0) {
                calc_gregorianDay -= this.daysInGregorianMonth[i];
                calc_gregorianMonth += 1;
                ++i;
            }
            calc_gregorianMonth = this.gregorianMonthNames[calc_gregorianMonth];

            return calc_gregorianMonth + " " + calc_gregorianDay;
        },
        getGregDates: function () {
            let d = new Date();
            this.gregorianMonth = d.getMonth();
            this.gregorianDay = d.getDate();
            this.gregorianYear = d.getFullYear();
            console.log("Day: " + this.gregorianDay + " Month: " + this.gregorianMonth + " Year: " + this.gregorianYear);
        },
        setupPage: function () {
            this.getGregDates();
            this.yearDate = this.gregorianYear;
            this.checkLeapYear(this.yearDate);
            this.shiftToToday();
        },
        googleLogin: function () {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                console.log(`Hello, ${result.user.displayName}`);
                this.currentUser = result.user;
                this.updateUserData(result.user);
            }).catch(error => {
                console.log(error.code + " : " + error.message);
            })
        },
        updateUserData(user) {

            console.log(user.uid + " " + user.email + " " + user.displayName + " " + user.photoURL + " ");
        }
    },
    mounted() {
        this.setupPage();
    }
})

// Vue.component('', {
//     template: ``,
//     methods: {
//     }
// })