import { occupation, classes, timeTable } from './api'



export function weekNumber(date)
{
    date = new Date
    (
        Date.UTC
        (
            date.getFullYear(), 
            date.getMonth(), 
            date.getDate()
        )
    );

    date.setUTCDate
    (
        date.getUTCDate() + 4 - (date.getUTCDay() || 7)
    );

    var yearStart = new Date
                        (
                            Date.UTC( d.getUTCFullYear(), 0, 1 )
                        );
}