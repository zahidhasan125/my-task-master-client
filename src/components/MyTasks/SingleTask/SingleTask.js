import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUndo, FaRegCommentAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import './SingleTask.css';
import { toast } from 'react-hot-toast';

const SingleTask = ({ task, tasks, setTasks }) => {
    const [edit, setEdit] = useState(false);
    const [editTask, setEditTask] = useState(task.taskName);
    const [showComment, setShowComment] = useState(false);
    const [taskComment, setTaskComment] = useState(task?.comment);

    const handleComplete = (id) => {
        fetch(`https://my-task-master-server.vercel.app/tasks?id=${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Moved to Completed Task Successfully!');
                    setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted: !task.isCompleted } : task))
                }
            })
    }

    const handleNotComplete = id => {
        fetch(`https://my-task-master-server.vercel.app/completed?id=${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Moved to My Task Successfully!');
                    setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted: !task.isCompleted } : task))
                }
            })
    }

    const handleDelete = (id) => {

        fetch(`https://my-task-master-server.vercel.app/tasks?id=${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setTasks(tasks.filter(task => task._id !== id))
                    toast.success('Deleted Successfully!')
                }
            })
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        fetch(`https://my-task-master-server.vercel.app/edittask?id=${id}&editTask=${editTask}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Edited Successfully!');
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
            fetch(`https://my-task-master-server.vercel.app/comment?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ taskComment })
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
            <form className='relative single-task flex items-center justify-between px-4 h-12 md:h-16 rounded-lg mx-2' onSubmit={(e) => handleEdit(e, task._id)}>
                {
                    // image notification
                    task.image &&
                    <small className='text-center text-white absolute right-2 top-[-6px] w-8 h-5 bg-blue-700 border border-blue-900 rounded-full'>img</small>
            }
                {
                    edit ?
                        <input className='flex-1 mr-4 h-[80%] px-2 rounded-lg' type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />
                        :
                        task.isCompleted ?
                            <s className="flex-1 mr-4 font-bold text-xl">{task.taskName}</s>
                            :
                            <span className="flex-1 mr-4 font-bold text-xl">{task.taskName}</span>
                }
                <div className=' relative text-2xl flex gap-2 '>
                    {!task.isCompleted &&

                        <span className="icon cursor-pointer" onClick={() => {
                            if (!edit && !task.isCompleted) {
                                setEdit(!edit);
                            }
                        }}>
                            <FaEdit />
                        </span>
                    }
                    <span className="icon cursor-pointer" onClick={() => handleDelete(task._id)}>
                        <FaTrashAlt />
                    </span>
                    {
                        task.isCompleted ?
                            <>
                                <span className="icon cursor-pointer" onClick={() => handleNotComplete(task._id)}>
                                    <FaUndo />
                                </span>
                                <span className="icon cursor-pointer" onClick={() => { setShowComment(!showComment) }}>
                                    <FaRegCommentAlt />
                                </span>
                            </>
                            :
                            <span className="icon cursor-pointer" onClick={() => handleComplete(task._id)}>
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