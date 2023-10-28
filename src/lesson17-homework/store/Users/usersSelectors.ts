import { RootState } from "..";

export const filteredUsers = (state: RootState) => {
    const {entities, filterSettings} = state.users
    const filteredByGender = entities.filter((user)=>{
        if(filterSettings.gender === 'all'){
            return true
        } else if(filterSettings.gender.toLowerCase() === user.gender.toLowerCase()){
            return true
        }
    })

    const filteredByGenderAndEyeColor = filteredByGender.filter((user)=>{
        if(filterSettings.eyeColor === 'all'){
            return true
        } else if(filterSettings.eyeColor.toLowerCase() === user.eyeColor.toLowerCase()){
            return true
        }
    })

    const filteredByEverything = filteredByGenderAndEyeColor.filter((user)=>{
        if(filterSettings.age === 'all'){
            return true
        } else if(filterSettings.age === "less20"){
            return user.age < 20
        } else if(filterSettings.age === "20to40"){
            return user.age >= 20 && user.age <= 40
        } else if(filterSettings.age === "more40"){
            return user.age > 40
        }
    })

    return filteredByEverything
}