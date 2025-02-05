"use strict";
let input = "Monday, Tuesday, Wed, 10:00 to 14:00";
let days = ["Monday", "Tuesday"];
let schedule = {
    monday: [{ from: "10:00", to: "14:00" }],
};
console.log(input);
function extractDays(input) {
    let match = input.match(/[A-Za-z\s]+/);
    return match ? match[0].trim() : "";
}
console.log(extractDays(input));
function extractTime(input) {
    let match = input.match(/\d{1,2}:\d{2} [APMapm]*|\d{1,2}:\d{2}/g);
    return match ? match : [];
}
console.log(extractTime(input));
let dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
};
function expandDays(input) {
    let trimmedInput = input.trim();
    let days = input.split("to"); // split the input string into an array of two strings
    if (days.length === 2) {
        let start = Object.keys(dayMap).indexOf(days[0]);
        let end = Object.keys(dayMap).indexOf(days[1]);
        if (start === -1 || end === -1) { //trim the input string to only the day
            return Object.keys(dayMap).slice(start, end + 1); // slice the array to include the start and end indices 
            // (Slice is exclusive of last so we need to add 1)
        }
    }
    return trimmedInput.split(", ").map((day) => dayMap[day] || day); // handle the case where there is only one day
}
function paraseSchedule(input) {
    let schedule = {};
    let daysPart = extractDays(input);
    let timePart = extractTime(input);
    let expandedDays = expandDays(daysPart);
    if (timePart.length === 2) {
        let timeRange = { from: timePart[0], to: timePart[1].trim() };
        for (let day of expandedDays) {
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(timeRange);
        }
    }
    return schedule;
}
console.log(paraseSchedule(input));
