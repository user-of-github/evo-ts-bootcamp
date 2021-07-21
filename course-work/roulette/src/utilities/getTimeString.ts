export const getTimeString = (time: Date): string => {
    return (
        (time.getHours() > 9 ? time.getHours() : ('0' + time.getHours())).toString()
        +
        ':'
        +
        (time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes())).toString()
        +
        ':'
        +
        (time.getSeconds() > 9 ? time.getSeconds() : ('0' + time.getSeconds())).toString()
    )
}