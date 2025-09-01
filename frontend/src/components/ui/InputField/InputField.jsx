const InputField = ({ type = "text", value, onChange, placeholder, name }) => {
  return (
    <input
    name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
    />
  );
};

export default InputField;

