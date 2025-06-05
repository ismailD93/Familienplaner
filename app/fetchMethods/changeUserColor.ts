export const changeUserColor = async (
  token: string,
  userId: string,
  color: string
) => {
  try {
    const response = await fetch(
      `http://localhost:5140/api/account/setColor/${userId}?color=${encodeURIComponent(
        color
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to change color: ${response.status}`);
      return undefined;
    }

    return response;
  } catch (error) {
    console.error("Error changing color:", error);
    return undefined;
  }
};
