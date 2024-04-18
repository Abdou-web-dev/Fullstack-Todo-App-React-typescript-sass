const formatDate = (date: Date | string, time: string) => {
  const formattedDate = new Date(date);
  const [hours, minutes] = time ? time.split(":") : ["00", "00"];

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateString = formattedDate.toLocaleDateString(
    "en-GB",
    dateOptions
  );
  const formattedTimeString = new Date(
    formattedDate.getFullYear(),
    formattedDate.getMonth(),
    formattedDate.getDate(),
    parseInt(hours),
    parseInt(minutes)
  ).toLocaleTimeString("en-US", timeOptions);

  return `${formattedDateString} at ${formattedTimeString}`;
};

export { formatDate };
