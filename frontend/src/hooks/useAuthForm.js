// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

// export default function useAuthForm(apiFn) {
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (payload) => {
//     setError(null);
//     setLoading(true);
//     try {
//       const res = await apiFn(payload);
//       if (res.token && res.user) {
//         login(res.user, res.token);
//         res.user.role === "author" ? nav("/author") : nav("/admin");
//       } else {
//         setError(res.message || "Request failed");
//       }
//     } catch (err) {
//       setError(err.message || "Request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, handleSubmit };
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; // your existing auth hook
import { loginApi, registerApi } from "../api/authApi";

export default function useAuthForm(type = "login") {
  const { login } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let res;
      if (type === "login") {
        res = await loginApi(formData.email, formData.password);
      } else {
        res = await registerApi(formData);
      }

      if (res.token && res.user) {
        login(res.user, res.token);
        res.user.role === "author" ? nav("/author") : nav("/admin");
      } else {
        setError(res.message || (type === "login" ? "Invalid login" : "Registration failed"));
      }
    } catch (err) {
      setError(err.message || "⚠️ Server not responding. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
}