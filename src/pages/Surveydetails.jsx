
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData, useParams } from 'react-router-dom';
import useAxiosSecure from '../components/base/Useaxiossecure';

const SurveyDetails = () => {
    const { id } = useParams();
    const surveyDetails = useLoaderData();
    const axiosSecure=useAxiosSecure()
    const survey = surveyDetails.find((survey) => survey._id === id);


    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [voted, setVoted] = useState(false)

    const handleLike = () => {

        setLikeCount(likeCount + 1);
        setVoted(true);
    };

    const handleDislike = () => {

        setDislikeCount(dislikeCount + 1);
        setVoted(true);

    };
    const handlevote = () => {

        const voteRecord = {
            likeCount,
            dislikeCount,
            surveyId: id,
            userAnswer: selectedOption,
            votedOption: voted ? (likeCount > dislikeCount ? 'like' : 'dislike') : 'not voted',
        
        };
        // console.log('Voting Record:', voteRecord);
        
    axiosSecure.post('/allvotedfeature',voteRecord )
     
        .then(res => {
            console.log(res.data)
            if (res.insertedId)
                toast.success("voted successfully");

        })

    }




    return (
        <><div className="survey-details">
            {survey && (
                <>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{survey.title}</h2>
                            <p>{survey.description}</p>

                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold">
                            Questions:
                        </label>
                        <textarea
                            id="questions"
                            name="questions"
                            defaultValue={survey.questions}
                            rows="4"
                            className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                            required
                        ></textarea>
                    </div>


                </>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Options:</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id="yes"
                        name="options"
                        value="yes"
                        className="border rounded-full w-4 h-4 focus:outline-none focus:border-blue-500"
                        onChange={() => setSelectedOption('yes')} />
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="no"
                        name="options"
                        value="no"
                        className="border rounded-full w-4 h-4 focus:outline-none focus:border-blue-500"
                        onChange={() => setSelectedOption('no')} />
                    <label htmlFor="no">No</label>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    className="bg-green-500 text-white py-2 px-4 rounded-md cursor-pointer mr-4"
                    onClick={handleLike}
                >
                    Like ({likeCount})
                </button>
                <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleDislike}
                >
                    Dislike ({dislikeCount})
                </button>
            </div>
            <button onClick={handlevote} className="btn btn-primary">Vote Now</button>
        </div><Toaster /></>
    );
};

export default SurveyDetails;
