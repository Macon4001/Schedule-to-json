import { normalizeDays, extractDays, dayMap } from "./utils/days";
import { extractTime } from "./utils/time";

export type timeRange = { from: string, to: string };
export type Schedule = { [key: string]: timeRange[] };

export function parseSchedule(input: string): { schedule: { weeklyRanges: Schedule } } {
    let schedule: Schedule = {};

    let parts = input.match(
        /([A-Za-z,\s]+)\s+(?:from\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(?:to|-|till)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|midnight)/gi
    ) || [];    
    
    console.log("Processing part:", parts);

    for (let part of parts) {
        let daysPart = extractDays(part);
        let timePart = extractTime(part);
        let expandedDays = normalizeDays(daysPart).split(", ");

        console.log("Extracted Time:", timePart);
        console.log("Extracted Days:", expandedDays);

        if (expandedDays.length > 0 && timePart.length > 0) {
            for (let day of expandedDays) {
                let formattedDay = day.toLowerCase();

                if (formattedDay === "") continue;

                if (!schedule[formattedDay]) {
                    schedule[formattedDay] = [];
                }

                schedule[formattedDay].push(...timePart);
            }
        }
    }
    
    return { schedule: { weeklyRanges: schedule } };
}
