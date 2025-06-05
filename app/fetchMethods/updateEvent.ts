export const updateEvent = async (values: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  eventId: number;
  startTime: string;
  endTime: string;
}) => {
  let parsedStartDate;
  let parsedEndDate;

  if (values.isDeleted === false) {
    parsedStartDate = `${values.startDate}T${values.startTime}:00.195Z`;
    parsedEndDate = `${values.endDate}T${values.endTime}:00.195Z`;
  }

  const res = await fetch(
    `http://localhost:5140/api/event/updateEvent?id=${values.eventId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        isDeleted: values.isDeleted || false,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text(); // read plain response safely
    console.error("Server returned error:", text);
    throw new Error(`Server error: ${res.status}`);
  }

  return await res.json(); // only parse as JSON if 2xx
};
