"use client";
import { FC, useState } from "react";
import Button from "./Button";
import CreateFamilyForm from "./forms/CreateFamilyForm";
import JoinFamilyForm from "./forms/JoinFamilyForm";
import { Logo } from "../icons/Logo";

interface Props {
  name?: string;
}

const CreateOrJoinCalender: FC<Props> = () => {
  const [open, setOpen] = useState<"join" | "create" | undefined>(undefined);

  return (
    <div className=" mt-12 px-3 md:px-20 md:ml-2.5">
      <div className="text-center w-full flex items-center -ml-2.5">
        <Logo className="size-16" />{" "}
        <div className="text-52 mt-auto font-bold text-blue !leading-none">
          UMI
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <span className="md:text-20 lg:text-24 font-bold">
          Ein Plan für die ganze Familie
        </span>
      </div>
      <div className="text-18 mt-5 mb-10">
        Sie sind noch keiner Familie beigetreten. Bitte erstellen Sie eine
        Familie oder treten sie einer bei.
      </div>
      <div className="flex max-md:flex-col gap-2">
        <Button
          disabled={open === "join"}
          onClick={() => setOpen("join")}
          size="14"
          variant="dark-blue"
          label="Familie beitreten"
        />
        <Button
          disabled={open === "create"}
          onClick={() => setOpen("create")}
          size="14"
          variant="dark-blue"
          label="Familie erstellen"
        />
      </div>

      <div className="mt-10">
        {open === "create" && <CreateFamilyForm />}

        {open === "join" && <JoinFamilyForm />}
      </div>
    </div>
  );
};

export default CreateOrJoinCalender;
