import PlaygroudMaker from './playGroudMaker'
import { State } from './Homepage';

const StateMachine = require('javascript-state-machine');
const playgroudMaker = new PlaygroudMaker()

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export default new StateMachine({
    init: 'over',
    transitions: [
        {name: 'start', from: 'init', to: 'on'},
        {name: 'reset', from: 'on' ,to: 'init'},
        {name: 'break', from: 'on', to: 'pause'},
        {name: 'finish', from: 'on', to: 'over'},
        {name: 'reset', from: 'pause', to: 'init'},
        {name: 'resume', from: 'pause', to: 'on'},
        {name: 'restart', from: 'over', to: 'on'},
        {name: 'reset', from: 'over', to: 'init'},
        {name: 'reset', from: 'init', to: 'init'},
    ],
    methods: {
        onTransition(fsm: any) {
            // console.log(fsm, 'fsm------------');
        },
        onReset(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing reset');

            const { bricks, totalBomb } = playgroudMaker.createBricks(state.picked);
            const controller = {} as Partial<Writeable<State>>;
            controller.bricks = bricks
            controller.remainingBombs = totalBomb
            controller.nonBombBrickNum = bricks.length - totalBomb
            controller.isDisabled = false
            controller.counter = 0
            controller.btnText = '开始游戏'
            controller.btnColor = 'primary'
            setState(controller);

            clearTimeout(state.timer)

            console.log('<------game init');
        },
        onBreak(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing break');

            clearTimeout(state.timer)
            const controller = {} as Partial<Writeable<State>>;
            controller.btnText = '继续游戏'
            controller.btnColor = 'warning'
            setState(controller);

            console.log('<------game pausing');
        },
        onResume(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing resume');
            const controller = {} as Partial<Writeable<State>>;
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            
            console.log('<------game on');
        },
        onStart(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing start');
            const controller = {} as Partial<Writeable<State>>;
            controller.isDisabled = true
            controller.counter = 0
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            
            console.log('<------game on');
        },
        onFinish(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing finish');
            const controller = {} as Partial<Writeable<State>>;
            controller.isDisabled = true
            controller.btnText = '重新开始'
            controller.btnColor = 'secondary'
            setState(controller);
            clearTimeout(state.timer)
            
            console.log('<------game over');
        },
        onRestart(fsm: any, state: State, setState: (state: any) => void) {
            console.log('------>executing restart');

            const { bricks, totalBomb } = playgroudMaker.createBricks(state.picked)
            const controller = {} as Partial<Writeable<State>>;
            controller.bricks = bricks
            controller.remainingBombs = totalBomb
            controller.nonBombBrickNum = bricks.length - totalBomb
            controller.isDisabled = true
            controller.counter = 0
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            
            console.log('<------game restart');
        }
    }
});