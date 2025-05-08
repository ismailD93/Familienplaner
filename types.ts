export type Status = "online" | "offline" | "pending";

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  status: Status;
  role?: "admin";
};

export type Event = {
  userId: string;
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  title: string;
};
