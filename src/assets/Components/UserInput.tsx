import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  activity: z
    .string()
    .min(1, { message: "Activity is required" })
    .min(2, { message: "Activity name must contain at least 2 characters" }),
  category: z
    .string()
    .min(1, { message: "Category is required" })
    .min(4, { message: "Category name must contain at least 4 characters" }),
  amount: z
    .number()
    .min(1, { message: "Currency is required and must be a valid number" }),
  currency: z
    .string()
    .min(1, { message: "Currency is required" })
    .min(0, "Currency is required and must be a valid number"),
});

type Data = z.infer<typeof schema>;

const UserInput = () => {
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
  const onSubmitUserData = (userData: FieldValues) => console.log(userData);

  return (
    <form onSubmit={handleSubmit(onSubmitUserData)}>
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
        <input
          {...register("category")}
          id="category"
          type="text"
          placeholder="Please type the category"
        />
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
        <input
          {...register("currency", { valueAsNumber: false })}
          id="currency"
          type="text"
          placeholder="Please type the currency"
        />
        {errors.currency && <p>{errors.currency.message}</p>}
      </div>
      <button type="submit">Submit your changes</button>
    </form>
  );
};

export default UserInput;
