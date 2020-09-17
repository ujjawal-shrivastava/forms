import React, { Component } from 'react';
import ResponseContext  from '../../ResponseContext'



type NumberComponentProps = {
    sectionid:number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class NumberComponent extends Component<NumberComponentProps> {
    handleValue = (value: string) => {
        let regex = new RegExp(this.props.properties.validation)
        let context = { ...this.context }
        context.responses[this.props.sectionid].responses[this.props.id].value = value
        context.responses[this.props.sectionid].responses[this.props.id].error = regex.test(value) ? "" : this.props.properties.error
        if(this.props.isReq && (value==="" || value===null)){
            context.responses[this.props.sectionid].responses[this.props.id].error = "This is a required field!"
        }
        this.context.setResponses(context.responses)
    }

    render() {
        return (
            <div className="field my-4">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control ">
                    <input required={this.props.isReq} type="number" min={this.props.properties.min} max={this.props.properties.max} className={`input ${this.context.responses[this.props.sectionid].responses[this.props.id].error? "is-danger" : ""}`}  placeholder={this.props.properties.placeholder || this.props.title} defaultValue={this.props.properties.defaultValue || ""} onChange={(e) => this.handleValue(e.target.value)} />
                </div>
        <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>
        )
    }
}

NumberComponent.contextType = ResponseContext;