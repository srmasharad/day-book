import { Component, ReactNode } from "react";

import ErrorBoundaryMessage from "@/components/common/ErrorBoundaryMessage";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  statusCode: number | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      statusCode: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    let statusCode = 0;
    if (error.message === "Request failed with status code 403") {
      statusCode = 403;
    }
    return { hasError: true, statusCode };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.state.statusCode === 403) {
        return (
          <ErrorBoundaryMessage statusCode="403" title="Sorry! Access Denied">
            You do not have permission to access this resource
          </ErrorBoundaryMessage>
        );
      } else {
        return (
          <ErrorBoundaryMessage
            statusCode="500"
            title="Sorry! Something went wrong"
          >
            We're experencing an internal server problem
          </ErrorBoundaryMessage>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
