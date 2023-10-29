import { useFormContext } from "react-hook-form";

const Form = () => {
  const { register } = useFormContext();

  return (
    <form>
      <fieldset className="filter">
        <legend>Filter by gender</legend>

        <label>
          <input type="radio" value="female"  {...register("gender")} /> Gender - Female
        </label>

        <label>
          <input type="radio" value="male" {...register("gender")} /> Gender - Male
        </label>

        <label>
          <input type="radio" value="all" {...register("gender")} /> Gender - All
        </label>
      </fieldset>

      <fieldset className="filter">
        <legend>Filter by eye color</legend>

        <label>
          <input type="radio" value="green" {...register("eyeColor")} />
          Eye Color - Green
        </label>

        <label>
          <input type="radio" value="brown" {...register("eyeColor")} />
          Eye Color - Brown
        </label>

        <label>
          <input type="radio" value="gray" {...register("eyeColor")} />
          Eye Color - Gray
        </label>

        <label>
          <input type="radio" value="blue" {...register("eyeColor")} />
          Eye Color - Blue
        </label>

        <label>
          <input type="radio" value="amber" {...register("eyeColor")} />
          Eye Color - Amber
        </label>

        <label>
          <input type="radio" value="all" {...register("eyeColor")} />
          Eye Color - All
        </label>
      </fieldset>

      <fieldset className="filter">
        <legend>Filter by age</legend>

        <label>
          <input type="radio" value="less20" {...register("age")} />
          Age - Less then 20
        </label>

        <label>
          <input type="radio" value="20to40" {...register("age")} />
          Age - From 20 to 40
        </label>

        <label>
          <input type="radio" value="more40" {...register("age")} />
          Age - More than 40
        </label>

        <label>
          <input type="radio" value="all" {...register("age")} />
          Age - all
        </label>
      </fieldset>
    </form>
  )
}

export default Form;