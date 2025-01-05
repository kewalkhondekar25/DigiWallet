export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN").format(amount/100);
};