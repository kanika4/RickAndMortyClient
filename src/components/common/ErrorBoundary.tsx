import React from 'react';

type Props = {
  fallbackUI: React.ReactChild,
  children: Array<React.ReactChild>
}

type State = {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    console.log(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallbackUI;
    else return this.props.children;
  }
}
