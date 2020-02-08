import React from "react";
import PropType from 'prop-types';
import Flag from "../assets/flag.png";
import Mine from "../assets/mine.png";
import { State } from "./Homepage";
import { Brick } from "./playGroudMaker";

const propTypes = {
    controller: PropType.object,
    handleTopBtnClick: PropType.func,
    handleBottomBtnClick: PropType.func,
    selectLevel: PropType.func,
    handleRadioChange: PropType.func
}

interface Props extends React.Props<any> {
    controller: State,
    getMaxWidth: (bricks: Brick[], BRICK_BASIS: number) => string,
    getPointerEvents: () => 'auto' | 'none',
    handleClick: (state: State, brick: Brick, index: number) => number,
    handleRightClick: (e: React.MouseEvent, item: Brick) => void
}

const Controller = ({
    controller,
    getMaxWidth,
    getPointerEvents,
    handleClick,
    handleRightClick
}: Props) => {
    return (
        <div className="playground" style={{ maxWidth: getMaxWidth(controller.bricks, 40), pointerEvents: getPointerEvents() }}>
            {
                controller.bricks.map((item, index) => {
                    return (
                        <span className={`brick ${item.protection ? 'protection' : ''}`}
                            key={index}
                            onClick={() => handleClick(controller, item, index)}
                            onContextMenu={(e) => handleRightClick(e, item)}>
                            {item.tagged && <img src={Flag} alt="fl-ag" />}
                            {item.bombNum === -1 ? <img src={Mine} alt="fl-ag" className="mine"/> : <span >{item.bombNum ? item.bombNum : ''}</span>}
                        </span>
                    )
                })
            }
        </div>
    )
}

// Controller.defaultProps = defaultProps;
Controller.propTypes = propTypes;

export default Controller;