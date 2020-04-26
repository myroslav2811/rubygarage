import React, { useState, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { useDrop, useDrag } from 'react-dnd'


import './Task.css'

const itemStyle = {
    display: 'grid',
    gridTemplateColumns: '3fr 31fr 8fr',
    padding: '0'
}

const checkStyle = {
    color: '#797979',
    textAlign: 'center',
    padding: '15px'
}

const nameStyle = {
    padding: '15px',
    borderLeft: '1px solid rgba(0, 0, 0, 0.125)',
    borderRight: '1px solid rgba(0, 0, 0, 0.125)'
}

const buttonStyle = {
    color: '#797979',
    padding: '0 15px',
    margin: '15px 0',
    display: 'inline-block'
}


const Task = ({ id, name, status, deleteTask, changeStatus, setEditTaskId, setTaskName, moveTask, index }) => {

    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'task',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveTask(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'task', id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    const [overItem, setOverItem] = useState(false);

    const onRemoveHandler = () => {
        deleteTask(id);
    }

    const onChangeStatusHandler = () => {
        changeStatus(id, status);
    }

    const onEditHandler = () => {
        setEditTaskId(id);
        setTaskName(name);
    }

    const pen = <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEdit} onClick={onEditHandler} />;
    const trash = <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTrashAlt} onClick={onRemoveHandler} />;
    const sort = <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faSort} />;
    const checked = <FontAwesomeIcon icon={faCheckSquare} style={{ cursor: 'pointer' }} onClick={onChangeStatusHandler} />
    const nchecked = <FontAwesomeIcon icon={faSquare} style={{ cursor: 'pointer' }} onClick={onChangeStatusHandler} />


    return (
        <ListGroup.Item style={{ ...itemStyle, opacity }} className='task-item' onMouseEnter={() => setOverItem(true)} onMouseLeave={() => setOverItem(false)} ref={ref} >
            <div style={checkStyle}>
                {status ? checked : nchecked}
            </div>
            <div style={nameStyle}>
                {name}
            </div>
            <CSSTransition in={overItem} timeout={300} classNames="buttons" unmountOnExit>
                <div>
                    <span style={buttonStyle}>{sort}</span>
                    <span style={{ ...buttonStyle, borderLeft: '1px solid #797979', borderRight: '1px solid #797979' }}>{pen}</span>
                    <span style={buttonStyle}>{trash}</span>
                </div>
            </CSSTransition>

        </ListGroup.Item >
    );
}

export default Task;

