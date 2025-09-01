const Button = ({ type = "button", onClick, children, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;