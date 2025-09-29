import Input from "./input";

type EditableInputProps = {
  isEditing: boolean;
  value: string | null;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function EditableInputProps({
  isEditing,
  value,
  name,
  placeholder,
  required,
  onChange,
  type = "",
}: EditableInputProps) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-4 items-start">
      <label htmlFor={name} className="text-gray-500">
        {placeholder}:
      </label>
      {isEditing ? (
        type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder || name}
            required={required}
            className="p-2 col-span-4 md:col-span-9 border border-gray-500 rounded max-w-2xl"
          />
        ) : (
          <Input
            name={name}
            type={type}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder || name}
            required={required}
            className="col-span-4 md:col-span-9 max-w-2xl"
          />
        )
      ) : (
        <p className={`${!value ? "text-gray-500 italic" : ""} p-2 col-span-4 md:col-span-9`}>
          {value || "N/A"}
        </p>
      )}
    </div>
  );
}
