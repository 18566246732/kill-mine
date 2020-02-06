import React, { Suspense} from "react";
import PropType from 'prop-types';
import { ErrorBoundary } from "./ErrorBoundary";
import {  } from "./Homepage";

const Timer = React.lazy(() => import('./Timer'));

const propTypes = {
    controller: PropType.object,
    handleTopBtnClick: PropType.func,
    handleBottomBtnClick: PropType.func,
    selectLevel: PropType.func,
    handleRadioChange: PropType.func
}

type Props = {
    controller,
    handleTopBtnClick,
    handleBottomBtnClick,
    handleRadioChange,
    selectLevel
}

const Controller = ({
    controller,
    handleTopBtnClick,
    handleBottomBtnClick,
    handleRadioChange,
    selectLevel
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
            <div className="row align-items-center justify-content-between radio-group">
                {
                    controller.radios.map((item, index) => {
                        return (
                            <span key={index}>
                                <label htmlFor={item.value}
                                    style={{ cursor: 'pointer' }}
                                    className={ controller.isDisabled ? 'disable' : '' }>
                                    <input disabled={controller.isDisabled}
                                        type="radio"
                                        id={item.value}
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
            </div>
            <h4 className="row">提示：</h4>
            <div className="row text-left">
                <p>1. 游戏未开始时，方块不可点击</p>
                <p>2. 点击 “开始游戏” 游戏开始计时, 游戏在进行中时无法切换难度</p>
            </div>
            <div className="row btn-group">
                <button className={`btn btn-block btn-${controller.btnColor}`} onClick={() => handleTopBtnClick(controller)}>
                    {controller.btnText}
                </button>
                <button className="btn-danger btn btn-block" onClick={() => handleBottomBtnClick(controller)}>结束游戏</button>
            </div>
        </div >
    </div >
    )
}

Controller.propTypes = propTypes;

export default Controller;