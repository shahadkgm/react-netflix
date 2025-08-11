import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignInForm = () => {
  const { login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });
    setSubmitError("");

    if (emailErr || passErr) return;

    try {
      isSignup ? await signup(email, password) : await login(email, password);
    } catch (err) {
      setSubmitError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-black bg-opacity-75 p-12 rounded-md">
      <h2 className="text-3xl font-medium mb-8 text-white">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>

      {submitError && (
        <p className="text-red-500 text-sm mb-4">{submitError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-300 border-0 focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-orange-500"
            }`}
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full p-4 pr-12 rounded-md bg-gray-700 text-white placeholder-gray-300 border-0 focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-500" : "focus:ring-orange-500"
            }`}
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              
              <FaRegEye className="w-5 h-5" />
            ) : (
              
              < FaEyeSlash  className="w-5 h-5"/>
              
            )}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 transition-colors rounded-md text-white font-medium text-lg mt-6"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm">OR</span>
      </div>

      <button
        type="button"
        className="w-full py-3 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-colors rounded-md text-white font-medium text-sm mt-4"
      >
        Use a sign-in code
      </button>

      <div className="text-center mt-4">
        <a href="#" className="text-white hover:underline text-sm">
          Forgot password?
        </a>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="remember"
          className="mr-2 w-4 h-4 text-white bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember" className="text-white text-sm">
          Remember me
        </label>
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        {isSignup ? "Already have an account?" : "New to Netflix?"}{" "}
        <button
          type="button"
          className="text-white hover:underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setSubmitError("");
          }}
        >
          {isSignup ? "Sign in" : "Sign up now"}
        </button>
      </p>

      <p className="mt-4 text-xs text-gray-400 leading-relaxed">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Learn more
        </a>
      </p>
    </div>
  );
};

export default SignInForm;