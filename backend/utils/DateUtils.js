const convertDate = (date) => {
  return new Date(date)
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
};

const formatDateToISO = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hours, minutes] = timePart.split(":");

  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00Z`);
  return date.toISOString();
};

module.exports = { convertDate, formatDateToISO };
