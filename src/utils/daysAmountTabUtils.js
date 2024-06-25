export function getDefaultRanges(year, month, date) {
    let currentDate = new Date(year, month, date);
    let pastWeek = new Date(year, month, date - 6);
    let pastMonth = new Date(year, month - 1, date+1);
    let past3Months = new Date(year, month - 3, date+1);
    let past6Months = new Date(year, month - 6, date+1);
    let pastYear = new Date(year, month, date - 364);
    let YTD_diff = Math.floor(Math.abs(new Date(year, month, date) - new Date(year, 3, 1))/ (1000*60*60*24))
    let thisMonthDiff = Math.floor(Math.abs(new Date(year, month, date) - new Date(year, month, 1))/ (1000*60*60*24))
    // console.log(YTD_diff)
    let YTD = new Date(year, month, date - YTD_diff);
    let thisMonth = new Date(year, month, date - thisMonthDiff);
    return [
        [currentDate, currentDate],
        [pastWeek, currentDate],
        [pastMonth, currentDate],
        [past3Months, currentDate],
        [past6Months, currentDate],
        [pastYear, currentDate],
        [YTD, currentDate],
        [thisMonth, currentDate],
    ];
}