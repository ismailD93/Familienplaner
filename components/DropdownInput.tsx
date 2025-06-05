import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

type DropdownItem = {
  label: string;
  value: string;
  [key: string]: string | number;
};

const DropdownInput: React.FC<{
  name?: string;
  color?: boolean;
  label?: string;
  options: DropdownItem[];
  error?: string;
  selectedValue?: string;
  selectedColorValue?: { label: string; value: string };
  touched?: boolean;
  readOnly?: boolean;
  size?: "18" | "16";
  variant?: "black-30" | "white";
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: DropdownItem) => void;
}> = ({
  name,
  label,
  options,
  error,
  selectedValue,
  touched,
  readOnly,
  size = "18",
  variant = "black-30",
  onChange,
  selectedColorValue,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | undefined>(
    options.find((item) => item.value === selectedValue)
  );
  const handleDropdown = (selectedValue: DropdownItem) => {
    setSelected(selectedValue);
    onChange?.(selectedValue);
    setIsOpen(false);
  };
  useEffect(() => {
    if (selected?.value === selectedValue) return;
    if (color) {
      return setSelected({
        value: selectedColorValue?.value || "",
        label: selectedColorValue?.label || "",
      });
    }
    const item = options.find((item) => item.value === selectedValue);
    setSelected(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);
  return (
    <div className="flex flex-col w-full">
      <div
        style={{
          borderColor: selectedValue || "#f2f3f3",
        }}
        className={classNames(
          `h-text-input relative select-none rounded border`,
          {
            "bg-black-30": variant === "black-30",
            "bg-white": variant == "white",
            "cursor-pointer": !readOnly,
            "border-orange": error && touched,
            "border-black-40": !error || !touched,
            "border-black-90": isOpen && !readOnly,
          }
        )}
      >
        <div
          className={classNames("h-full px-3", {
            "text-14": size === "16",
            "text-18": size === "18",
          })}
          onBlur={() => {
            if (readOnly) return;
            setIsOpen(false);
          }}
          tabIndex={0}
          onClick={() => {
            if (readOnly) return;
            setIsOpen(!isOpen);
          }}
        >
          <div className="my-auto flex h-full items-center">
            <div
              className={classNames(
                "absolute left-3 flex select-none items-center py-4 transition-all duration-200",
                {
                  "top-0 md:-mt-1.5 -mt-2 text-14 md:text-12 text-black-90":
                    selected && size === "16",
                  "top-0 -mt-2 text-14 text-black-90":
                    selected && size === "18",
                  hidden: selected && !label,
                  "text-orange": error && touched,
                  "text-black-70": !error || !touched,
                }
              )}
            >
              {label}
            </div>
            {!!selected && (
              <div className={classNames({ "mt-[17px]": !!label })}>
                {selected.label}
              </div>
            )}
            <IoChevronDownCircleOutline
              className={classNames(
                "absolute my-auto ml-1 right-3 transition-all duration-300 text-black",
                {
                  "rotate-180": isOpen,
                }
              )}
            />
            {isOpen && (
              <ul
                className={classNames(
                  "absolute max-h-50 overflow-y-auto overflow-x-hidden left-0 top-[100%] mt-[6px] z-[10] w-full rounded overflow-hidden shadow-dropdown",
                  {
                    "bg-black-30": variant === "black-30",
                    "bg-white": variant == "white",
                  }
                )}
              >
                {options.map((option, index) => {
                  if (!option.value) return;
                  return (
                    <li
                      key={index}
                      onClick={() => handleDropdown(option)}
                      className="hover:bg-blue-hover hover:font-semibold px-4"
                    >
                      <div
                        className={classNames("flex flex-col py-5", {
                          "border-b border-black/10":
                            index !== options.length - 1,
                        })}
                      >
                        {color ? (
                          <div className="flex w-full justify-between">
                            <span className="text-14">{option.label}</span>
                            <div
                              style={{
                                backgroundColor: option.value.toLocaleString(),
                              }}
                              className="h-5 w-12 bg-[${option.value}] mr-10"
                            ></div>
                          </div>
                        ) : (
                          <span> {option.label}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <input
        hidden
        name={name}
        readOnly
        value={selected?.value.toLocaleString() || ""}
      />
      {!!error && !!touched && (
        <span className="flex flex-col text-12 leading-4 text-orange mt-1.5">
          {error}
        </span>
      )}
    </div>
  );
};

export default DropdownInput;
