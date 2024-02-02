import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInputType } from "../types/UserInput";
import "../Styling/ErrorMessage.css";
import "../Styling/Modal.css";
import { defaultValues } from "../utils/constants";
import Button from "./Button";
import Datepicker from "./Datepicker";
import { useState } from "react";

const schema = z.object({
  activity: z
    .string()
    .min(1, {
      message: "Activity is required",
    })
    .min(2, { message: "Activity name must contain at least 2 characters" })
    .refine(
      (txt) => /^[A-Za-z\u00C0-\u00FF\s]+$/.test(txt),
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
  selectedActivity: UserInputType;
  closeButtonFunction: () => void;
}

const UserInput = ({
  onSubmitUserInput,
  selectedActivity,
  closeButtonFunction,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: selectedActivity || defaultValues,
  });

  const [selectedDate, setSelectedDate] = useState<Date>(
    selectedActivity.date || new Date()
  );

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <form
      onSubmit={handleSubmit((userInput) =>
        onSubmitUserInput({ ...userInput, date: selectedDate })
      )}
    >
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
          <div>
            <p className="ErrorMessage">{`⚠ ${errors.activity.message}`}</p>
          </div>
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
          <div>
            <p className="ErrorMessage">{`⚠ ${errors.category.message}`}</p>
          </div>
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
          <div>
            <p className="ErrorMessage">{`⚠ ${errors.amount.message}`}</p>
          </div>
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
          <div>
            <p className="ErrorMessage">{`⚠ ${errors.currency.message}`}</p>
          </div>
        )}
      </div>
      <Datepicker selectedDate={selectedDate} onDateChange={handleSelect} />
      <Button className="submitButton" type="submit">
        Submit your activity
      </Button>
      <Button
        className="closeButton"
        style={{ float: "right" }}
        onClick={(e) => {
          e.preventDefault();
          closeButtonFunction();
        }}
      >
        Close
      </Button>
    </form>
  );
};

export default UserInput;
