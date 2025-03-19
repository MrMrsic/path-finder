import React, { Component, ErrorInfo } from "react";
import styles from "./error-boundary.module.css";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorDetails: unknown;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorDetails: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true, errorDetails: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.styles}>
          <div className={styles.box}>
            <div className={styles.title}>Ups,.. something went wrong</div>
            <div className={styles.description}>
              We are really really sorry but something broke (and this site could look better)
            </div>
            <div className={styles.details}></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
