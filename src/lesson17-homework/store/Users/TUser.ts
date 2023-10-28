export interface TUser{
    id:string,
    firstName:string,
    lastName:string,
    age:number,
    eyeColor:string,
    gender:string,
    isLiked:boolean
}

export type TUserSettings = {
    gender:"male" | "female" | "all",
    eyeColor:"green" | "brown" | "gray" | "blue" | "amber" | "all",
    age: "less20" | "20to40" | "more40" | "all"
}
