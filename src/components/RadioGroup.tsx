import React from "react";
import { State } from "./Homepage";

interface Props extends React.Props<any> {
    controller: State,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioGroup = ({
    controller,
    handleRadioChange
}: Props) => {
    return (<div className="row align-items-center justify-content-between radio-group">
        {
            controller.radios.map((item, index) => {
                return (
                    <span key={index}>
                        <label htmlFor={item.value.toString()}
                            style={{ cursor: 'pointer' }}
                            className={controller.isDisabled ? 'disable' : ''}>
                            <input disabled={controller.isDisabled}
                                type="radio"
                                id={item.value.toString()}
                                value={item.value}
                                checked={+item.value === +controller.picked}
                                onChange={(e) => handleRadioChange(e)}
                                style={{ cursor: 'pointer' }} />
                            {item.type}
                        </label>
                    </span>
                )
            })
        }
    </div>)
}