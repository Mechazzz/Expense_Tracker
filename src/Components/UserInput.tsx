import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInputType } from "../types/UserInput";

const schema = z.object({
  activity: z
    .string()
    .min(1, { message: "Activity is required" })
    .min(2, { message: "Activity name must contain at least 2 characters" })
    .refine(
      (txt) => /^[a-zA-Z\s]*$/.test(txt),
      "Activity should contain only letters or space"
    ),
  category: z.string().refine((value) => value !== "", {
    message: "Valid category is needed",
  }),
  amount: z
    .number()
    .min(1, { message: "Amount is required and must be a valid number" }),
  currency: z.string().refine((value) => value !== "", {
    message: "Valid category is needed",
  }),
});

type Data = z.infer<typeof schema>;

interface Props {
  onSubmitUserInput: (userInput: UserInputType) => void;
}

const UserInput = ({ onSubmitUserInput }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: "",
      category: "",
      amount: 0,
      currency: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitUserInput)}>
      <div>
        <label htmlFor="activity">Activity:</label>
        <input
          {...register("activity", {
            pattern: /^[a-zA-Z]*$/,
          })}
          id="activity"
          type="text"
          placeholder="Please type your activity"
        />
        {errors.activity && <p>{errors.activity.message}</p>}
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select {...register("category")} id="category">
          <option value="">Please select a category</option>
          <option value="Free time">Free time</option>
          <option value="Business">Business</option>
          <option value="Household">Household</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          placeholder="Please type the amount of money"
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>
      <div>
        <label htmlFor="currency">Currency:</label>
        <select {...register("currency")} id="currency">
          <option value="">Please select a category</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="HUF">HUF</option>
        </select>
        {errors.currency && <p>{errors.currency.message}</p>}
      </div>
      <button type="submit">Submit your activity</button>
    </form>
  );
};

export default UserInput;
