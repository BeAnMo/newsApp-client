
/* Date, String -> String */
export function formatDate(date, format){
    return new Date(date)[format]();
}