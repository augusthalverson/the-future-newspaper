var today = new Date();
today = formatDate(today);
document.querySelector("#dateSpan").innerHTML = today;


const Http = new XMLHttpRequest();
const url = "https://api.openweathermap.org/data/2.5/weather?id=5045360&APPID=b99bd17e0063dd00f3d7f04b86b0d88c&units=imperial";
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    var currentWeather = JSON.parse(Http.responseText);
    var icon = currentWeather.weather[0].icon;
    var temp = currentWeather.main.temp;
    var weatherName = currentWeather.weather[0].main;
    var weatherIcons = new Map([
        ["01d", "sun"],
        ["01n", "moon"],
        ["02d", "cloud-sun"],
        ["02n", "cloud-moon"],
        ["03d", "cloud"],
        ["03n", "cloud"],
        ["04d", "cloud"],
        ["04n", "cloud"],
        ["09d", "cloud-showers-heavy"],
        ["09n", "cloud-showers-heavy"],
        ["10d", "cloud-sun-rain"],
        ["10n", "cloud-moon-rain"],
        ["11d", "bolt"],
        ["11n", "bolt"],
        ["13d", "snowflake"],
        ["13n", "snowflake"],
        ["50d", "smog"],
        ["50n", "smog"]
    ]);
    document.querySelector("#weatherSpan i").classList.add("fa-" + weatherIcons.get(icon));
    document.querySelector("#weatherSpan #tempSpan").innerHTML = Math.round(temp) + "º";
    document.querySelector("#weatherSpan #weatherNameSpan").innerHTML = weatherName;
}

function formatDate(date) {
    var dayNames = [
         "Sunday", "Monday", "Tuesday", "Wednesday",
         "Thursday", "Friday", "Saturday"
    ];
    var dateNames = [
        "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "10th",
        "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th",
        "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th",
        "29th", "30th", "31st"
    ];
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var currentDay = dayNames[date.getDay()];
    var currentDate = dateNames[date.getDate()];
    var currentMonth = monthNames[date.getMonth()];
    var currentYear = date.getFullYear();

    return currentDay + ', ' + currentMonth + ' ' + currentDate + ', ' + currentYear;
}