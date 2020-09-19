import React from 'react';

export default function Footer(){

    return(
        <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <span className="footer-span is-size-7 has-text-weight-light">This content is neither created nor endorsed by the&nbsp;
              <u><a className="is-link footer-span " href="mailto: deform.website@gmail.com" target="_blank" rel="noopener noreferrer">Developer</a></u>.</span>
            <br />
            <strong className="is-size-4 logo-font">DeForm</strong>
          </p>
        </div>
      </footer>
    )
}