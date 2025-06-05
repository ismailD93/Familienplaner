"use client";
import { FC } from "react";
import { User } from "../types";
import colors from "../colors/colors.json";
import DropdownInput from "./DropdownInput";
import { changeUserColor } from "../app/fetchMethods/changeUserColor";
import { useRouter } from "next/navigation";

interface SettingsProps {
  members: User[];
  userToken: string;
}

const Settings: FC<SettingsProps> = ({ members, userToken }) => {
  const router = useRouter();
  return (
    <div className="p-4 md:p-10">
      <div>
        <span className="text-20 font-bold">Mitglieder Einstellungen</span>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members?.map((item, index) => {
            if (!item) return null;
            console.log(item.color);
            return (
              <div className="flex flex-col gap-y-2" key={index}>
                <div className="text-18">{item.name}</div>
                <DropdownInput
                  name="color"
                  label="Farbe"
                  size="16"
                  selectedValue={item.color}
                  options={colors || []}
                  touched
                  color
                  onChange={async (value) => {
                    await changeUserColor(userToken, item.id, value.value);
                    router.refresh();
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
