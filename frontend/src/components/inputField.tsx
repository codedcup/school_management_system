import { Typography, Select, Input } from "@material-tailwind/react";
import { FC, ReactNode, ChangeEvent, useEffect } from "react";

type Props = {
  label?: string;
  type?: "Input" | "Textarea" | "Select" | "Checkbox";
  onChange?: (value: any) => void;
  name?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  children?: ReactNode;
};

const InputField: FC<Props> = ({
  type: inputType = "Input",
  children,
  label = "Label",
  placeholder = "",
  name,
  error,
  value ="",
  onChange = () => {},
}) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const renderField = () => {
    if (inputType === "Select") {
      return (
        <>
          <Typography className="font-semibold mb-1 pl-1">{label}</Typography>
          <Select
            className="border-2 border-b-2 border-gray-400 pt-2 px-3 focus:border-gray-900 rounded-lg"
            value={value}
            labelProps={{ className: "hidden" }}
            onChange={(val: string) => onChange(val)}
          >
            {children}
          </Select>
        </>
      );
    }

    // Default: Input Field
    return (
      <>
        <Typography className="font-semibold mb-1 pl-1">{label}</Typography>
        <Input
          variant="static"
          className="border-2 border-b-2 border-gray-400 pt-2 px-3 focus:border-gray-900 rounded-lg"
          value={value}
          name={name}
          placeholder={placeholder}
          labelProps={{ className: "hidden" }}
          onChange={handleInputChange}
        />
      </>
    );
  };

  return (
    <div>
      {renderField()}
      {error && (
        <Typography className="pl-1 text-red-600 text-sm mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default InputField;
