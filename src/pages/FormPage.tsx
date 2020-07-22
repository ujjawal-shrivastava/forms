import React, { useState } from 'react';
import Footer from '../components/Footer';
import PageWrap from '../components/PageWrap';
import Loader from '../components/Loader';
import * as data from '../form-data.json';
import FormHeader from '../components/FormHeader';
import FormSubmit from '../components/form-components/FormSubmit';
import FormSection from '../components/form-components/FormSection';


type Form = {
    formid: string,
    title: string,
    description: string,
    author: string,
    bgtheme: string,
    isOpen: boolean,
    error: string,
    sections: Array<Section>
}

type Section= {
    title: string,
    components: Array<Components>
}

type Components= {
    type: string,
    title: string,
    isReq: boolean,
    properties:any
    
}



export default function FormPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //const [data, setData] = useState();
    //const [response, setResponse] = useState({});
    
    if (loading) return (<Loader />)
    if (error) return (<h1>Form Not Found!</h1>)
    document.body.style.backgroundColor = data.bgtheme;
    document.title = data.title + " | Forms";
    return (
        <div>
            <PageWrap>
                <FormHeader title={data.title} description={data.description} formid={data.formid} author={data.author} />
                <div className="container" id="form">
                    {data.sections.map((value, index) => {
                        return (
                            <FormSection key={index} title={value.title} components={value.components}/>
                        )
                    })}
                </div>
                <FormSubmit />
            </PageWrap>
            <Footer />
        </div>
    )
}