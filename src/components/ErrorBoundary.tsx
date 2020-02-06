import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
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