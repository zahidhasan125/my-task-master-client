import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUndo, FaRegCommentAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import './SingleTask.css';

const SingleTask = ({ task, tasks, setTasks }) => {
    const [edit, setEdit] = useState(false);
    const [editTask, setEditTask] = useState(task.taskName);
    const [comment, setComment] = useState(false);
    const [commentTask, setCommentTask] = useState(task?.comment)

    const handleComplete = (id) => {
        fetch(`http://localhost:5000/tasks?id=${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted: !task.isCompleted } : task))
                }
            })
    }

    const handleNotComplete = id => {
        fetch(`http://localhost:5000/completed?id=${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted: !task.isCompleted } : task))
                }
            })
    }

    const handleDelete = (id) => {

        fetch(`http://localhost:5000/tasks?id=${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setTasks(tasks.filter(task => task._id !== id))
                    alert('Deleted Successfully!')
                }
            })
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        fetch(`http://localhost:5000/edittask?id=${id}&editTask=${editTask}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setTasks(tasks.map(task => task._id === id ? { ...task, taskName: editTask } : task));
                    setEdit(false);
                }
                else {
                    setEdit(false);
                }
            })

    }

    const handleComment = id => {
        console.log(id)
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
                {!task.isCompleted &&

                    <span className="icon" onClick={() => {
                        if (!edit && !task.isCompleted) {
                            setEdit(!edit);
                        }
                    }}>
                        <FaEdit />
                    </span>
                }
                <span className="icon" onClick={() => handleDelete(task._id)}>
                    <FaTrashAlt />
                </span>
                {
                    task.isCompleted ?
                        <>
                            <span className="icon" onClick={() => handleNotComplete(task._id)}>
                                <FaUndo />
                            </span>
                            <span className="icon" onClick={() => handleComment(task._id)}>
                                <FaRegCommentAlt />
                            </span>
                        </>
                        :
                        <span className="icon" onClick={() => handleComplete(task._id)}>
                            <MdDone />
                        </span>
                }
                {/* {
                    comment ?
                    <input className='flex-1 mr-4 h-[80%] px-2 rounded-lg' type="text" value={commentTask} onChange={(e) => setCommentTask(e.target.value)} />
                    :
                    task.isCompleted ?
                        <s className="flex-1 mr-4 font-bold text-2xl">{task.taskName}</s>
                        :
                        <span className="flex-1 mr-4 font-bold text-2xl">{task.taskName}</span>
                } */}
            </div>
        </form>
    );
};

export default SingleTask;