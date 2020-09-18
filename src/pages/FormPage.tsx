import React, { useState } from 'react';
import Footer from '../components/Footer';
import PageWrap from '../components/PageWrap';
import Loader from '../components/Loader';
import FormHeader from '../components/FormHeader';
import FormSubmit from '../components/form-components/FormSubmit';
import FormSection from '../components/form-components/FormSection';
import NotFound from '../components/NotFound';
import { useQuery, gql, useMutation } from '@apollo/client'
import Msgpack from 'msgpack-lite';
import { decode as bdecode } from 'base65536';
import FormClose from '../components/form-components/FormClose';
import Submitted from '../components/form-components/Submitted';
import ResponseContext from '../ResponseContext'
import FormError from '../components/form-components/FormError';
import FormReview from '../components/form-components/FormReview';
const FORM = gql`
  query form($formid:String!) {
    form(formid:$formid) {
      formid
      title
      description
      data
      author
      bgtheme
      open
      verified
    }

  }
`;

const SUBMIT = gql`
  mutation addResponse($formid:String!, $data:String!) {
    addResponse(formid:$formid, data:$data){
        responseid
        data
        formid
        added
    }
  }
`;

type ResponseType = {
    id: number,
    title:string,
    value: string,
    name: string,
    isReq: boolean,
    error: string
}

type SectionType = {
    id: number,
    responses: Array<ResponseType>
}
var initialSec: SectionType[] = [];
const initialResponse = { responses: initialSec, setResponses: (responses: any) => { } };
const submitRes :any={}
export default function FormPage(props: any) {
    const [submitted, setSubmitted] = useState(false)
    const [reviewActive, setReviewActive] = useState(false)
    const [reviewData, setReviewData] = useState(submitRes)
    const { data, loading: formLoading, error } = useQuery(FORM, { errorPolicy: 'all', fetchPolicy: 'network-only', variables: { formid: props.match.params.id } })
    // eslint-disable-next-line
    const [submitForm, { data:submitData, loading: submitLoading, error:submitError }] = useMutation(SUBMIT, { errorPolicy: 'all'})
    const setResponses = (responses: any) => {
        setResponse({ ...response, responses: responses });
    }

    const [formError, setFormError] = useState("")

    const [response, setResponse] = useState({ ...initialResponse, setResponses: setResponses });

    if (formLoading) return (<Loader />)
    if (error) {
        if (error.message === "Form does not exist!") return (<NotFound
            code="404"
            title="Form Not Found!"
            labelColor="#eb3b5a"
            desc="The form you requested does not exist. The form is removed or the link is broken."
        />)
        else return (<NotFound />)
    }
    if (submitError) {
        return (<NotFound
            code="500"
            title="Error submitting response!"
            labelColor="#eb3b5a"
            desc="We're facing issues! The form is closed or is not avaialable anymore."
        />)
    }

    document.body.style.backgroundColor = data.form.bgtheme;
    document.title = data.form.title + " - DeForm";

    const newResponse = () => {
        window.location.href = `${window.location.pathname}`
    }

    const checkErrors = () => {
        for (var sec of response.responses) {
            for (var res of sec.responses) {
                if (res["error"] !== null && res["error"] !== "")
                    return false;
            }
        }
        return true;
    }

    const checkEmpty = () => {
        var newRes = { ...response }
        for (var sec of response.responses) {
            for (var res of sec.responses) {
                if (res["isReq"] === true && (res["value"] === null || res["value"] === "")) {
                    newRes.responses[sec.id].responses[res.id].error = "This is a required field!"
                    response.setResponses(newRes.responses)
                    return false;
                }
            }

        }
        return true;
    }

    const reset = () => {
        setFormError("")
        var newRes = { ...response }
        for (var sec of response.responses) {
            for (var res of sec.responses) {
                newRes.responses[sec.id].responses[res.id].error = ""
                response.setResponses(newRes.responses)

            }

        }
    }

    const submit = (e: any) => {
        e.preventDefault()
        if (!checkErrors()) {
            setFormError("Please resolve all the input errors!")
            return
        }
        else if (!checkEmpty()) {
            setFormError("Please fill all the required fields!")
            return
        } else {
            setFormError("")
            const finalRes: any = {}
            for (var sec of response.responses) {
                for (var res of sec.responses) {
                    finalRes[res.name] = res.value
                }
            }
            submitForm({variables:{formid:data.form.formid, data:JSON.stringify(finalRes)}}).then((submitData)=>{
                setSubmitted(true)
                reset()
                setResponse({ ...initialResponse, setResponses: setResponses })
            })
            
        }
    }

    const review = () => {
        const reviewRes:any={}
        for (var sec of response.responses) {
            for (var res of sec.responses) {
                reviewRes[res.title] = res.value
            }

        }
        for (var resKey of Object.keys(submitRes)) {
            console.log(`${resKey} : ${submitRes[resKey]}`)
        }
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.position = 'fixed';
        setReviewData(reviewRes)
        setReviewActive(true)

    }

    return (
        <ResponseContext.Provider value={response} >
            <div>
                {reviewActive?<FormReview isActive={[reviewActive, setReviewActive]} data={reviewData}/>:""}
                <PageWrap>
                    <form name={`form-${data.form.formid}`} onSubmit={(e) => { submit(e) }} onReset={() => { reset() }}>

                        <FormHeader title={data.form.title} description={data.form.description} formid={data.form.formid} author={data.form.author} verified={data.form.verified} />
                        {formError ? <FormError errorMsg={formError} /> : ""}
                        {submitted ? <Submitted newResponse={newResponse} /> : (data.form.data && data.form.open) ? <div className="container" id="form">
                            {Msgpack.decode(bdecode(data.form.data)).map((value: any, index: number) => {
                                return (
                                    <FormSection id={index} key={index} title={value.title} components={value.components} />
                                )
                            })}
                        </div> : <FormClose />}
                        {formError && (Msgpack.decode(bdecode(data.form.data)).length > 1) ? <FormError errorMsg={formError} /> : ""}
                        {data.form.open && !submitted ? <FormSubmit review={review} loading={submitLoading}/> : ""}
                    </form>
                </PageWrap>
                <Footer />
            </div>
        </ResponseContext.Provider>
    )
}