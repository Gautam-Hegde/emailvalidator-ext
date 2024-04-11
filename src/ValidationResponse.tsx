import { useState } from "react";

interface EmailValidationResponse {
  email: string;
  reachable: string;
  syntax: { username: string; domain: string; valid: boolean };
  smtp: {
    host_exists: boolean;
    full_inbox: boolean;
    catch_all: boolean;
    deliverable: boolean;
    disabled: boolean;
  };
  gravatar: any;
  suggestion: string;
  disposable: boolean;
  role_account: boolean;
  free: boolean;
  has_mx_records: boolean;
}

interface ValidationResponseProps {
  response: EmailValidationResponse[];
}

function ValidationResponse({ response }: ValidationResponseProps) {
  const [showValidEmails, setShowValidEmails] = useState(false);
  const [showUnknownEmails, setShowUnknownEmails] = useState(false);
  const [showInvalidEmails, setShowInvalidEmails] = useState(false);

  const validEmails = response.filter((result) => result.reachable === "yes");
  const unknownEmails = response.filter(
    (result) => result.reachable === "unknown"
  );
  const invalidEmails = response.filter(
    (result) => !result.syntax.valid && result.reachable !== "unknown"
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white text-zinc-700 rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-medium mb-6 text-center">Validation Results👽</h2>
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowValidEmails(!showValidEmails)}
          >
            <h3 className="font-medium text-green-500">
              Valid Emails ({validEmails.length})
            </h3>
            <span className="text-gray-500">{showValidEmails ? "-" : "+"}</span>
          </div>
          {showValidEmails && (
            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
              {validEmails.map((validationResult, index) => (
                <div key={index} className="border-b border-gray-300 pb-2">
                  <p>Email: {validationResult.email}</p>
                  <p className="text-green-500 font-semibold">
                    Reachable: {validationResult.reachable}
                  </p>
                  <p>
                    Syntax:{" "}
                    <span className="font-medium">
                      {JSON.stringify(validationResult.syntax)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowUnknownEmails(!showUnknownEmails)}
          >
            <h3 className="font-medium text-yellow-500">
              Unknown Emails ({unknownEmails.length})
            </h3>
            <span className="text-gray-500">
              {showUnknownEmails ? "-" : "+"}
            </span>
          </div>
          {showUnknownEmails && (
            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
              {unknownEmails.map((validationResult, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-600 pb-2"
                >
                  <p>Email: {validationResult.email}</p>
                  <p className="text-yellow-500 font-semibold">Reachable: {validationResult.reachable}</p>
                  <p>
                    Syntax:{" "}
                    <span className="font-medium">
                      {JSON.stringify(validationResult.syntax)}
                    </span>
                  </p>
                  <p className="text-green-500 font-semibold">
                    Mx Records:{" "}
                    <span className="font-medium text-green-500">
                      {JSON.stringify(validationResult.has_mx_records)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowInvalidEmails(!showInvalidEmails)}
          >
            <h3 className="font-medium text-red-500">
              Invalid Emails ({invalidEmails.length})
            </h3>
            <span className="text-gray-500">
              {showInvalidEmails ? "-" : "+"}
            </span>
          </div>
          {showInvalidEmails && (
            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
              {invalidEmails.map((validationResult, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-600 pb-2"
                >
                  <p>Email: {validationResult.email}</p>
                  <p>Reachable: {validationResult.reachable}</p>
                  <p>
                    Syntax:{" "}
                    <span className="font-medium">
                      {JSON.stringify(validationResult.syntax)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="text-sm font-semibold flex justify-start mt-4">
        <p>
          Note: <span className="text-yellow-500">unknown</span> means that the
          server does not allow real-time verification of an email right now, or
          the email provider is a{" "}
          <span className="text-red-500">catch-all</span> email server.
        </p>
      </div>
    </div>
  );
}

export default ValidationResponse;
