import React from 'react'

export default function ReviewResponse(props: any) {
    return (
        <div className="is-clipped" style={{ background: "#dcdde1", borderRadius: "5px 5px 5px 5px", margin: "2rem" }}>
            <div className="has-text-centered is-size-7 has-text-white is-uppercase py-2 px-2" style={{ background: "#3d3d3d", padding: "0.2rem", margin:"0.3rem", borderRadius: "5px 5px 5px 5px" }}>
                <h1 className="has-text-weight-bold">{props.heading}</h1>
            </div>
            <div className="has-text-centered is-size-6 has-text-weight-normal" style={{minHeight:"3rem", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <p>{props.body}</p>
            </div>
        </div>
    )
}

