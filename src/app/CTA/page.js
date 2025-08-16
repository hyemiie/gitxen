import React from 'react'
import './cta.css'

const CTA = () => {
    return (
        <div className='cta-div'>
            <div className='cta-text2'>
                <h2>Smart Bug Detection</h2>
                {/* <p>Get instant context with AI summaries on every pull request,<br/> helping your team save time on code reviews.</p> */}
                <p>Find logic errors, bad patterns, and performance slowdowns before they break your code</p>
                <button>Try it out </button>
            </div>
            <div className="git-div">
                <div className="git-heading">
                    <p>
                        Gitxen.ai <button>Bot</button>
                    </p>
                </div>
                <div className="git-content">
                    <h3>Added Support for Github Actions</h3>
                    <span className="span1">.</span>
                    <span className="span2">.</span>
                    <span className="span3">.</span>
                    <span className="span4">.</span>
                </div>
                <div className="git-content">
                    <h3>Features</h3>
                    <span className="span1">.</span>
                </div>
                {/* <div className="git-content">
                    <h3>Improvements</h3>
                    <span className="span3">.</span>
                </div> */}
            </div>
        </div>
    )
}

export default CTA