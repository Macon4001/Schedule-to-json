"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSchedule = parseSchedule;
const days_1 = require("./utils/days");
const time_1 = require("./utils/time");
function parseSchedule(input) {
    let schedule = {};
    let parts = input.match(/([A-Za-z,\s]+)\s+(?:from\s*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(?:to|-|till)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|noon|midnight)/gi) || [];
    console.log("Processing part:", parts);
    for (let part of parts) {
        let daysPart = (0, days_1.extractDays)(part);
        let timePart = (0, time_1.extractTime)(part);
        let expandedDays = (0, days_1.normalizeDays)(daysPart).split(", ");
        console.log("Extracted Time:", timePart);
        console.log("Extracted Days:", expandedDays);
        if (expandedDays.length > 0 && timePart.length > 0) {
            for (let day of expandedDays) {
                let formattedDay = day.toLowerCase();
                if (formattedDay === "")
                    continue;
                if (!schedule[formattedDay]) {
                    schedule[formattedDay] = [];
                }
                schedule[formattedDay].push(...timePart);
            }
        }
    }
    return { schedule: { weeklyRanges: schedule } };
}
