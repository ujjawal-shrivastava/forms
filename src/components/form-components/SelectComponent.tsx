import React, { Component } from 'react';
import ResponseContext from '../../ResponseContext'



type SelectComponentProps = {
    sectionid: number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class SelectComponent extends Component<SelectComponentProps> {
    handleValue = (value: string) => {
        let context = { ...this.context }
        context.responses[this.props.sectionid].responses[this.props.id].value = value
        if (this.props.isReq && (value === "" || value === null)) {
            context.responses[this.props.sectionid].responses[this.props.id].error = "This is a required field!"
        }else{
            context.responses[this.props.sectionid].responses[this.props.id].error = ""
        }
        this.context.setResponses(context.responses)
    }

    render() {
        return (
            <div className="field my-4">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="select">
                    <select defaultValue={this.context.responses[this.props.sectionid].responses[this.props.id].value} required={this.props.isReq}  name={this.props.value} id={this.props.value} onChange={(e) => this.handleValue(e.target.value)}>
                    <option disabled={this.props.isReq} value=""> Select an option </option>
                    {this.props.properties.options.map((value: any, index: number) => {
                    return(
                    <option key={index} value={value.value}>{value.title}</option>
                        )
                })}
                    </select>
                </div>
                <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>
        )
    }
}

SelectComponent.contextType = ResponseContext;