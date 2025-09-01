import useAuthForm from "../../../hooks/useAuthForm";
import InputField from "../../../components/ui/InputField/InputField";
import Button from "../../../components/ui/Button/Button";
export default function Login() {
 const { formData, handleChange, handleSubmit, error, loading } = useAuthForm("login");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 shadow-lg rounded-lg px-8 py-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Login
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            <InputField
              type="email"
               name="email"
              placeholder="Email"
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
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <Button type="submit"> {loading ? "Logging in..." : "Login"}</Button>
        </form>
      </div>
    </div>
  );
}
