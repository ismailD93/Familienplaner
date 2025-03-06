import classNames from "classnames";
import Link from "next/link";
import React, { ReactNode, forwardRef } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  link?: string;
  label: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  variant?: "blue" | "blue-outline" | "dark-blue";
  size?: "16" | "14";
  icon?: ReactNode;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      link,
      target,
      disabled,
      className,
      rel,
      variant = "blue",
      size = "16",
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classNames(className, {
          "w-max": !className?.includes("w-"),
        })}
      >
        {!!link && (
          <Link href={link} target={target} rel={rel}>
            <InnerButton {...rest} variant={variant} size={size} />
          </Link>
        )}
        {!link && (
          <button ref={ref} className="w-full" disabled={disabled} {...rest}>
            <InnerButton
              variant={variant}
              size={size}
              disabled={disabled}
              {...rest}
            />
          </button>
        )}
      </div>
    );
  }
);

export default Button;

const InnerButton = ({
  label,
  variant,
  size,
  disabled,
  icon,
}: {
  label: Props["label"];
  variant?: Props["variant"];
  size: Props["size"];
  disabled?: Props["disabled"];
  icon?: Props["icon"];
}) => {
  return (
    <div
      className={classNames(
        "flex w-full flex-row items-center border rounded-lg",
        {
          "bg-blue hover:bg-blue/70 text-white-80":
            variant === "blue" && !disabled,
          "bg-[#172838] hover:bg-blue text-white-80":
            variant === "dark-blue" && !disabled,
          "bg-white-80 hover:bg-blue/80 text-blue hover:text-white-80 border-blue":
            variant === "blue-outline" && !disabled,
        }
      )}
    >
      <div className="flex w-full flex-col items-center">
        <div
          className={classNames({
            "text-button px-6 py-4": size === "16",
            "text-button-small px-4 py-2": size === "14",
            "justify-between flex flex-row items-center py-[15px] pl-5 pr-4":
              icon,
          })}
        >
          {label}
          {!!icon && <div className="ml-2">{icon}</div>}
        </div>
      </div>
    </div>
  );
};
