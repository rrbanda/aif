import { Bullseye, Spinner } from "@patternfly/react-core";

export interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <Bullseye>
      <Spinner aria-label={message} />
    </Bullseye>
  );
}
