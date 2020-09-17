import React, { Component } from 'react';
import ResponseContext from '../../ResponseContext'



type CheckboxComponentProps = {
    sectionid: number,
    id: number,
    title: string,
    isReq: boolean,
    value: string,
    properties: any
}

export default class CheckboxComponent extends Component<CheckboxComponentProps> {
    handleValue = (value: string) => {
        let context = { ...this.context }
        var arr = context.responses[this.props.sectionid].responses[this.props.id].value.split(",")
            var idx = arr.indexOf(value)
            if(idx>-1){
                arr.splice(idx,1)
            }else{
                arr.push(value)
            }
        context.responses[this.props.sectionid].responses[this.props.id].value = arr.toString()
        if (this.props.isReq && (value === "" || value === null)) {
            context.responses[this.props.sectionid].responses[this.props.id].error = "This is a required field!"
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
                {this.props.properties.options.map((value: any, index: number) => {
                    return(<div key={index} className="control ">
                        <label className="radio">
                        <input type="checkbox" id={value.title} name={this.props.value} value={value.value} defaultChecked={value.checked} onChange={(e) => this.handleValue(e.target.value)} />
                        <span>{value.title}</span>
                    </label>
                    </div>)
                })}
                <p className="help is-danger">{this.context.responses[this.props.sectionid].responses[this.props.id].error}</p>
            </div>
        )
    }
}

CheckboxComponent.contextType = ResponseContext;