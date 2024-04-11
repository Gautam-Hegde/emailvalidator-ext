import { useState } from "react";
import axios, { AxiosError } from "axios";
import ValidationResponse from "./ValidationResponse";

function App() {
  const [emails, setEmails] = useState("");
  const [validationResponse, setValidationResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useSmtpCheck, setUseSmtpCheck] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidation = async () => {
    setIsLoading(true);
    try {
      let url = useSmtpCheck
        ? "https://dry-plains-00116-5dd51a1d43b4.herokuapp.com/checksmtp"
        : "https://dry-plains-00116-5dd51a1d43b4.herokuapp.com/check";

      const response = await axios.post(url, emails, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      setValidationResponse(response.data);
      setError(null);
    } catch (error) {
      if ((error as AxiosError).response?.status === 429) {
        // Explicitly cast error to AxiosError
        setError("Too many requests. You are being rate limited!😥 Please try again later.");
      } else {
        setError("Validation error. Please try again later.");
      }
      console.error("Validation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[400px] w-[400px] rounded-xl">
      <div className="bg-white shadow-lg rounded-md p-6 max-w-lg h-auto">
        {error ? (
          <div className="text-red-600 font-medium">{error}</div>
        ) : validationResponse ? (
          <ValidationResponse response={validationResponse} />
        ) : (
          <>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={useSmtpCheck}
                onChange={() => setUseSmtpCheck(!useSmtpCheck)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-zinc-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {useSmtpCheck ? "SMTP Check enabled" : "Enable SMTP Check"}
              </span>
            </label>
            <label
              htmlFor="emails"
              className="block mt-4 mb-2 text-lg font-semibold text-gray-700"
            >
              Enter emails to validate 🧪
            </label>
            <textarea
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={3}
              className="block w-full p-2 text-sm text-zinc-700 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Johndoe@gmail.com
gautam@example.com
invaildemail@faker.com"
            />
            <button
              type="button"
              onClick={handleValidation}
              className="mt-4 w-full py-2 px-4 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Check"
              )}
            </button>
          </>
        )}
        <div className="flex items-center justify-center">
          <a
            href="https://twitter.com/GautamHegde12"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 1668.56 1221.19"
              viewBox="0 0 1668.56 1221.19"
              className="w-6 h-6 fill-current text-zinc-800"
            >
              <path
                d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                transform="translate(52.39 -25.059)"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
