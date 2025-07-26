type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
};

export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className='text-sm castello-dark font-medium'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-castello-dark'
      />
    </div>
  );
}
