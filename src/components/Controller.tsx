import React, { Suspense} from "react";
import PropType from 'prop-types';
import { ErrorBoundary } from "./ErrorBoundary";
import { State } from "./Homepage";
import { RadioGroup } from "./RadioGroup";

const Timer = React.lazy(() => import('./Timer'));

const propTypes = {
    controller: PropType.object,
    handleTopBtnClick: PropType.func,
    handleBottomBtnClick: PropType.func,
    selectLevel: PropType.func,
    handleRadioChange: PropType.func
}

interface Props extends React.Props<any> {
    controller: State,
    handleTopBtnClick: () => void,
    handleBottomBtnClick: () => void,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Controller = ({
    controller,
    handleTopBtnClick,
    handleBottomBtnClick,
    handleRadioChange
}: Props) => {
    return (
    <div style={{ maxWidth: '250px' }} className="ml-4">
        <div className="setting-panel container">
            <div className="row justify-content-between">
                <span>剩余雷数: <span>{controller.remainingBombs} </span>个</span>
                    <ErrorBoundary>
                        <Suspense fallback={<div>loading...</div>}>
                            <Timer />
                        </Suspense>
                    </ErrorBoundary>
                {/* <span>持续时间: <span>{controller.counter} </span>秒</span> */}
            </div>
            <h4 className="row">难度选择：</h4>
            <RadioGroup 
                controller={controller}
                handleRadioChange={handleRadioChange}
                ></RadioGroup>
            {/* <div className="row align-items-center justify-content-between radio-group">
                {
                    controller.radios.map((item, index) => {
                        return (
                            <span key={index}>
                                <label htmlFor={item.value.toString()}
                                    style={{ cursor: 'pointer' }}
                                    className={ controller.isDisabled ? 'disable' : '' }>
                                    <input disabled={controller.isDisabled}
                                        type="radio"
                                        id={item.value.toString()}
                                        value={item.value}
                                        checked={+item.value === +controller.picked}
                                        onChange={(e) => {
                                            // TODO: why ?
                                            handleRadioChange(e)
                                        }}
                                        style={{ cursor: 'pointer' }} />
                                    {item.type}
                                </label>
                            </span>
                        )
                    })
                }
            </div> */}
            <h4 className="row">提示：</h4>
            <div className="row text-left">
                <p>1. 游戏未开始时，方块不可点击</p>
                <p>2. 点击 “开始游戏” 游戏开始计时, 游戏在进行中时无法切换难度</p>
            </div>
            <div className="row btn-group">
                <button className={`btn btn-block btn-${controller.btnColor}`} onClick={() => handleTopBtnClick()}>
                    {controller.btnText}
                </button>
                <button className="btn-danger btn btn-block" onClick={() => handleBottomBtnClick()}>结束游戏</button>
            </div>
        </div >
    </div >
    )
}

Controller.propTypes = propTypes;

export default Controller;