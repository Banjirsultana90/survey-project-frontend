import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../components/base/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';

const Update = () => {
    const {user}=useContext(AuthContext)
    // const { _id } = useParams();
    const surveys=useLoaderData()
   const axiosSecure=useAxiosSecure()
    const navigate=useNavigate()
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

   
    const {
        _id,
        
        title,
        category,
        deadline,
        description,
        questions,
        options
       

    } = surveys ||{}
    console.log(surveys);
    console.log(_id);
  

    // const handleupdate = async (event) => {
    //     event.preventDefault();
    //     const form = event.target;

    //     const updatedsurvey = {
    //         title: form.title.value,
    //         deadline: form.deadline.value,
    //         description: form.description.value,
    //         category: form.category.value,
        
    //         questions: form.questions.value,
    //         options: form.options.value,
    //     };
        

    //     if (userRole === 'surveyor') {fetch(`http://localhost:5000/allcreatedsurvey/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
           
    //         body: JSON.stringify(updatedsurvey),
    //     })
    //     .then((res) => res.json())
    //     .then((value) => {
    //         if (value.modifiedCount > 0) {
    //             toast.success('survey  updated successfully');
    //         }
    //         navigate('/allsurvey')
    //     });
        

          
    //     }
    //     else { toast.error('You are not authorized to update this job.'); }
    // };
    const handleupdate = async (event) => {
        event.preventDefault();
        const form = event.target;

        const updatedsurvey = {
            title: form.title.value,
            deadline: form.deadline.value,
            description: form.description.value,
            category: form.category.value,
            questions: form.questions.value,
            options: form.options.value,
        };

        if (userRole === 'surveyor') {
            try {
                const response = await fetch(`http://localhost:5000/allcreatedsurvey/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedsurvey),
                });

                const data = await response.json();
                if (data.modifiedCount > 0) {
                    toast.success('Survey updated successfully');
                    navigate('/allsurvey');
                } else {
                    toast.error('Failed to update the survey');
                }
            } catch (error) {
                toast.error('An error occurred while updating the survey');
                console.error(error);
            }
        } else {
            toast.error('You are not authorized to update this survey.');
        }
    };
    return (
        <div>
            <h2>{surveys.length}</h2>
        <form onSubmit={handleupdate} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={title || ''}

                    className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={description|| ''}

                    rows="4"
                    className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                    required
                ></textarea>
            </div>



            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-semibold">Category:</label>
                <select
                    id="category"
                    name="category"
                    defaultValue={category|| ''}
                    className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                >
                    <option value="Market Research">Market Research</option>
                    <option value="Customer Satisfaction">Customer Satisfaction</option>
                    <option value="Employee Feedback">Employee Feedback</option>
                    <option value="Wellness & Lifestyle">Wellness & Lifestyle</option>
                    <option value="Sustainability & Environment">Sustainability & Environment</option>
                </select>

            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold">Questions:</label>
                <textarea
                    id="questions"
                    name="questions"
                    defaultValue={questions|| ''}

                    rows="4"
                    className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="deadline" className="block text-gray-700 font-semibold">Deadline:</label>
                <input
                    type="datetime-local" // This allows users to input date and time
                    id="deadline"
                    name="deadline"
                    className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                    required
                />
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
                    />
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="no"
                        name="options"
                        value="no"

                        className="border rounded-full w-4 h-4 focus:outline-none focus:border-purple-600"
                    />
                    <label htmlFor="no">No</label>
                </div>
            </div>

            <div>
                <input type="submit" value="Submit" className='bg-purple-600 text-white py-2 px-4 rounded-md cursor-pointer' />
            </div>
        </form>
        <Toaster />
    </div>
    );
};

export default Update;