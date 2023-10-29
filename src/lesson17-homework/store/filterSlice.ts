import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

type TFilterByGenderPayload = 'all' | 'male' | 'female'
type TFilterByAgePayload = 'all' | 'less20' | '20to40' | 'more40'
type TFilterByEyeColor = 'all' | 'green' | 'gray' | 'blue' | 'brown' | 'amber'

type IFilterState = {
  byGender: TFilterByGenderPayload
  byAge: TFilterByAgePayload
  byEyeColor: TFilterByEyeColor
}

const initialState: IFilterState = {
  byGender: 'all',
  byAge: 'all',
  byEyeColor: "all"
}
const filterSlice: Slice<IFilterState> = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenderFilter(state, { payload }: PayloadAction<TFilterByGenderPayload>) {
      state.byGender = payload
    },
    setAgeFilter(state, { payload }: PayloadAction<TFilterByAgePayload>) {
      state.byAge = payload
    },
    setEyeColorFilter(state, { payload } : PayloadAction<TFilterByEyeColor>) {
      state.byEyeColor = payload
    }
  }
})

export const {setGenderFilter, setAgeFilter, setEyeColorFilter} = filterSlice.actions

export default filterSlice.reducer
