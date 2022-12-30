import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddTask = () => {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);
    const singleTask = { taskName: newTask, isCompleted: false };

    const handleAddTask = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", e.target.image.files[0])

        if (e.target.image.files.length > 0) {
            fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        singleTask.image = data.data.url;
                        fetch('https://my-task-master-server.vercel.app/tasks', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(singleTask)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    toast.success('Added Successfully');
                                    setNewTask('');
                                    e.target.reset();
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            })
                        setTasks([...tasks, { id: Date.now(), taskName: newTask, isCompleted: false }]);
                        setNewTask('')
                    }

                })
        }
        else {
            fetch('https://my-task-master-server.vercel.app/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(singleTask)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Added Successfully!');
                        setNewTask('');
                        e.target.reset();
                    }
                })
                .catch(err => {
                    console.error(err);
                })
            setTasks([...tasks, { id: Date.now(), taskName: newTask, isCompleted: false }]);
            setNewTask('')
        }

    }
    return (
        <form className='w-full md:w-[95%] max-w-7xl mx-auto' onSubmit={e => handleAddTask(e)}>
            
            <div className='w-full mx-auto flex flex-col justify-center items-center'>
                <input
                    type="text"
                    ref={inputRef}
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                    className='h-16 w-full rounded-full dark:bg-gray-700 pl-4 text-2xl border-none shadow-[inset_0_0_5px_#000] focus:outline-0 focus:shadow-[0_0_10px_1000px_rgba(0, 0, 0, 0.5)]'
                    placeholder='Enter your task'
                />

                <div className='mt-4'>
                    <label className="pl-3 font-bold dark:text-slate-300">Select Image </label><small className='dark:text-slate-300'>(Optional)</small>
                    <input name='image' className="block mb-4 w-full text-lg text-gray-900 border border-gray-300 rounded-full pl-3 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"></input>
                </div>
                <button
                    type='submit'
                    className='bg-green-600 w-1/4 p-3 rounded-full font-bold text-white transition hover:-translate-1 hover:scale-90 duration-200 shadow-[0_0_5px_#000]'

                >GO</button>
            </div>
        </form>
    );
};

export default AddTask;