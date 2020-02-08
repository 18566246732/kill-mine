import PlaygroudMaker from './playGroudMaker'

const StateMachine = require('javascript-state-machine');
const playgroudMaker = new PlaygroudMaker()

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
        onTransition(fsm) {
            console.log(fsm, 'fsm------------');
        },
        onReset(fsm, state, setState, callback) {
            console.log('------>executing reset');

            const { bricks, totalBomb } = playgroudMaker.createBricks(state.picked);
            const controller = {};
            controller.bricks = bricks
            controller.remainingBombs = totalBomb
            controller.nonBombBrickNum = bricks.length - totalBomb
            controller.isDisabled = false
            controller.counter = 0
            controller.btnText = '开始游戏'
            controller.btnColor = 'primary'
            setState(controller);

            clearTimeout(state.timer)
            if(callback) callback()

            console.log('<------game init');
        },
        onBreak(fsm, state, setState, callback) {
            console.log('------>executing break');

            clearTimeout(state.timer)
            const controller = {};
            controller.timer = null;
            controller.btnText = '继续游戏'
            controller.btnColor = 'warning'
            setState(controller);
            if(callback) callback()

            console.log('<------game pausing');
        },
        onResume(fsm, state, setState, callback) {
            console.log('------>executing resume');
            const controller = {};
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            if (callback) callback()
            
            console.log('<------game on');
        },
        onStart(fsm, state, setState, callback) {
            console.log('------>executing start');
            const controller = {};
            controller.isDisabled = true
            controller.counter = 0
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            if(callback) callback()
            
            console.log('<------game on');
        },
        onFinish(fsm, state, setState, callback) {
            console.log('------>executing finish');
            const controller = {};
            controller.isDisabled = true
            controller.btnText = '重新开始'
            controller.btnColor = 'secondary'
            setState(controller);
            clearTimeout(state.timer)
            if(callback) callback()
            
            console.log('<------game over');
        },
        onRestart(fsm, state, setState, callback) {
            console.log('------>executing restart');

            const { bricks, totalBomb } = playgroudMaker.createBricks(state.picked)
            const controller = {};
            controller.bricks = bricks
            controller.remainingBombs = totalBomb
            controller.nonBombBrickNum = bricks.length - totalBomb
            controller.isDisabled = true
            controller.counter = 0
            controller.btnText = '暂停游戏'
            controller.btnColor = 'success'
            setState(controller);
            if(callback) callback()
            
            console.log('<------game restart');
        }
    }
});