export const assignToCalender = async (token: string, calendarId: number) => {
  const assignToCalender = await fetch(
    `http://localhost:5140/api/account/assignCalendarId?calendarId=${calendarId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (assignToCalender.status === 404) {
    return undefined;
  } else {
    return await assignToCalender.json();
  }
};
