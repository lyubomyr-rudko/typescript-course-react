export const getDateString = (date: string): string => {
    const dateObject = new Date(date)
    const transformedDate: string[] = dateObject
        .toLocaleString('en', {month: 'long', day: 'numeric', year: 'numeric'})
        .split(' ');
    [transformedDate[0], transformedDate[1]] = [transformedDate[1], transformedDate[0]]
    transformedDate[1] = transformedDate[1] + ","
    return transformedDate.join(' ').replace(',', '')
}
