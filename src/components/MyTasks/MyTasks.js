import React, { useEffect, useState } from 'react';
import SingleTask from './SingleTask/SingleTask';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('https://my-task-master-server.vercel.app/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-[95%] max-w-7xl mx-auto'>
            {
                tasks.map(task => !task.isCompleted && <SingleTask key={task._id} task={task} tasks={tasks} setTasks={setTasks} />)
            }
        </div>
    );
};

export default MyTasks;