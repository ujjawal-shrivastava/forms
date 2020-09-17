import React, { Component } from 'react';
import ResponseContext from '../../ResponseContext'



type EmailComponentProps = {
    sectionid: number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class EmailComponent extends Component<EmailComponentProps> {
    handleValue = (value: string) => {
        //eslint-disable-next-line
        let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ///new RegExp(this.props.properties.validation)
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
            <div className="field my-4">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control has-icons-left ">
                    <input required={this.props.isReq} className={`input ${this.context.responses[this.props.sectionid].responses[this.props.id].error ? "is-danger" : ""}`} type="email" placeholder={this.props.properties.placeholder || this.props.title} defaultValue={this.props.properties.defaultValue || ""} onChange={(e) => this.handleValue(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                    </span>
                </div>
                <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>

        )
    }
}

EmailComponent.contextType = ResponseContext;