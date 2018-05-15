Vue.component('month-title', {
    template: `<div class="month-title" :id=this.$root.monthId>Month {{ this.$root.monthTitle }}</div>`,
})

Vue.component('weekday', {
    template: `
        <div class="week-wrapper">
            <div v-for="name in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :id=name class="week card boxshadow">
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
                        <div class="unimportant">{{ $root.convertToGreg($root.monthId, day + (week-1)*7) }}</div>
                    </div>
                </div>
            </div>
        </div>`,
})

Vue.component('sidebar', {
    template: `
    <div>
    </div>`,
})

// main app
let index = new Vue({
    el: '#app',
    data: {
        curDay: 0,
        curMonth: 0,
        gregMonth: 0,
        gregDay: 0,
        dayOfYear: 0,
        gregMonthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        gregMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthId: 0,
        monthTitle: "Zero",
        fixedTitle: ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]
    },
    methods: {
        shiftMonth: function (increment) {
            let bmonthId = this.monthId + increment;
            if (bmonthId == -1) bmonthId = 12;
            if (bmonthId == 13) bmonthId = 0;

            let bordColor = "var(--background)"
            if (bmonthId == this.curMonth) bordColor = "var(--main-accent)";
            document.getElementById(this.curDay).style.borderTopColor = bordColor;

            this.monthId = bmonthId;
            this.monthTitle = this.fixedTitle[bmonthId];
        },
        sidebarToggle: function () {
            console.log("open sidebar");
        },
        findToday: function () {
            this.findDayOfYear();

            let day = this.dayOfYear % 28;
            let month = ((this.dayOfYear - day) / 28);
            if (month >= 7) month += 1; // Check if the month 'sol' has passed

            this.monthId = month;
            this.monthTitle = this.fixedTitle[this.monthId];
            document.getElementById(day).style.borderTopColor = "var(--main-accent)";
            this.curDay = day;
            this.curMonth = month;
        },
        findDayOfYear: function () {
            this.getGregDates();
            let day = 0;
            for (let i = 0; i < this.gregMonth; ++i) day += this.gregMonthDays[i];
            day += this.gregDay;
            this.dayOfYear = day;
        },
        convertToGreg: function (month, day) {
            let thisDay = month * 28 + day;
            let bGregMonth = 0;
            let bGregDay = thisDay;
            for (let i = 0; bGregDay - this.gregMonthDays[i] > 0; i++) {
                bGregDay -= this.gregMonthDays[i];
                bGregMonth += 1;
            }
            bGregMonth = this.gregMonthNames[bGregMonth];
            return bGregMonth + " " + bGregDay;
        },
        getGregDates: function () {
            let d = new Date();
            this.gregMonth = d.getMonth();
            this.gregDay = d.getDate();
        },
        setupPage: function () {
            this.getGregDates();
            this.findToday();
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