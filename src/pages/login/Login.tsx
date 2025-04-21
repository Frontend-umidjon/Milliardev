import { useState } from "react";
import { Alert } from "antd";
import { motion } from "framer-motion";
import { useLoginMutation } from "../../redux/api/auth.api";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login success:", res);

      localStorage.setItem("access_token", res.data.access_token);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen login-bg grayscale-50">
      <div className="flex justify-center items-center login-bg-blur h-full w-full">
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Login
          </motion.h1>

          <motion.input
            type="email"
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* <motion.input
            type="password"
            className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          /> */}

          <div className="relative mb-6">
            <motion.input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <button
              type="button"
              className="absolute top-3.5 right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {isError && error && (
            <Alert
              message={
                "data" in error
                  ? (error.data as any)?.message || "Login xatosi!"
                  : "Login xatosi!"
              }
              style={{
                width: "100%",
                marginBottom: "1rem",
                background: "#2c1618",
                color: "white",
                border: "red",
              }}
              type="error"
            />
          )}

          <motion.button
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none disabled:bg-blue-400"
            onClick={handleLogin}
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
