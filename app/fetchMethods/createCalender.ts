export const createCalender = async (token: string, name: string) => {
  const calender = await fetch(
    `http://localhost:5140/api/calendar/addCalendar`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    }
  );
  console.log(calender);
  if (calender.status === 404) {
    return undefined;
  } else {
    return await calender.json();
  }
};
