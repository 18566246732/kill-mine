import React, { Component, Profiler } from 'react';
import fsm from './fsm';
import Controller from "./Controller";
import PlayGroud from "./PlayGroud";
import { Brick } from "./playGroudMaker";
import { FsmContext } from "./context";

export type Radio = {
    value: number,
    type: string
}

const initialState = {
    picked: 10,
    radios: [
        {
            value: 10,
            type: '初级',
        },
        {
            value: 15,
            type: '中级',
        },
        {
            value: 20,
            type: '高级'
        }
    ],
    timer: setTimeout(() => {}, 0),
    counter: 0,
    isDisabled: false,
    btnText: '开始游戏',
    btnColor: 'primary',
    remainingBombs: 0,
    nonBombBrickNum: 99,
    bricks: [{
        bombNum: 0,
        tagged: false,
        protection: false
    }]
};

// 让类型有唯一源头
export type State = Readonly<typeof initialState>;

export class Homepage extends Component {
    readonly state: State = initialState;
    constructor(props: any) {
        super(props);
        this.onRenderCallback = this.onRenderCallback.bind(this);
    }
    handleClick(state: State, brick: Brick, index: number) {
        
        let { bricks, nonBombBrickNum } = state
        if (brick.tagged) return nonBombBrickNum // 已标记的不可点击
        if (brick.bombNum === -1) { // 失败，是雷的话取消所有保护层
            bricks.forEach(brick => {
                brick.protection = false
                brick.tagged = false
            })
            alert('失败！ 游戏结束')
            fsm.finish(this.state, this.setState.bind(this))
            return nonBombBrickNum
        }

        brick.protection = false

        nonBombBrickNum--
        if (brick.bombNum === 0) { // 雷数为0的开始向周围展开
            nonBombBrickNum = this.wildOpen(bricks, index, nonBombBrickNum)
        }
        
        this.setState({
            nonBombBrickNum
        })
        return nonBombBrickNum
    }
    wildOpen(bricks: Brick[], index: number, nonBombBrickNum: number) {
        const row = Math.sqrt(bricks.length) // 每行块数
        const nullArr = [index - row - 1, index - row, index - row + 1, index - 1, index + 1, index + row - 1, index + row, index + row + 1] // 点击块边界的下标

        // ======== 边界检查，上下边界可以通过块是否存在来检查
        if (index % row === 0) { //	左边界检查0,3,6
            nullArr.splice(5, 1)
            nullArr.splice(3, 1)
            nullArr.splice(0, 1)
        }

        if (index % row === row - 1) { //	右边界检查2,5,8
            nullArr.splice(7, 1)
            nullArr.splice(4, 1)
            nullArr.splice(2, 1)
        }

        let i = 0 // 边界迭代因子，分别迭代上，下，左，右
        while (i < nullArr.length) { // 点击块的边界处理
            const brick = bricks[nullArr[i]]
            if (brick && brick.protection === true) { // 如果块不存在(比如上下边界的时候)，并且当前的块已经打开，则不再检查
                if (brick.bombNum >= 0) { // 除雷外，一律取消保护层
                    brick.protection = false
                    nonBombBrickNum--
                }
                if (brick.bombNum === 0) {
                    nonBombBrickNum = this.wildOpen(bricks, nullArr[i], nonBombBrickNum)
                }
            }
            i++
        }
        return nonBombBrickNum
    }
    tagBrick(brick: Brick, remainingBombs: number) {
        if (brick && brick.protection) {
            if (brick.tagged) {
                brick.tagged = false
                remainingBombs++
                return remainingBombs
            }
            brick.tagged = true
            remainingBombs--
            return remainingBombs
        }
        brick.tagged = false
        return remainingBombs
    }
    handleTopBtnClick() {

        const stateActionMap: {[state: string]: any} = {
            over: {
                action: 'restart'
            },
            on: {
                action: 'break'
            },
            pause: {
                action: 'resume'
            },
            init: {
                action: 'start'
            }
        }
        const actionObj= stateActionMap[fsm.state];

        fsm[actionObj.action](this.state, this.setState.bind(this))
    }
    handleBottomBtnClick() {
        if (fsm.state !== 'init') {
            this.reset();
            // const res = this.reset(this.state, this.setState.bind(this));
            // // this.setState({controller});
            // return res;
        }
    }
    handleRightClick(e: React.MouseEvent, item: Brick) {
        e.preventDefault();
                                                
        // this.setState({
        //     controller: Object.assign({}, this.state.controller, {
        //         remainingBombs: this.tagBrick(item, this.state.controller.remainingBombs)
        //     })
        // })
        this.setState({
            remainingBombs: this.tagBrick(item, this.state.remainingBombs)
        })
    }
    getPointerEvents() {
        return fsm.state === 'on' ? 'auto' : 'none'
    }
    getMaxWidth(bricks: Brick[], BRICK_BASIS: number) {
        return Math.sqrt(bricks.length) * BRICK_BASIS + 'px';
    }
    handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            picked: e.target.value
        },() => this.reset())
    }
    reset() {
        fsm.reset(this.state, this.setState.bind(this));
    }
    componentDidMount() {
        this.reset()

        this.setState({
            controller: this.state
        })
    }
    onRenderCallback(...args: any) {
        // console.log(args, 'args');
    }
    render() {
        if (this.state.nonBombBrickNum === 0) {
            this.state.bricks.forEach(brick => {
                brick.protection = false
                brick.tagged = false
            });
            alert('恭喜你！ 已通过')
            fsm.finish(this.state, this.setState.bind(this))
        }
        
        return (
            <div className="container bg-info p-2 pt-4 text-white" style={{ paddingBottom: '40px !important' }}>
                <div className="row justify-content-center">
                    {/* <TestMemo /> */}
                    {/* <React.StrictMode> */}
                    <div style={{ fontSize: 0 }}>

                        <PlayGroud 
                        controller={this.state}
                        getMaxWidth={this.getMaxWidth.bind(this)}
                        getPointerEvents={this.getPointerEvents.bind(this)}
                        handleClick={this.handleClick.bind(this)}
                        handleRightClick={this.handleRightClick.bind(this)}/>

                    </div>
                    <Profiler onRender={this.onRenderCallback} id="Controller">
                        <FsmContext.Provider value={{fsm}}>
                            <Controller 
                                controller={this.state}
                                handleBottomBtnClick={this.handleBottomBtnClick.bind(this)}
                                handleTopBtnClick={this.handleTopBtnClick.bind(this)}
                                handleRadioChange={this.handleRadioChange.bind(this)}
                                >controller child</Controller>
                        </FsmContext.Provider>
                    </Profiler>
                    {/* </React.StrictMode> */}
                </div >
                {/* <Mouse render={mouse => <Cat mouse />}>
                </Mouse> */}
            </div >
        )
    }
}

// export default Homepage;