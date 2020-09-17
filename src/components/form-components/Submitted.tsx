import React from 'react'
import { Link } from 'react-router-dom'

export default function Submitted(props: any) {
    return (
        <div className="container mt-5">
            <div className="box">
                <div className="closeContent has-text-centered">
                    <span className="icon has-text-success is-large is-size-1 my-3">
                        <i className="fa fa-check"></i>
                    </span>
                    <h1 className="is-size-5 has-text-weight-bold has-text-dark">FORM SUBMITTED</h1>
                    <p className="my-5 is-size-6 has-text-weight-light has-text-grey-whiter">
                        Your response has been successfully recorded and sent to the form owner. You can get this response data in the PDF format or submit another response.
                    </p>
                    <Link to="/" className="mt-5 button is-light is-fullwidth has-text-weight-bold">
                        <span className="icon is-size-7">
                            <i className="fa fa-file-pdf-o"></i>
                        </span> <span className="is-size-7">Generate PDF</span>
                    </Link>
                    <button onClick={props.newResponse} className="mt-2 button is-light is-fullwidth has-text-weight-bold">
                        <span className="icon is-size-7">
                            <i className="fa fa-plus"></i>
                        </span> <span className="is-size-7">New Response</span>
                    </button>
                    <Link to="/" className="mt-2 button is-dark is-fullwidth has-text-weight-bold">
                        <span className="is-size-7">DeForm</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
