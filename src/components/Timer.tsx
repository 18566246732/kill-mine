import React, { Component } from "react";
import { FsmContext } from "./context";
import { connect } from "react-redux";
import { reducerAction } from "../redux/action/reducer";
let timer = null;

class Timer extends Component {
    static contextType = FsmContext;
    constructor(props, context) {
        
        super(props, context);
        this.state = {
            counter: 0,
        };
        this.startTimer = this.startTimer.bind(this);
    }
    init() {
    }
    componentDidMount() {
    }
    componentDidUpdate(...args) {
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        switch (nextContext.fsm.state) {
            case 'on':
                this.startTimer();
                break;
            case 'pause':
                clearTimeout(timer);
                // throw new Error('oops...');
                break;
            case 'init':
                this.setState({
                    counter: 0
                })
                clearTimeout(timer);
                break;
            case 'over':
                clearTimeout(timer);
                break;
            default:
                break;
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    startTimer() {

        timer = setTimeout(() => {
            this.setState({
                counter: this.state.counter + 1
            })
            this.startTimer()
        }, 1000)
    }
    render() {
        return [
            <div key={1}>
                <span>持续时间: <span>{this.state.counter} </span>秒</span>
            </div>,
            // <div key={2}>test: {this.props.reducers.coinNum}</div>,
            // <button onClick={this.props.increase} key={3}>change test</button>
        ];
    }
}

const mapStateToProps = state => {
    console.log(state, 'state');
    
    return {
        reducers: state.reducers
    }
};

const mapDispatchToProps = dispath => ({
    increase: () => dispath(reducerAction.increase())
})

// export default ReactDelayRender({delay: 3000})(Timer);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);
