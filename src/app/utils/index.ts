export const formatDateTimeString = (dateTimeString: string): string => {
    let date = new Date(dateTimeString);
    let options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short'
    };
    return date.toLocaleDateString('en-GB', options);
};