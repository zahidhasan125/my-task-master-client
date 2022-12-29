import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import './SingleTask.css';

const SingleTask = ({ task, tasks, setTasks }) => {
    const [edit, setEdit] = useState(false);
    const [editTask, setEditTask] = useState(task.taskName);

    const handleComplete = (id) => {
        setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task._id !== id))
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        setTasks(tasks.map(task => task._id === id ? { ...task, taskName: editTask } : task));
        setEdit(false);
    }
    return (
        <form className='single-task flex items-center justify-between px-4 h-12 md:h-16 rounded-lg mx-2' onSubmit={(e) => handleEdit(e, task._id)}>
            {
                edit ?
                    <input className='flex-1 mr-4 h-[80%] px-2 rounded-lg' type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />
                    :
                    task.isCompleted ?
                        <s className="flex-1 mr-4 font-bold text-2xl">{task.taskName}</s>
                        :
                        <span className="flex-1 mr-4 font-bold text-2xl">{task.taskName}</span>
            }
            <div className='text-2xl flex gap-2 '>
                <span className="icon" onClick={() => {
                    if (!edit && !task.isCompleted) {
                        setEdit(!edit);
                    }
                }}>
                    <FaEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(task._id)}>
                    <FaTrashAlt />
                </span>
                <span className="icon" onClick={() => handleComplete(task._id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTask;