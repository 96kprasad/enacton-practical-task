interface Option {
  value: string;
  label: string;
}

interface SingleSelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export default function SingleSelectDropdown({ 
  value, 
  onChange, 
  options, 
  // placeholder = "Select option", 
  className = "" 
}: SingleSelectDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      {/* <option value="">{placeholder}</option> */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}