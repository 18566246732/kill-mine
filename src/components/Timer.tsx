import React, { Component } from "react";
import { FsmContext, ContextProps } from "./context";

let timer: NodeJS.Timeout = setTimeout(() => {}, 0);
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
        console.log('props received', nextContext);
        
        switch (nextContext.fsm.state) {
            case 'on':
                clearTimeout(timer);
                this.startTimer();
                break;
            case 'pause':
                clearTimeout(timer);
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
            // <button onClick={this.props.reducers} key={3}>change test</button>
        ];
    }
}

// const mapStateToProps = (state: ReduxState) => {
//     return {
//         reducers: state.totalGame
//     }
// };

// const mapDispatchToProps = (dispath: Dispatch<{type: string}>) => ({
//     increase: () => dispath(reducerAction.increase())
// })

// // export default ReactDelayRender({delay: 3000})(Timer);
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Timer);

export default Timer;
