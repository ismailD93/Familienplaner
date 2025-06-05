import classNames from "classnames";
import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
  wrapperClassName?: string;
}

export const CheckboxInput: FC<Props> = ({
  error,
  wrapperClassName,
  checked,
  title,
  placeholder,
  ...rest
}) => {
  const [reactiveError, setReactiveError] = useState<string>();
  useEffect(() => {
    setReactiveError(error);
  }, [error]);
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => setIsChecked(checked), [checked]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={classNames(
        "flex h-max cursor-pointer flex-row gap-4 w-fit",
        wrapperClassName
      )}
      onClick={() => {
        inputRef.current?.click();
        setIsChecked((prev) => !prev);
      }}
    >
      <div
        className={classNames(
          "flex h-7 w-7 items-center justify-center border border-gray/30 rounded-lg",
          {
            "border border-orange": !!reactiveError,
          },
          rest.className
        )}
      >
        {isChecked && <FaCheck />}
      </div>
      {title && <p className="text-16 my-auto text-black-60">{title}</p>}
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          rest.onChange?.(e);
        }}
        placeholder={placeholder}
        className="hidden"
      />
    </div>
  );
};

export default CheckboxInput;
