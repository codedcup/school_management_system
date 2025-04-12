import { Typography, Select, Input } from "@material-tailwind/react";
import { FC, ReactNode, ChangeEvent, useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

type Props = {
  label?: string;
  type?: "Input" | "Textarea" | "Select" | "Checkbox" | "datepicker";
  onChange?: (value: any) => void;
  name?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  children?: ReactNode;
  required?:boolean;
};



const InputField: FC<Props> = ({
  type: inputType = "Input",
  children,
  required,
  label = "Label",
  placeholder = "",
  name,
  error,
  value = "",
  onChange = () => {},
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const labelElement =()=>{
    return <Typography className="font-semibold mb-1 pl-1">{label}  {required && <span className="text-red-600">*</span> }</Typography>

  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const renderField = () => {
    if (inputType === "Select") {
      return (
        <>
          {labelElement()}
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

    if (inputType === "datepicker") {
      return (
        <>
           {labelElement() }         
          <div className="relative" ref={pickerRef}>
            <Input
              readOnly
              value={value ? format(new Date(value), "yyyy-MM-dd") : ""}
              onClick={() => setShowPicker(!showPicker)}
              placeholder={placeholder}
              variant="static"
              className="border-2 border-b-2 border-gray-400 pb-4 px-3 focus:border-gray-900 rounded-lg cursor-pointer"
            />
            {showPicker && (
              <div className="absolute z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      onChange(format(date, "yyyy-MM-dd"));
                      setShowPicker(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </>
      );
    }

    // Default input type
    return (
      <>
          {labelElement() }         
          <Input
          variant="static"
          className="border-2 border-b-2 border-gray-400 pb-4 px-3 focus:border-gray-900 rounded-lg"
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
    <div className="mb-4">
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
