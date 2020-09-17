import React from 'react'
import { Link } from 'react-router-dom'

export default function FormClose() {
    return (
        <div className="container mt-5">
            <div className="box">
                <div className="closeContent has-text-centered">
                    <span className="icon has-text-danger is-large is-size-1 my-3">
                        <i className="fa fa-exclamation-circle"></i>
                    </span>
                    <h1 className="is-size-5 has-text-weight-bold has-text-danger">FORM CLOSED</h1>
                    <p className="my-4 is-size-6 has-text-weight-light has-text-grey-whiter">
                        This form is currently not accepting any responses. Contact the form owner for more information.
                    </p>
                    
                    <Link to="/" className="mt-5 button is-dark is-fullwidth">
                        <span className="has-text-weight-bold">DeForm</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
