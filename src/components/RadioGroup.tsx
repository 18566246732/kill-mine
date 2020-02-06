import React, { Component } from "react";

class RadioGroup extends Component {
    constructor() {

    }
    render() {
        return (
            <div className="row align-items-center justify-content-between radio-group">
                {
                    this.state.controller.radios.map((item, index) => {
                        return (
                            <span key={index}>
                                <label htmlFor={item.value}
                                    style={{ cursor: 'pointer' }}
                                    className={ this.state.controller.isDisabled ? 'disable' : '' }>
                                    <input disabled={this.state.controller.isDisabled}
                                        type="radio"
                                        id={item.value}
                                        value={item.value}
                                        checked={+item.value === +this.state.controller.picked}
                                        onChange={(e) => {
                                            console.log(e, 'e-----', e.type);
                                            
                                            // TODO: why ?
                                            e.persist();

                                            const newController = Object.assign({}, this.state.controller, {picked: e.target.value});

                                            this.setState({
                                                controller: newController
                                            })
                                            this.state.fsm.reset(newController)
                                        }}
                                        style={{ cursor: 'pointer' }} />
                                    {item.type}
                                </label>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}