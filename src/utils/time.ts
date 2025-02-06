export function convertTo24Hour(time: string): string {
    time = time.toLowerCase();

    if (time === "noon") return "12:00"; // account for noon
    if (time === "midnight") return "00:00";// account for midnight

    let match = time.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/);
    if (!match) return time;

    let hours = parseInt(match[1]);
    let minutes = match[2] ? parseInt(match[2]) : 0;
    let period = match[3];

    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function extractTime(input: string): { from: string; to: string }[] {
    let matches = input.match(/\d{1,2}:\d{2}\s*[APMapm]*|\d{1,2}\s*[APMapm]+|\bnoon\b|\bmidnight\b|\b\d{1,2}\b/g);
    console.log("Extracted Matches:", matches);

    if (!matches || matches.length < 2) return [];

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

    let timeRanges: { from: string; to: string }[] = [];
    for (let i = 0; i < normalisedTimes.length; i += 2) {
        if (i + 1 < normalisedTimes.length) {
            timeRanges.push({ from: normalisedTimes[i], to: normalisedTimes[i + 1] });
        }
    }
    return timeRanges;
}
