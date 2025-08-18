import React from 'react'
import './cta.css'
import Link from 'next/link'

const CTA2 = () => {
    return (
        <div className='cta-div2'>
            <div className='cta-text'>
                <h2> AI Analysis for Every Git Repository</h2>
                <p>Chat with your repo like a teammate, get instant summaries and explanations, 
                and understand every branch and commit in context</p>
                {/* <p>Get instant context with AI summaries on every pull request,<br/> helping your team save time on code reviews.</p> */}
                <button><Link href = "/demo">Try it out</Link> </button>
            </div>
            <div className="git-div">
                <div className="git-heading">
                    <p>
                        Bug Identifier </p> <button>Bot</button>
                   
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

export default CTA2