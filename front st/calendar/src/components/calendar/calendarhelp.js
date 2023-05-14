const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};              


export function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date){
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month]

    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
        
    } else {
        return daysInMonth;
    }
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export function getMonthDate(year, month){
    const result = [];
    const date = new Date(year, month);
    let day = 1;
    let next_day = 1;
    let next_month = month + 1;
    let prev_month = month - 1;
    let prev_date = new Date(year, prev_month, 1)
    const daysInPrevMonth = getDaysInMonth(prev_date)
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let startnull = 0;
   

    for (let i = 0; i< (daysInMonth + monthStartsOn)/ DAYS_IN_WEEK; i++){
        result[i] = []

        for (let j = 0; j < DAYS_IN_WEEK; j++){
            if ((i ===0 && j < monthStartsOn)){
                
                startnull++;
                
            
            }else if (day > daysInMonth){
                result[i][j]= new Date (year, next_month, next_day++);
                
            }
            else{
                result[i][j] = new Date(year, month, day++); 
            }
            
        }

        let startnull_dubl = startnull;
                for (let m= 0; m < startnull; m++){
                    result[0][m]=new Date (year, prev_month, daysInPrevMonth-startnull_dubl+1);
                    startnull_dubl--;
                }
                  
    }

    return result;
}



