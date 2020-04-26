import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';


import Task from '../Task/Task';
import axios from '../../axios/axios';
import Loading from '../Loading/Loading';

const cardStyle = {
    marginTop: '50px',
    borderRadius: '0 0 30px 30px',
    border: '1px solid gray',
    overflow: 'hidden',
    borderRight: 'none',
    borderTop: 'none'
};

const cardHeaderStyle = {
    color: '#fff',
    fontSize: '26px',
    background: 'linear-gradient(#4c7fbe, #355fa2)',
    borderRadius: '0'
};

const cardHeaderSpanStyle = {
    fontSize: '22px',
    color: '#344b74',
    marginRight: '20px'
};

const inputStyle = {
    margin: '15px 0',
    borderRadius: '2px 0 0 2px',
    borderRight: 'none',
    boxSizing: 'border-box',
    height: 'auto'
}

const cardBodyStyle = {
    background: 'linear-gradient(#e2e2e2, #c9c9c9)',
    padding: 0
}

const plusStyle = {
    color: '#5a9073',
    fontSize: '36px',
    lineHeight: 0,
    margin: '15px auto'
}

const inputWrapperStyle = {
    display: 'grid',
    gridTemplateColumns: '3fr 31fr 8fr',
}

const buttonStyle = {
    background: 'linear-gradient(#91c8ac, #548d6c)',
    margin: '15px 15px 15px 0',
    border: '1px solid #ced4da',
    borderLeft: 'none',
    borderRadius: '0 2px 2px 0',
    boxSizing: 'border-box',
    width: '170px'
}

const Project = ({ id, name, removeProject, setProjectName, setEditId, setModalProjectShow }) => {

    const [tasks, setTasks] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        axios.get('/tasks/' + id)
            .then(res => {
                setTasks(res.data.tasks);
            })
            .catch()
    }, [id])

    const changeStatus = (taskId, status) => {
        axios.post('/task-status', {
            projectId: id,
            id: taskId,
            status
        })
            .then(res => {
                setTasks(res.data.tasks)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const removeItem = () => {
        removeProject(id);
    }

    const openEditMode = () => {
        setProjectName(name);
        setEditId(id);
        setModalProjectShow(true);
    }

    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
    const pen = <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faPen} onClick={openEditMode} />;
    const trash = <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTrashAlt} onClick={removeItem} />;
    const plus = <FontAwesomeIcon icon={faPlus} />

    const taskNameChange = (e) => {
        if (editTaskId && !e.target.value) {
            setEditTaskId(null);
        }

        if (e.target.value.length < 20) {
            setTaskName(e.target.value);
        }
    }

    const addNewTask = () => {
        if (taskName.trim().length > 0) {
            setTasks(null);
            axios.post('/tasks', {
                projectId: id,
                name: taskName.trim(),
                priority: tasks.length + 1
            })
                .then(res => {
                    setTaskName('');
                    setTasks(res.data.tasks);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const deleteTask = (taskId) => {
        axios.delete(`/task/${id}/${taskId}`)
            .then(res => {
                setTasks(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editTask = () => {
        if (taskName.trim().length > 0) {
            setTasks(null);
            axios.post('/update-task', {
                id: editTaskId,
                projectId: id,
                name: taskName.trim()
            })
                .then(res => {
                    setTaskName('');
                    setEditTaskId(null);
                    setTasks(res.data.tasks);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const moveTask = useCallback(
        (dragIndex, hoverIndex) => {
            const dragTask = tasks[dragIndex]
            setTasks(
                update(tasks, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragTask],
                    ],
                }),
            )
        },
        [tasks],
    )

    return (
        <Card style={cardStyle}>
            <Card.Header style={cardHeaderStyle}>
                <Row>
                    <Col lg={10}>
                        <span style={cardHeaderSpanStyle}>{calendar}</span>
                        {name}
                    </Col>
                    <Col lg={2}>
                        <p style={{ textAlign: 'end' }}>
                            <span style={{ ...cardHeaderSpanStyle, borderRight: '1px solid #344b74', paddingRight: '20px' }}>
                                {pen}
                            </span>
                            <span style={cardHeaderSpanStyle}>
                                {trash}
                            </span>
                        </p>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={cardBodyStyle}>
                <div style={inputWrapperStyle}>
                    <div style={plusStyle}>
                        {plus}
                    </div>
                    <div>
                        <FormControl
                            style={inputStyle}
                            placeholder="Enter task name..."
                            value={taskName}
                            onChange={taskNameChange}
                        />
                    </div>
                    <div>
                        <Button style={buttonStyle} onClick={editTaskId ? editTask : addNewTask}>{editTaskId ? 'Edit task' : 'Add task'}</Button>
                    </div>
                </div>
            </Card.Body>
            {!tasks
                ? <Loading />
                : tasks.length === 0
                    ? <p style={{ textAlign: 'center', padding: '50px' }}>There are no tasks, add new one</p>
                    : <DndProvider backend={Backend}>
                        <div>
                            {tasks.map((item, i) => (
                                <Task
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    status={item.status}
                                    deleteTask={deleteTask}
                                    changeStatus={changeStatus}
                                    setEditTaskId={setEditTaskId}
                                    setTaskName={setTaskName}
                                    moveTask={moveTask}
                                    index={i} />
                            ))}
                        </div>
                    </DndProvider>}

        </Card>
    );

}

export default Project;