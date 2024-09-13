interface LabelInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  defaultValue?: string | number;
}

function LabelandInput({
  label,
  id,
  type,
  name,
  defaultValue,
}: LabelInputProps) {
  return (
    <div className="formDiv">
      <label htmlFor={id} className="mt-2 font-medium mr-1 text-nowrap">
        {label}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        required
        defaultValue={defaultValue}
        className="p-2 w-full border border-gray-400 rounded-md shadow-sm"
      />
    </div>
  );
}

export default LabelandInput;
