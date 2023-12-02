import toast from "react-hot-toast";
import Swal from "sweetalert2";


const SurveyForm = () => {
    const handlesubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const questions = form.questions.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const options = form.options.value;
        const category = form.category.value;
        // const timestamp = moment().format();


        const formdata = { title, description, deadline, category, questions, options };
        console.log(formdata);


        fetch('https://survey-project-server-xi.vercel.app/allcreatedsurvey', {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json())
            .then(value => {
                console.log(value)
                if (value.insertedId)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Suvey created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

            })
    }


    return (
        <div>
            <form onSubmit={handlesubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"

                        className="border rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
                    <textarea
                        id="description"
                        name="description"

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

                {/* <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 rounded-md cursor-pointer mr-4"
                       
                    >   Like
                      
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
                       
                    >
                        Dislike
                        
                    </button>
                    </div> */}
                <div>
                    <input type="submit" value="Submit" className='bg-purple-600 text-white py-2 px-4 rounded-md cursor-pointer' />
                </div>
            </form>
        </div>
    );
};

export default SurveyForm;
