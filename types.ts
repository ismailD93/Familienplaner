export type Status = "online" | "offline" | "pending";

export type User = {
  id: string;
  name: string;
  status: Status;
  role?: "admin";
};
