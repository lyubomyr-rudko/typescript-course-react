import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TUser, TUserSettings } from "./TUser"
import { deleteUserById, fetchAllUsers, fetchUserById } from "./usersReducers"

interface UsersState {
    entities: TUser[],
    filterSettings: TUserSettings
}

const initialState:UsersState = {
    entities: [],
    filterSettings: {
        gender:"all",
        eyeColor:"all",
        age:"all"
    }
}

const usersSlice = createSlice({
    name:'users',
    initialState:initialState,
    reducers:{
        updateUserSettings: function (state, action: PayloadAction<TUserSettings>){
            state.filterSettings = action.payload
            console.log(state.filterSettings)
        },
        likeUser: function(state, action: PayloadAction<number | string>) {
            state.entities = [...state.entities.map((user)=>{
                if(user.id == action.payload){
                    user.isLiked = !user.isLiked
                }
                return user
            })]
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUsers.fulfilled, (state, action)=>{
            state.entities = action.payload;
        }),
        builder.addCase(fetchUserById.fulfilled, (state, action)=>{
            if(action.payload !== null){
                state.entities = [...state.entities, action.payload];
            }
        }),
        builder.addCase(deleteUserById.fulfilled, (state, action)=>{
            if(action.payload !== null){
                state.entities = [...state.entities.filter((user)=>user.id !== action.payload)]
            }
        })
    }
})

export const { likeUser, updateUserSettings } = usersSlice.actions;

const usersReducer = usersSlice.reducer;
export default usersReducer;