"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayMap = void 0;
exports.normalizeDays = normalizeDays;
exports.extractDays = extractDays;
function normalizeDays(input) {
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
function extractDays(input) {
    let match = input.match(/[A-Za-z,\s]+/);
    if (!match)
        return "";
    return match[0].replace(/\bfrom\b/gi, "").trim(); // Remove "from" before returning
}
exports.dayMap = {
    Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday",
    Sat: "Saturday", Sun: "Sunday"
};
