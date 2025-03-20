export const getAllCalenderEvents = async (
  token: string,
  calenderId: number
) => {
  const events = await fetch(
    `http://localhost:5140/api/calendar/getBy${calenderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (events.status === 404) {
    return undefined;
  } else {
    return await events.json();
  }
};
