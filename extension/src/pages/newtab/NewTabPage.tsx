import React from "react";
import { useAuthStore } from "../../store/authStore";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
import Dashboard from "../../components/Dashboard";

const NewTabPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [showLogin, setShowLogin] = React.useState(true);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="text-3xl font-bold">Stratos</h1>
            <p className="mt-1">Your Browser Super Powers</p>
          </div>

          {showLogin ? (
            <div>
              <LoginForm />
              <div className="text-center p-4">
                <p>
                  Don't have an account?{" "}
                  <span
                    className="auth-link"
                    onClick={() => setShowLogin(false)}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <SignupForm />
              <div className="text-center p-4">
                <p>
                  Already have an account?{" "}
                  <span
                    className="auth-link"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewTabPage;
