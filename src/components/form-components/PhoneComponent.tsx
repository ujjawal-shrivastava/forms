import React, { Component } from 'react';
import ResponseContext from '../../ResponseContext'



type PhoneComponentProps = {
    sectionid: number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class PhoneComponent extends Component<PhoneComponentProps> {
    handleValue = (value: string) => {
        let regex = /^[0-9]{10}$/
        let context = { ...this.context }
        context.responses[this.props.sectionid].responses[this.props.id].value = value
        context.responses[this.props.sectionid].responses[this.props.id].error = regex.test(value) ? "" : this.props.properties.error
        if (this.props.isReq && (value === "" || value === null)) {
            context.responses[this.props.sectionid].responses[this.props.id].error = "This is a required field!"
        }
        this.context.setResponses(context.responses)
    }

    render() {
        return (
            <div>
            <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
            <div className={`field mt-2 has-addons ${this.context.responses[this.props.sectionid].responses[this.props.id].error ? "mb-1" : "mb-4"}`}>
                
                <div className="control">
                    <p className="button is-static">
                        +91
                    </p>
                </div>
                <div className="control ">
                    <input required={this.props.isReq} className={`input ${this.context.responses[this.props.sectionid].responses[this.props.id].error ? "is-danger" : ""}`} type="number" placeholder={this.props.properties.placeholder || this.props.title} defaultValue={this.props.properties.defaultValue || ""} onChange={(e) => this.handleValue(e.target.value)} />
                </div>
            </div>
            <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>
        )
    }
}

PhoneComponent.contextType = ResponseContext;