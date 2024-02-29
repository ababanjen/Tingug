export const toCurrency = (price: number) => {
  const amt = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  return amt.format(price);
};
