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
  variant?: "black" | "dark-green" | "green" | "outline" | "white";
  size?: "16" | "14";
  icon?: ReactNode;
  roundedBottom?: boolean;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      link,
      target,
      disabled,
      className,
      roundedBottom,
      rel,
      variant = "black",
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
            <InnerButton
              roundedBottom={roundedBottom}
              {...rest}
              variant={variant}
              size={size}
            />
          </Link>
        )}
        {!link && (
          <button ref={ref} className="w-full" disabled={disabled} {...rest}>
            <InnerButton
              roundedBottom={roundedBottom}
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
  roundedBottom,
}: {
  roundedBottom: Props["roundedBottom"];
  label: Props["label"];
  variant?: Props["variant"];
  size: Props["size"];
  disabled?: Props["disabled"];
  icon?: Props["icon"];
}) => {
  return (
    <div
      className={classNames("flex w-full flex-row items-center border", {
        "rounded-full": !roundedBottom,
        "rounded-b": roundedBottom,
        "bg-black hover:bg-black-90 text-white border-black hover:border-black-90":
          variant === "black" && !disabled,
        "bg-green hover:bg-black-90 text-white border-green hover:border-black-90":
          variant === "dark-green" && !disabled,
        "bg-green-light hover:bg-black-90 text-white border-green-light hover:border-black-90":
          variant === "green" && !disabled,
        "border-black hover:border-green hover:text-green":
          variant === "outline" && !disabled,
        "border-white text-white": variant === "white" && !disabled,
        "border-black-60 text-black-60": variant === "outline" && disabled,
        "text-black-90 bg-black-40 border-black-40":
          variant !== "outline" && disabled,
      })}
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
          {!!icon && <div className="ml-6">{icon}</div>}
        </div>
      </div>
    </div>
  );
};
