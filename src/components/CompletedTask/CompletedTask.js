import React, { useEffect, useState } from 'react';
import SingleTask from '../MyTasks/SingleTask/SingleTask';

const CompletedTask = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/completed')
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
    }, [])
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-[95%] max-w-7xl mx-auto'>
                {
                    tasks.map(task => task.isCompleted && <SingleTask key={task._id} task={task} tasks={tasks} setTasks={setTasks} />)
                }
            </div>

        </div>
    );
};

export default CompletedTask;