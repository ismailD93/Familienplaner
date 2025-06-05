export const createEvent = async (
  username: string,
  values: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    weeklyEndDate?: string;
  }
) => {
  const parsedStartDate = `${values.startDate}T${values.startTime}:00.195Z`;
  const parsedEndDate = `${values.endDate}T${values.endTime}:00.195Z`;

  const res = await fetch(
    `http://localhost:5140/addUserEvent?username=${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
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
