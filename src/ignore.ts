// If the project breaks then just use this file. 
// It's a backup of the original code I worte before the refactor.

let input = "Mon, Tue, Wed 10:00 to 17:00, Thu 11:00 - 12:00, Fri 9am to noon, Weekends 10:30-11:30";
let days: string[] = ["Monday", "Tuesday"];
interface schedule{key: string, value: string[]}
let schedule = {
    monday: [{ from: "10:00", to: "14:00"}],
};

console.log("Input:",input);

function normalizeDays(input: string): string {
    return input
        .toLowerCase()
        .replace(/\bweekdays\b|\bmon to fri\b|\bmonday to friday\b/g, "Monday, Tuesday, Wednesday, Thursday, Friday")
        .replace(/\bweekends\b|\bweekend\b|\bsat & sun\b|\bsaturday and sunday\b/g, "Saturday, Sunday")
        .replace(/\bmon(?!day)\b/g, "Monday")
        .replace(/\btue(?!sday)\b/g, "Tuesday")
        .replace(/\bwed(?!nesday)\b/g, "Wednesday")
        .replace(/\bthu(?!rsday)\b/g, "Thursday")
        .replace(/\bfri(?!day)\b/g, "Friday")
        .replace(/\bsat(?!urday)\b/g, "Saturday")
        .replace(/\bsun(?!day)\b/g, "Sunday");
}


function extractDays(input: string): string { // extract the days from the input string
    let match = input.match(/[A-Za-z,\s]+/);//allow for commas for multiple days
    if (!match) return "";
    return match[0].replace(/\bfrom\b/gi, "").trim(); // Remove "from" before returning
}
console.log("Extracted Days:", extractDays(input));

//helper function to turn AM and PM into 24 hour time

function convertTo24Hour(time: string): string {
    time = time.toLowerCase();

    if (time === "noon") return "12:00"; // account for noon
    if (time === "midnight") return "00:00";// account for midnight

    let match = time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/);

    if(!match) return time;

    let hours = parseInt(match[1]);
    let minutes =  match[2] ? parseInt(match[2]) : 0;
    let period =  match[3];

    if(period ===  "pm" && hours !== 12) hours += 12;  // convert pm to 24 hour 
    if(period ===  "am" && hours === 12) hours = 0;  // convert am to 25 hour

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

}

function extractTime(input: string): { from: string; to: string }[]{
    let matches = input.match(/\d{1,2}:\d{2}\s*[APMapm]*|\d{1,2}\s*[APMapm]+|\bnoon\b|\bmidnight\b|\b\d{1,2}\b/g); // define the time inputs we can take
    console.log("Extracted Matches:", matches);

    if (!matches || matches.length < 2) return []; // if no times found retun empty array

    let normalisedTimes: string[] = matches.map(time => {
        time = time.trim();
        if (time === "noon") return "12:00"; // Ensure Noon gets added
        if (time === "midnight") return "00:00"; // Midnight is fine
        if (/^\d{1,2}$/.test(time)) {
            time = `${time}:00`; // Convert single numbers to "hh:00"
        }
        return convertTo24Hour(time);
    });
    console.log("Normalised Times:", normalisedTimes);


    let timeRanges: { from: string; to: string }[] = []; // initialise array to store output

    for (let i = 0; i < normalisedTimes.length; i += 2) { // loop through times in steps of two as range consists of 2 times 
        if(i + 1 < normalisedTimes.length) {//stay in bounds
            timeRanges.push({ from: normalisedTimes[i], to: normalisedTimes[i + 1] }); // pair times from and 2 
        }
    }
    return timeRanges;
}


console.log("Extracted Times:",extractTime(input));

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
    let normalizedInput = normalizeDays(input);
    let trimmedInput = normalizedInput.trim();

    if(trimmedInput.includes("to")) {
        let [start, end] = trimmedInput.split("to").map(day => day.trim()); // split the input string into an array of two strings
        let startIdx = weekDays.findIndex(d => d.toLowerCase().startsWith(start.toLowerCase()));
        let endIdx = weekDays.findIndex(d => d.toLowerCase().startsWith(end.toLowerCase()));

        if (startIdx !== -1 && endIdx !== -1) {//trim the input string to only the day

           return weekDays.slice(startIdx, endIdx + 1); // slice the array to include the start and end indices 
           // (Slice is exclusive of last so we need to add 1)
        }
    }
    return trimmedInput.split(/,|\band\b/).map(day => dayMap[day.trim()] || day.trim()); // handle comma separated days


}

type timeRange = { from: string, to: string };

type Schedule = { [key: string]: timeRange[] };


function parseSchedule(input: string): { schedule: { weeklyRanges: Schedule } } {
    let schedule: Schedule = {};

    let parts = input.match(
        /([A-Za-z,\s]+)\s+(?:from\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(?:to|-|till)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|midnight)/gi
    ) || [];    
    
    
    console.log("Processing part:", parts);

    for (let part of parts) {
        let daysPart = extractDays(part); // Extract specific days for this segment
        let timePart = extractTime(part); // Extract time range for this segment
        let expandedDays = expandDays(daysPart); // Expand "weekends", "Mon to Wed" etc.
        console.log("Extracted Time:", timePart);
        console.log("Extracted Days:", expandedDays);

        if (expandedDays.length > 0 && timePart.length > 0) {
            for (let day of expandedDays) {
                let formattedDay = day.toLowerCase(); // Capitalize first letter

                if (formattedDay === "") continue; // Ignore empty day entries

                if (!schedule[formattedDay]) {
                    schedule[formattedDay] = [];
                }

                schedule[formattedDay].push(...timePart); // Add only correct time range for each day
            }
        }
    }
    
    return {schedule:{ weeklyRanges: schedule}};
    
}



console.log(JSON.stringify(parseSchedule(input), null, 2));

