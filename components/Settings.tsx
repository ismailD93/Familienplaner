"use client";
import { FC, useState } from "react";
import { User } from "../types";
import colors from "../colors/colors.json";

interface SettingsProps {
  members: User[];
}

const Settings: FC<SettingsProps> = ({ members }) => {
  const [color, setColor] = useState<string>();
  console.log(color);
  return (
    <div className="p-10">
      <div>
        <span className="text-20 font-bold">Mitglieder Einstellungen</span>

        <div className="mt-10 grid grid-cols-3">
          {members?.map((item, index) => {
            if (!item) return null;
            return (
              <div key={`${item.name}-${item.id}`}>
                <div>{item.name}</div>
                <select
                  value={color}
                  className="w-full px-3 py-2 border border-black-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  {colors.map((option) => (
                    <option
                      className={`text-[${option.value}]`}
                      key={`${index}_${item.id}-${option.value}`}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
