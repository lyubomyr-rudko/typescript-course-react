import {IUserForm} from "./types.ts";

export const getDateString = (date: string): string => {
    const dateObject = new Date(date)
    const transformedDate: string[] = dateObject
        .toLocaleString('en', {month: 'long', day: 'numeric', year: 'numeric'})
        .split(' ');
    [transformedDate[0], transformedDate[1]] = [transformedDate[1], transformedDate[0]]
    transformedDate[1] = transformedDate[1] + ","
    return transformedDate.join(' ').replace(',', '')
}

export const transformUserObjectFromForm = (user: IUserForm, position: number) => {
    const {firstName, lastName, email, hairColor, isFemale, birthDate} = user
    return {
        firstName,
        lastName,
        hair: {
            color: hairColor
        },
        gender: isFemale ? 'female' : 'male',
        birthDate,
        email,
        position
    }
}

export const validateBirthDate = (dateStr: string):boolean => {
    const date = new Date(dateStr);
    return (date.toISOString().split('T')[0] === dateStr) && date < new Date()
}
