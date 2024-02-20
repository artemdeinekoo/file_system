export const useFormatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString();
};
