let input = "Sunday, Mon, Thursday, Fri 10:00 to 14:00";
let days: string[] = ["Monday", "Tuesday"];
interface schedule{key: string, value: string[]}
let schedule = {
    monday: [{ from: "10:00", to: "14:00"}],
};

console.log(input);

function extractDays(input: string): string { // extract the days from the input string
    let match = input.match(/[A-Za-z,\s]+/);//allow for commas for multiple days
    return match ? match[0].trim() : "";
}
console.log(extractDays(input));

function extractTime(input: string): string[] { // extract the time from the input string
    let match = input.match(/\d{1,2}:\d{2} [APMapm]*|\d{1,2}:\d{2}/g);
    return match ? match : [];

}
console.log(extractTime(input));

let dayMap: { [key: string]: string } = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];// define array of week days for easy indexing for the "to"

function expandDays(input: string): string[] {
    let trimmedInput = input.trim();

    if(trimmedInput.includes("to")) {
        let [start, end] = trimmedInput.split("to").map(day => day.trim()); // split the input string into an array of two strings
        let startIdx = weekDays.indexOf(start);
        let endIdx = weekDays.indexOf(end);

        if(startIdx === -1 && endIdx === -1) { //trim the input string to only the day

           return weekDays.slice(startIdx, endIdx + 1); // slice the array to include the start and end indices 
           // (Slice is exclusive of last so we need to add 1)
        }
    }
    return trimmedInput.split(", ").map(day => dayMap[day.trim()] || day.trim()); // handle comma separated days


}

type timeRange = { from: string, to: string };

type Schedule = { [key: string]: timeRange[] };


function paraseSchedule(input: string): Schedule {
    let schedule : Schedule = {};
    let daysPart = extractDays(input);
    let timePart = extractTime(input);
    
    let expandedDays = expandDays(daysPart);

    if(timePart.length === 2) {
        let timeRange = {from: timePart[0].trim(), to: timePart[1].trim()}; //

        for (let day of expandedDays) {
            if(!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(timeRange);
        }   
    }
    return schedule;
}

console.log(paraseSchedule(input));

// ✅ Test Cases
console.log(expandDays("Mon to Thu")); // ["Monday", "Tuesday", "Wednesday", "Thursday"]
console.log(expandDays("Mon, Tue, Wed")); // ["Monday", "Tuesday", "Wednesday"]
console.log(expandDays("Sun, Mon")); // ["Sunday", "Monday"]