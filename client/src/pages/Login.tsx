import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginPage,
  LoginForm,
  Alert,
  AlertVariant,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLoginButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const loginFormError = error ? (
    <Alert
      variant={AlertVariant.danger}
      title={error}
      customIcon={<ExclamationCircleIcon />}
      className="pf-v6-u-mb-md"
    />
  ) : null;

  return (
    <LoginPage
      loginTitle="AI Factory"
      loginSubtitle="Sign in to access the program"
    >
      {loginFormError}
      <LoginForm
        usernameLabel="Username"
        usernameValue={username}
        onChangeUsername={(_e, value) => setUsername(value)}
        passwordLabel="Password"
        passwordValue={password}
        onChangePassword={(_e, value) => setPassword(value)}
        onLoginButtonClick={handleLoginButtonClick}
        isLoginButtonDisabled={loading}
        loginButtonLabel={loading ? "Signing in..." : "Sign in"}
      />
    </LoginPage>
  );
}
