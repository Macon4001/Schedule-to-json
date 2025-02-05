"use strict";
let input = "Sunday, Mon, Thursday, Fri 10:00 to 14:00";
let days = ["Monday", "Tuesday"];
let schedule = {
    monday: [{ from: "10:00", to: "14:00" }],
};
console.log(input);
function extractDays(input) {
    let match = input.match(/[A-Za-z,\s]+/); //allow for commas for multiple days
    return match ? match[0].trim() : "";
}
console.log(extractDays(input));
//helper function to turn AM and PM into 24 hour time
function convertTo24Hour(time) {
    time = time.toLowerCase();
    if (time === "noon")
        return "12:00"; // account for noon
    if (time === "midnight")
        return "00:00"; // account for midnight
    let match = time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/);
    if (!match)
        return time;
    let hours = parseInt(match[1]);
    let minutes = match[2] ? parseInt(match[2]) : 0;
    let period = match[3];
    if (period === "pm" && hours !== 12)
        hours += 12; // convert pm to 24 hour 
    if (period === "am" && hours !== 12)
        hours = 0; // convert am to 25 hour
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
function extractTime(input) {
    let matches = input.match(/\d{1,2}:\d{2} [APMapm]*|\d{1,2} [APMapm]+|\d{1,2}:\d{2}|\bnoon\b|\bmidnight\b/g); // define the time inputs we can take
    if (!matches || matches.length < 2)
        return []; // if no times found retun empty array
    let normalisedTimes = matches.map(time => convertTo24Hour(time.trim())); //apply the convertTo24Hour function to each time
    let timeRanges = []; // initialise array to store output
    for (let i = 0; i < normalisedTimes.length; i += 2) { // loop through times in steps of two as range consists of 2 times 
        if (i + 1 < normalisedTimes.length) { //stay in bounds
            timeRanges.push({ from: normalisedTimes[i], to: normalisedTimes[i + 1] }); // pair times from and 2 
        }
    }
    return timeRanges;
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
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // define array of week days for easy indexing for the "to"
function expandDays(input) {
    let trimmedInput = input.trim();
    if (trimmedInput.includes("to")) {
        let [start, end] = trimmedInput.split("to").map(day => day.trim()); // split the input string into an array of two strings
        let startIdx = weekDays.indexOf(start);
        let endIdx = weekDays.indexOf(end);
        if (startIdx === -1 && endIdx === -1) { //trim the input string to only the day
            return weekDays.slice(startIdx, endIdx + 1); // slice the array to include the start and end indices 
            // (Slice is exclusive of last so we need to add 1)
        }
    }
    return trimmedInput.split(/,|\band\b/).map(day => dayMap[day.trim()] || day.trim()); // handle comma separated days
}
function paraseSchedule(input) {
    let schedule = {};
    let daysPart = extractDays(input);
    let timePart = extractTime(input);
    let expandedDays = expandDays(daysPart);
    if (timePart.length > 0) { // extract any time range not just when 2 are
        let timeRange = { from: timePart[0], to: timePart[1] }; //
        for (let day of expandedDays) {
            let fullDay = dayMap[day] || day;
            if (!schedule[fullDay]) {
                schedule[fullDay] = [];
            }
            schedule[fullDay].push(...timePart);
        }
    }
    return schedule;
}
console.log(paraseSchedule(input));
