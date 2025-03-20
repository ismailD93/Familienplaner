export const getCalenderByName = async (
  token: string,
  calenderName: string
) => {
  const calender = await fetch(
    `http://localhost:5140/api/calendar/getByName?name=${calenderName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (calender.status === 404) {
    return undefined;
  } else {
    return await calender.json();
  }
};
