import { parseSchedule } from "./parser";

let input = "Mon, Tue, Wed 10:00 to 17:00, Thu 11:00 - 12:00, Fri 9am to noon, Weekends from 10:30 till 11:30";

console.log("Input:", input);
console.log(JSON.stringify(parseSchedule(input), null, 2));
