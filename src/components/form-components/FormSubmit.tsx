import React from 'react';

export default function FormSubmit(props: any) {

  return (
    <div className="container mt-5" id="form-submit">
      <div className="box">
        {/*<div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" />
              <span>I agree to the <a href="/terms" target="_blank">terms and conditions</a>.</span>
            </label>
          </div>
        </div>*/}
        <div className="field is-grouped">
          <div className="control">
            <input type="submit" className="button is-link" value={props.loading?"Submitting...":"Submit"} disabled={props.loading}/>
          </div>
          <div className="control">
            <p className="button is-link is-light" onClick={props.loading?(()=>{}):props.review}>Review</p>
          </div>
          <div className="control">
            <input type="reset" className="button is-link is-light" value="Clear" disabled={props.loading}/>
          </div>
        </div>
      </div>
    </div>
  )
}