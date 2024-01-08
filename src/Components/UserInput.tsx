import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInputType } from "../types/UserInput";
import "../Styling/ErrorMessage.css";
import "../Styling/Modal.css";

const schema = z.object({
  activity: z
    .string()
    .min(1, {
      message: "Activity is required",
    })
    .min(2, { message: "Activity name must contain at least 2 characters" })
    .refine(
      (txt) => /^[a-zA-Z\s]*$/.test(txt),
      "Activity should contain only letters or space"
    ),
  category: z.string().refine((value) => value !== "", {
    message: "Valid category is needed",
  }),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount is required and must be a valid number" }),
  currency: z.string().refine((value) => value !== "", {
    message: "Valid currency is needed",
  }),
});

type Data = z.infer<typeof schema>;

interface Props {
  onSubmitUserInput: (userInput: UserInputType) => void;
  toggleFunction: () => void;
}

const UserInput = ({ onSubmitUserInput, toggleFunction }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: "",
      category: "",
      amount: 1,
      currency: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitUserInput)}>
      <div>
        <label htmlFor="activity" className="activityLabel">
          Activity
        </label>
        <input
          {...register("activity")}
          id="activity"
          type="text"
          placeholder="Please type your activity"
          className="activityInput"
        />
        {errors.activity && (
          <p className="ErrorMessage">{errors.activity.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="categoryLabel">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="categoryInput"
        >
          <option value="">Please select the category</option>
          <option value="Free time">Free time</option>
          <option value="Business">Business</option>
          <option value="Household">Household</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && (
          <p className="ErrorMessage">{errors.category.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="amount" className="amountLabel">
          Amount
        </label>
        <input
          {...register("amount")}
          id="amount"
          type="number"
          placeholder="Please type the spent amount"
          className="amountInput"
        />
        {errors.amount && (
          <p className="ErrorMessage">{errors.amount.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="currency" className="currencyLabel">
          Currency
        </label>
        <select
          {...register("currency")}
          id="currency"
          className="currencyInput"
        >
          <option value="">Please select the currency</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="HUF">HUF</option>
        </select>
        {errors.currency && (
          <p className="ErrorMessage">{errors.currency.message}</p>
        )}
      </div>
      <button className="submitButton" type="submit">
        Submit your activity
      </button>
      <button
        className="closeButton"
        onClick={(e) => {
          e.preventDefault();
          toggleFunction();
        }}
      >
        Close
      </button>
    </form>
  );
};

export default UserInput;
