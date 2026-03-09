import { Alert } from "@patternfly/react-core";

export interface ErrorMessageProps {
  title?: string;
  message: string;
  children?: React.ReactNode;
}

export default function ErrorMessage({
  title = "Error",
  message,
  children,
}: ErrorMessageProps) {
  return (
    <Alert variant="danger" title={title}>
      {message}
      {children}
    </Alert>
  );
}
