export const getTime = (data) => {
  const years =
    data && data.Years ? pluralize(` ${data.Years} year`, data.Years) : "";
  const months =
    data && data.Months ? pluralize(` ${data.Months} month`, data.Months) : "";
  const days = data
    ? data.Days === "0"
      ? ""
      : pluralize(` ${data.Days} day`, data.Days)
    : " 0 days";
  const time = years + months + days;
  return time;
};

const pluralize = (text, count) => {
  return count > 1 ? `${text}s` : text;
};
