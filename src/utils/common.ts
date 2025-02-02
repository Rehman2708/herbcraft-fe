export const calculateDeliveryDate = (
  date: string | Date,
  format?: boolean
): string => {
  const validDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(validDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  const newDate = new Date(validDate);
  newDate.setDate(newDate.getDate() + (format ? 0 : 2));

  const formattedDate = newDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
