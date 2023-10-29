import {ChangeEvent, ChangeEventHandler} from "react";
import {useAppDispatch} from "../store";
import {setAgeFilter, setEyeColorFilter, setGenderFilter} from "../store/filterSlice.ts";

export const Filters = () => {
  const dispatch = useAppDispatch()
  const genderInputHandler: ChangeEventHandler = (event:ChangeEvent<HTMLInputElement>):void => {
    dispatch(setGenderFilter(event.target.value))
  }
  const ageInputHandler: ChangeEventHandler = (event:ChangeEvent<HTMLInputElement>):void => {
    dispatch(setAgeFilter(event.target.value))
  }
  const eyeColorInputHandler: ChangeEventHandler = (event:ChangeEvent<HTMLInputElement>):void => {
    dispatch(setEyeColorFilter(event.target.value))
  }
  return (
    <form>
      <fieldset className="filter">
        <legend>Filter by gender</legend>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={genderInputHandler}
          /> Gender - Female
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={genderInputHandler}
          /> Gender - Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="all"
            onChange={genderInputHandler}
            defaultChecked
          /> Gender - All
        </label>
      </fieldset>

      <fieldset className="filter">
        <legend>Filter by eye color</legend>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="green"
            onChange={eyeColorInputHandler}
          />
          Eye Color - Green
        </label>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="brown"
            onChange={eyeColorInputHandler}
          />
          Eye Color - Brown
        </label>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="gray"
            onChange={eyeColorInputHandler}
          />
          Eye Color - Gray
        </label>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="blue"
            onChange={eyeColorInputHandler}
          />
          Eye Color - Blue
        </label>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="amber"
            onChange={eyeColorInputHandler}
          />
          Eye Color - Amber
        </label>

        <label>
          <input
            type="radio"
            name="eyeColor"
            value="all"
            onChange={eyeColorInputHandler}
            defaultChecked
          />
          Eye Color - All
        </label>
      </fieldset>

      <fieldset className="filter">
        <legend>Filter by age</legend>

        <label>
          <input
            type="radio"
            name="age"
            value="less20"
            onChange={ageInputHandler}
          />
          Age - Less then 20
        </label>

        <label>
          <input
            type="radio"
            name="age"
            value="20to40"
            onChange={ageInputHandler}
          />
          Age - From 20 to 40
        </label>

        <label>
          <input
            type="radio"
            name="age"
            value="more40"
            onChange={ageInputHandler}
          />
          Age - More than 40
        </label>

        <label>
          <input
            type="radio"
            name="age"
            value="all"
            onChange={ageInputHandler}
            defaultChecked
          />
          Age - all
        </label>
      </fieldset>
    </form>
  )
}
