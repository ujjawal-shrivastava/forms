import React from 'react'

export default function FormError(props: { errorMsg?: string, bgColor?: string, errorIcon?: string }) {
    return (
        <div className="box px-0 py-0 is-clipped customError">
            <div className="py-1 px-1" style={{ display: "flex", flexDirection:"row",alignItems:"center", justifyContent:"center", width: "100%", minHeight: "3rem", background: `${props.bgColor || "#3d3d3d"}` }}>
                <p className="has-text-weight-semibold is-size-6 has-text-white">
                    <span className="icon mx-1" style={{color:`${props.bgColor || "#fffffff"}`}}>
                        <i className="fa fa-exclamation-triangle"></i>
                    </span>
                    {props.errorMsg?.toUpperCase()}
                </p>
            </div>
        </div>
    )
}
