import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user, session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && session) {
      navigate("/");
    }
  }, [user, session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 translate-y-20">
      <h1 className="sprinkle text-5xl sm:text-7xl text-[#7B4B3A] text-center leading-tight mb-8">
        <span className="block">Hannah's Memories</span>
      </h1>

      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        {errorMsg && (
          <p className="text-red-600 text-center text-sm -mt-2">{errorMsg}</p>
        )}

        <label className="sprinkle text-[#7B4B3A] text-lg sm:text-xl">
          Email
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 rounded-xl border border-[#b18984] text-base sm:text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="sprinkle text-[#7B4B3A] text-lg sm:text-xl">
          Password
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 rounded-xl border border-[#b18984] text-base sm:text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-[#b18984] text-white sprinkle rounded-2xl text-2xl sm:text-3xl py-3 px-4 transition duration-100 hover:-translate-y-1 active:scale-95"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;