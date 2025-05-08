export const getUserByToken = async (token: string) => {
  const getUser = await fetch(
    `http://localhost:5140/api/account/getUserByToken?token=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "de",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (getUser.status === 404) {
    return undefined;
  } else {
    return await getUser.json();
  }
};
