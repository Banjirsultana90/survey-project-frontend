import React from 'react';

const Question = () => {
    
    return (
        <>

            <div >
                <h2 className='text-5xl font-bold text-center my-5'>Frequently Asked Questions</h2>
                <div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium text-center">
                        How do I participate in surveys?
                    </div>
                    <div className="collapse-content">
                        <p>To participate, simply log in to your account, browse available surveys, and click on the survey you'd like to take. Follow the instructions provided within the survey.</p>
                    </div>
                </div><div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium text-center">
                        Are the surveys anonymous?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, most surveys are anonymous unless explicitly stated otherwise. Your responses are confidential and only used for research or statistical purposes.</p>
                    </div>
                </div><div className="collapse bg-base-200">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-xl font-medium text-center">
                        How are survey results used?
                    </div>
                    <div className="collapse-content">
                        <p>Survey results are used to gather insights, analyze trends, and make data-driven decisions. They might be used for academic research, product development, or improving services.</p>
                    </div>
                </div>
            </div>

        </>

    );
};

export default Question;