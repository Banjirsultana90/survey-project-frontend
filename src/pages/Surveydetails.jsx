
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../components/base/Useaxiossecure';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const SurveyDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const surveyDetails = useLoaderData();
    const navigate=useNavigate()
    const axiosSecure = useAxiosSecure();
    const survey = surveyDetails.find((survey) => survey._id === id);

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [voted, setVoted] = useState(false);
    const [comment, setComment] = useState('');
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alluser', { withCredentials: true });
            return res.data;
        }
    });
    const loggedInUser = users.find(userData => userData?.email === user?.email);
    const userRole = loggedInUser?.role;
    console.log(userRole);


    const [voteDisabled, setVoteDisabled] = useState(false);

    useEffect(() => {
        axiosSecure.get(`/allvotedfeature/${user?.email}/${id}`, { withCredentials: true })
            .then(res => {
                const hasVoted = res.data.hasVoted;
                setVoted(hasVoted);
                setVoteDisabled(hasVoted); // Disable the button if user has already voted
            })
            .catch(error => {
                console.error('Error checking user vote:', error);
            });
    }, [id, user?.email]);

    const canVote = user && !voted;

    const handleLike = () => {
        if (canVote) {
            setLikeCount(likeCount + 1);
            // setVoted(true);
        }
    };

    const handleDislike = () => {
        if (canVote) {
            setDislikeCount(dislikeCount + 1);
            // setVoted(true);
        }
    };

    const handleVote = () => {
        if (canVote) {
            const voteRecord = {
                name: user.name,
                email: user.email,
                likeCount,
                dislikeCount,
                comment,
                surveyId: id,
                userAnswer: selectedOption,
                votedOption: likeCount > dislikeCount ? 'like' : 'dislike',
            };

            axiosSecure.post('/allvotedfeature', voteRecord, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success("Voted successfully");
                        setVoteDisabled(true); // Disable voting after a successful vote
                        navigate('/surveyresult')
                    }
                })
                .catch(error => {
                    toast.error("Failed to vote");
                });
        }
    };

    return (
        <>
            <div className="survey-details mx-10 my-10">
                {survey && (
                    <>
                        <div className="card w-full bg-base-100 shadow-xl ">
                            <div className="card-body">
                                <h2 className="card-title">{survey.title}</h2>
                                <p>{survey.description}</p>
                                <p> Deadline {survey.deadline}</p>
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
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Options:</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="yes"
                                    name="options"
                                    value="yes"
                                    className="border rounded-full w-4 h-4 focus:outline-none focus:border-purple-600"
                                    onChange={() => setSelectedOption('yes')} />
                                <label htmlFor="yes">Yes</label>
                                <input
                                    type="radio"
                                    id="no"
                                    name="options"
                                    value="no"
                                    className="border rounded-full w-4 h-4 focus:outline-none focus:border-purple-600"
                                    onChange={() => setSelectedOption('no')} />
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full bg-white"
                            placeholder="Comment here"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={userRole !== 'prouser'}
                        ></textarea>
                        <div className="flex justify-center my-4">
                            <button
                                type="button"
                                className=" bg-purple-600 text-white py-2 px-4 rounded-md cursor-pointer mr-4 w-1/2"
                                onClick={handleLike}
                                disabled={!canVote}
                            >
                                Like ({likeCount})
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer w-1/2"
                                onClick={handleDislike}
                                disabled={!canVote}
                            >
                                Dislike ({dislikeCount})
                            </button>
                        </div>
                        <div>
                            <button onClick={handleVote} className="btn bg-purple-600 w-1/2 text-white" disabled={!canVote}>
                                Vote Now
                            </button>
                            <button className="btn text-white bg-red-500 w-1/2">
                                Report Survey
                            </button>
                        </div>
                    </>
                )}
                <Toaster />
            </div>
        </>
    );
};

export default SurveyDetails;
