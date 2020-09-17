import React, { Component, createElement } from 'react';
import ResponseContext from '../../ResponseContext'
import TextComponent from './TextComponent';
import LongComponent from './LongComponent';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';
import CheckboxComponent from './CheckboxComponent';
import NumberComponent from './NumberComponent';
import PhoneComponent from './PhoneComponent';
import EmailComponent from './EmailComponent';
import NameComponent from './NameComponent';
import CustomComponent from './CustomComponent';
import CompanyComponent from './CompanyComponent';

type SectionProps = {
    id:number,
    title: string,
    components: any,
}

type Components = {
    sectionid:number,
    type: string,
    title: string,
    isReq: boolean,
    value: string,
    props: any
}

type ResponseType = {
    id: number,
    value: string,
    name: string,
    isReq: boolean,
    error: string
}

type SectionType = {
    id: number,
    responses: Array<ResponseType>
}

const ComponentsMap: Map<string, any> = new Map();
ComponentsMap.set("text",TextComponent);
ComponentsMap.set("long",LongComponent);
ComponentsMap.set("choice",RadioComponent);
ComponentsMap.set("dropdown",SelectComponent);
ComponentsMap.set("multiple",CheckboxComponent);
ComponentsMap.set("number", NumberComponent);
ComponentsMap.set("phone", PhoneComponent);
ComponentsMap.set("email", EmailComponent);
ComponentsMap.set("company", CompanyComponent);
ComponentsMap.set("name", NameComponent);
ComponentsMap.set("custom", CustomComponent);

export default class FormSection extends Component<SectionProps> {
    componentDidMount() {
        let newSection: SectionType = {
            id:this.props.id,
            responses:[]
        }
        this.props.components.map((value: any, index: number) => {
            let newResponse = {
                id: index,
                name: value.value,
                title: value.title,
                value: "",
                error: "",
                isReq: false
            }
            if (value.props.defaultValue) {
                newResponse["value"] = value.props.defaultValue
            } else {
                newResponse["value"] = ""
            }
            if (value.isReq) {
                newResponse["isReq"] = value.isReq
            }
            newSection.responses.splice(index, 0, newResponse)
            return ("")
        })

        let context = { ...this.context }
        context.responses.splice(this.props.id, 0, newSection)
        this.context.setResponses(context.responses)

    }

    renderComponents = (components: Array<Components>) => {
        return (components.map(
            (value, index) => {
                if (ComponentsMap.has(value.type)) {
                    return (
                        createElement(
                            ComponentsMap.get(value.type), {
                            sectionid:this.props.id,
                            key: index,
                            type: value.type,
                            title: value.title,
                            isReq: value.isReq,
                            value: value.value,
                            properties: value.props,
                            id: index
                        }
                        )
                    )
                }

                return (
                    <h1 key={index}>There is an Invalid Component!</h1>
                )

            }
        ))
    }


    render() {
        return (
            <div className="box py-1 my-5">
                <p className="is-size-5 has-text-left has-text-weight-bold my-2">{this.props.title}</p>
                {this.context.responses.length?this.renderComponents(this.props.components):""}
            </div>
        )
    }
}

FormSection.contextType = ResponseContext;