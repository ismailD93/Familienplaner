import { format } from "date-fns";

export const createEvent = async (
  username: string,
  values: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  }
) => {
  const formatedStartDate = format(values.startDate, "yyyy-MM-dd");
  const formatedEndDate = format(values.endDate, "yyyy-MM-dd");
  const parsedStartDate = `${formatedStartDate}T${values.startTime}:00.195Z`;
  const parsedEndDate = `${formatedEndDate}T${values.endTime}:00.195Z`;

  const create = await fetch(
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
  if (create.status === 404) {
    return undefined;
  } else {
    return await create.json();
  }
};
