import React from "react";

const initialState = {
    hasError: false
}

type State = Readonly<typeof initialState>;

export class ErrorBoundary extends React.Component {
    state: State = initialState;

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }
    componentDidCatch() {
        console.log('error happend')
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>error occurred</div>
            )
        }
        return this.props.children;
    }

}