"use client";

import classNames from "classnames";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type FC,
  type FocusEvent,
  type InputHTMLAttributes,
} from "react";

export interface InputComponentProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "classNames" | "defaultValue" | "size"
  > {
  name: string;
  label?: string;
  error?: string | false;
  value?: string;
  defaultValue?: string | number;
  location?: boolean;
  inputLabel?: string;
  type?:
    | "number"
    | "text"
    | "email"
    | "password"
    | "date"
    | "time"
    | "datetime-local";
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  touched?: boolean;
  size?: "18" | "16";
  isDate?: boolean;
  isSearch?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  variant?: "black-30" | "white";
}

const TextInput: FC<InputComponentProps> = ({
  label,
  name,
  error,
  value,
  onChange,
  type,
  defaultValue,
  touched,
  size = "18",
  readOnly,
  hidden,
  variant = "black-30",
  max,
  min,
  ...rest
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(!!value || !!defaultValue);
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(value ?? defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused || !!internalValue || internalValue === 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [internalValue, focused]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={classNames("w-full", { hidden: hidden })}
    >
      <div
        className={
          "relative flex w-full flex-col border border-blue rounded-lg"
        }
      >
        {label && (
          <div
            className={classNames(
              "absolute left-3 flex h-[52px] rounded-lg select-none items-center py-4 transition-all duration-200",
              {
                "top-0 md:-mt-1.5 -mt-2 text-14 md:text-12 text-black-90":
                  (hasValue || focused) && size === "16" && !readOnly,
                "top-0 -mt-2 text-14 text-black-90":
                  (hasValue || focused) && size === "18" && !readOnly,
                "text-red": error && touched,
                "text-black-70": !error || !touched,
                "opacity-30": readOnly,
              }
            )}
          >
            {label}
          </div>
        )}
        <div
          className={classNames("flex rounded-lg border", {
            "border-red": error && touched,
            "border-black-40": !error || !touched,
            "border-black-90": focused && !readOnly,
            "text-18 md:text-16": size === "16",
            "text-18": size === "18",
            "bg-black-30": variant === "black-30",
            "bg-white": variant == "white",
          })}
        >
          <input
            max={max}
            min={min}
            ref={inputRef}
            autoComplete=""
            className={classNames(
              "w-full outline-none rounded-lg h-text-input px-3 py-4",
              {
                "text-red": error && touched,
                "pt-[33px]": !!label && (hasValue || focused) && size === "16",
                "pt-9": !!label && (hasValue || focused) && size === "18",
                "bg-black-30": variant === "black-30",
                "bg-white": variant == "white",
              }
            )}
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={(event) => {
              onChange?.(event);
              setInternalValue(event.currentTarget.value);
            }}
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            readOnly={readOnly}
            defaultValue={defaultValue}
            {...rest}
          />
        </div>
      </div>
      {!!error && !!touched && (
        <span className="flex flex-col text-12 leading-4 text-red mt-1.5">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
