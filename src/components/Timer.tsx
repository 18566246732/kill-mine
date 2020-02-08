import React, { Component, Dispatch } from "react";
import { FsmContext, ContextProps } from "./context";
import { connect } from "react-redux";
import { reducerAction } from "../redux/action/reducer";
import { ReduxState } from "../redux/store";

let timer: null | NodeJS.Timeout = null;
const initialState = {
    counter: 0,
};

type State = Readonly<typeof initialState>;

class Timer extends Component {
    static contextType = FsmContext;
    state: State = initialState;
    init() {
    }
    componentDidMount() {
        this.startTimer = this.startTimer.bind(this);
    }
    componentDidUpdate() {
    }

    UNSAFE_componentWillReceiveProps(nextProps: React.Props<any>, nextContext: ContextProps) {
        console.log('props received');
        
        switch (nextContext.fsm.state) {
            case 'on':
                console.log('on------');
                
                this.startTimer();
                break;
            case 'pause':
                timer && clearTimeout(timer);
                break;
            case 'init':
                this.setState({
                    counter: 0
                })
                timer && clearTimeout(timer);
                break;
            case 'over':
                timer && clearTimeout(timer);
                break;
            default:
                break;
        }
    }
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return true;
    // }
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

const mapStateToProps = (state: ReduxState) => {
    return {
        reducers: state.reducers
    }
};

const mapDispatchToProps = (dispath: Dispatch<{type: string}>) => ({
    increase: () => dispath(reducerAction.increase())
})

// export default ReactDelayRender({delay: 3000})(Timer);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);
