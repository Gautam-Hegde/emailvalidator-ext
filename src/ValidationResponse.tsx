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
  const [openCollapse, setOpenCollapse] = useState<number | null>(null);

  const validEmails = response.filter((result) => result.reachable === "yes");
  const unknownEmails = response.filter(
    (result) => result.reachable === "unknown"
  );
  const invalidEmails = response.filter(
    (result) => !result.syntax.valid && result.reachable !== "unknown"
  );

  const toggleCollapse = (index: number) => {
    setOpenCollapse(openCollapse === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white text-zinc-700 rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-medium mb-6 mt-2 text-center">Validation Results👽</h2>

        {/* Valid Emails Collapse */}
        <div className="collapse bg-base-200 mb-4">
          <input
            type="checkbox"
            checked={openCollapse === 0}
            onChange={() => toggleCollapse(0)}
          />
          <div className="collapse-title text-xl font-medium text-green-500">
            Valid Emails ({validEmails.length})
          </div>
          <div className="collapse-content">
            {validEmails.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {validEmails.map((validationResult, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-2"
                  >
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
            ) : (
              <p className="text-center py-4">No valid emails found.</p>
            )}
          </div>
        </div>

        {/* Unknown Emails Collapse */}
        <div className="collapse bg-base-200 mb-4">
          <input
            type="checkbox"
            checked={openCollapse === 1}
            onChange={() => toggleCollapse(1)}
          />
          <div className="collapse-title text-xl font-medium text-yellow-500">
            Unknown Emails ({unknownEmails.length})
          </div>
          <div className="collapse-content">
            {unknownEmails.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {unknownEmails.map((validationResult, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-2"
                  >
                    <p>Email: {validationResult.email}</p>
                    <p className="text-yellow-500 font-semibold">
                      Reachable: {validationResult.reachable}
                    </p>
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
            ) : (
              <p className="text-center py-4">No unknown emails found.</p>
            )}
          </div>
        </div>

        {/* Invalid Emails Collapse */}
        <div className="collapse bg-base-200 mb-4">
          <input
            type="checkbox"
            checked={openCollapse === 2}
            onChange={() => toggleCollapse(2)}
          />
          <div className="collapse-title text-xl font-medium text-red-500">
            Invalid Emails ({invalidEmails.length})
          </div>
          <div className="collapse-content">
            {invalidEmails.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {invalidEmails.map((validationResult, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-2"
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
            ) : (
              <p className="text-center py-4">No invalid emails found.</p>
            )}
          </div>
        </div>

        <div className="text-sm font-semibold flex justify-start mt-4 p-2">
          <p>
            Note: <span className="text-yellow-500">unknown</span> means that the
            server does not allow real-time verification of an email right now, or
            the email provider is a{" "}
            <span className="text-red-500">catch-all</span> email server.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ValidationResponse;