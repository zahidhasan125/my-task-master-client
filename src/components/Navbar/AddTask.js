import React, { useRef, useState } from 'react';

const AddTask = () => {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);
    const singleTask = {taskName: newTask, isCompleted: false}

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask) {
            fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(singleTask)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        alert('Added Successfully')
                        setNewTask('')
                    }
                    console.log(data)
                })
                .catch(err => {
                console.error(err);
            })
            setTasks([...tasks, { id: Date.now(), taskName: newTask, isCompleted: false }]);
            setNewTask('')
          }
    }
    console.log(tasks)
    return (
        <form className='w-full md:w-[95%] max-w-7xl mx-auto' onSubmit={e=>handleAddTask(e)}>
            <div className='w-full mx-auto relative flex items-center'>
                <input
                    type="text"
                    ref={inputRef}
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                    className='h-16 w-full rounded-full pl-4 text-2xl border-none shadow-[inset_0_0_5px_#000] focus:outline-0 focus:shadow-[0_0_10px_1000px_rgba(0, 0, 0, 0.5)]'
                    placeholder='Enter your task'
                />
                <button
                    type='submit'
                    className='absolute right-2 bg-green-600 p-3 rounded-full font-bold text-white transition hover:-translate-1 hover:scale-90 duration-200 shadow-[0_0_5px_#000]'

                >GO</button>
            </div>
        </form>
    );
};

export default AddTask;