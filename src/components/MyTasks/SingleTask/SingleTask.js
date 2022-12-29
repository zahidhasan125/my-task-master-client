import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUndo, FaRegCommentAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import './SingleTask.css';

const SingleTask = ({ task, tasks, setTasks }) => {
    const [edit, setEdit] = useState(false);
    const [editTask, setEditTask] = useState(task.taskName);
    const [showComment, setShowComment] = useState(false);
    const [taskComment, setTaskComment] = useState(task?.comment);

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

    const handleComment = (e, id) => {
        if (e.key === 'Enter') {
            fetch(`http://localhost:5000/comment?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({taskComment})
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setTasks(tasks.map(task => task._id === id ? { ...task, comment: taskComment } : task));
                        setShowComment(false);
                    }
                    else {
                        setEdit(false);
                    }
                })
        }
    }

    return (
        <>
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
                <div className=' relative text-2xl flex gap-2 '>
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
                                <span className="icon" onClick={() => { setShowComment(!showComment) }}>
                                    <FaRegCommentAlt />
                                </span>
                            </>
                            :
                            <span className="icon" onClick={() => handleComplete(task._id)}>
                                <MdDone />
                            </span>
                    }
                    {
                        showComment &&
                        <input className='mr-4 absolute top-10 right-0 px-2 rounded-lg' placeholder='Write your comment' type="text" value={taskComment} onChange={(e) => setTaskComment(e.target.value)} onKeyDown={(e) => handleComment(e, task._id)} />
                    }
                </div>


            </form>

        </>
    );
};

export default SingleTask;