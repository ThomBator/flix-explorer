export const formatDate = (dateString: string) => {
  const dateToFormat = new Date(dateString);
  const month = dateToFormat.toLocaleString("en", { month: "long" });
  const day = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();

  return `${month}, ${day} ${year}`;
};

export const formatYear = (dateString: string) => {
  const dateToFormat = new Date(dateString);
  const year = dateToFormat.getFullYear();

  return `${year}`;
};
