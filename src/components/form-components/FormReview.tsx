import React from 'react'
import ReviewResponse from './ReviewResponse';

export default function FormReview(props: any) {
    const [isActive, setActive] = props.isActive
    const data = props.data
    const handleClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setActive(false)
    }
    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card" style={{ maxWidth: "90%", maxHeight: "80%" }}>
                <header className="modal-card-head px-4 py-2">
                    <h1 className="has-text-weight-bold has-text-dark is-size-5"><span className="icon is-small has-text-dark mr-2"><i className="fa fa-eye key"></i></span>&nbsp;Review Input</h1>
                </header>

                <section className="modal-card-body py-2">
                    {
                        Object.keys(data).map((key, i) => (
                            <ReviewResponse key={i} heading={key} body={data[key]} />
                        ))
                    }
                </section>
                <footer className="modal-card-foot py-2 px-2">
                    <button className="button is-link has-text-weight-bold" onClick={handleClose}>Close</button>
                </footer>
            </div>
        </div>
    )
}
