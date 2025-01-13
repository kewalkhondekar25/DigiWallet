import * as yup from "yup";

const onRampTxnSchema = yup.object({
  id: yup.number().required("User Id is req"),
  amount: yup.number().required("Please enter an amount").min(1, "Amount can't be negative or 0"),
});

export {
  onRampTxnSchema
};