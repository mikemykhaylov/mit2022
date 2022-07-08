var endDate = new Date("Oct 1, 2022 6:00:00").getTime();

var timer = setInterval(function() {
    let now = new Date().getTime();
    let t = endDate - now;
    if (t >= 0) {
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((t % (1000 * 60)) / 1000);

        let daysText = (days <= 1 ) ? "<span class='label'>DAY</span>": "<span class='label'>DAYS</span>"
        let hoursText = (hours <= 1) ? "<span class='label'>HR</span>" : "<span class='label'>HRS</span>"
        let minutesText = (mins <= 1 ) ? "<span class='label'>MIN</span>": "<span class='label'>MINS</span>"
        let secondsText = (secs <=1 ) ? "<span class='label'>SEC</span>" : "<span class='label'>SEC</span>"

        document.getElementById("timer-days").innerHTML = days +
        daysText
    
        document.getElementById("timer-hours").innerHTML = ("0"+hours).slice(-2) +
        hoursText
    
        document.getElementById("timer-mins").innerHTML = ("0"+mins).slice(-2) +
        minutesText
    
        document.getElementById("timer-secs").innerHTML = ("0"+secs).slice(-2) +
        secondsText
    
    } else {
        document.getElementById("timer").innerHTML = "The countdown is over!";
    }
    
}, 1000);

