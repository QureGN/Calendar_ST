// import * as calendar from '../calendar/calendarhelp';

const DAYS_IN_WEEK = 7;


export function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function getWeekDays(selected, days){
    const week = [];
    let row;
    // let count = 0;
    // let undef;
    // let next_month, prev_month;
    // let day= 1;
    
    for (let i = 0; i< days.length; i++){
        
        for (let j = 0; j < DAYS_IN_WEEK; j++){
                
            if (days[i][j] !== null){
                if (areEqual(selected, days[i][j]) === true){
                    row = i; 
                    
                }       
            }
              
        }
    }

    for (let j = 0; j < DAYS_IN_WEEK; j++){
        week[j]=days[row][j]; 
        
        // if (week[j] == undefined) {
        //     count++;  
        //     undef = j;
        // }           
    }
   

    // if (count > 0){
    //     if ( undef = 6){
    //         next_month = selected.getMonth() + 1;
    //         const monthdate = calendar.getMonthDate(selected.getFullYear(), next_month);
    //         for (let j = 0; j < DAYS_IN_WEEK; j++){
    //             if (week[j] == undefined){
    //                 week[j]=monthdate[0][j];
    //                 // week[j]= new Date (selected.getFullYear(), next_month, day++)
    //             }
    //         }
            
    //     }
    //     else {

    //     }
    // }
     



    return week;
}
