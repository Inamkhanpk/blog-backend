import useAuthForm from "../../../hooks/useAuthForm";
import InputField from "../../../components/ui/InputField/InputField";
import Button from "../../../components/ui/Button/Button";
export default function Register() {
  const { formData, handleChange, handleSubmit, error, loading } =
    useAuthForm("register");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Create Account
          </h2>

          <div className="space-y-4">
            <InputField
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 shadow-sm">
                {error}
              </div>
            )}

            <Button type="submit" onClick={handleSubmit}>
              {" "}
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
