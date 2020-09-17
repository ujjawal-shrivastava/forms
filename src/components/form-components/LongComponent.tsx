import React, { Component } from 'react';
import ResponseContext from '../../ResponseContext'

type LongComponentProps = {
    sectionid:number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class LongComponent extends Component<LongComponentProps> {
    handleValue = (value: string) => {
        let context = { ...this.context }
        context.responses[this.props.sectionid].responses[this.props.id].value = value
        if(this.props.isReq && (value==="" || value===null)){
            context.responses[this.props.sectionid].responses[this.props.id].error = "This is a required field!"
        }
        else if(value.length < this.props.properties.min){
            context.responses[this.props.sectionid].responses[this.props.id].error = `Please fill at least ${this.props.properties.min} characters!`
        }
        else{
            context.responses[this.props.sectionid].responses[this.props.id].error = ""
        }
        this.context.setResponses(context.responses)
    }

    render() {
        return (
            <div className="field my-4">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control ">
                    <textarea maxLength={this.props.properties.max} required={this.props.isReq} className={`textarea ${this.context.responses[this.props.sectionid].responses[this.props.id].error? "is-danger" : ""}`}  placeholder={this.props.properties.placeholder || this.props.title} defaultValue={this.props.properties.defaultValue || ""} onChange={(e) => this.handleValue(e.target.value)} />
                </div>
                <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>
        )
    }
}
LongComponent.contextType = ResponseContext;