import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import axios from '../../axios/axios';
import Project from '../Project/Project';
import Loading from '../Loading/Loading';
import ModalWindow from '../ModalWindow/ModalWindow';

const plus = <FontAwesomeIcon icon={faPlus} />

const buttonStyle = {
    margin: '50px auto',
    textAlign: 'center',
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    background: 'linear-gradient(#4c7fbe, #355fa2)'
}

const plusStyle = {
    color: '#344b74',
}

const noProjectStyle = {
    textAlign: 'center',
    color: '#303030',
    fontSize: '20px',
    margin: '50px'
}

const Main = ({ isAuth }) => {

    const history = useHistory()

    const [projects, setProjects] = useState(null);
    const [modalProjectShow, setModalProjectShow] = useState(false);
    const [editId, setEditId] = useState(null);
    const [projectName, setProjectName] = useState('');

    if (!isAuth) {
        history.push('/signin');
    }

    useEffect(() => {
        axios.get('/projects')
            .then(res => {
                setProjects(res.data.projects);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const openProjectModal = () => {
        setModalProjectShow(true);
    };

    const closeModalProject = () => {
        setEditId(null);
        setProjectName('');
        setModalProjectShow(false);

    };

    const addNewProject = (name) => {
        console.log(name);
        axios.post('/projects', { name })
            .then(resp => {
                setProjects(resp.data.projects);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const removeProject = (id) => {
        axios.delete('/projects/' + id)
            .then(res => {
                setProjects(res.data.projects);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const updateProject = () => {
        axios.post('/update-project', {
            id: editId,
            name: projectName
        })
            .then(res => {
                setProjects(res.data.projects);
            })
            .catch(err => {
                console.log(err);
            });
    }


    if (!projects) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <DndProvider backend={Backend}>
                {!projects ? <Loading /> : <div>
                    {projects.length === 0
                        ? <p style={noProjectStyle}>There are no projects, add new one</p>
                        : projects.map(item => <Project key={item._id}
                            id={item._id}
                            name={item.name}
                            setProjectName={setProjectName}
                            removeProject={removeProject}
                            setEditId={setEditId}
                            setModalProjectShow={setModalProjectShow}
                        />)}
                    <Button style={buttonStyle} onClick={openProjectModal}><span style={plusStyle}>{plus}</span> Add TODO List </Button>
                </div>}
                <ModalWindow show={modalProjectShow}
                    onHide={closeModalProject}
                    addProject={addNewProject}
                    editId={editId}
                    setEditId={setEditId}
                    projectName={projectName}
                    setProjectName={setProjectName}
                    updateProject={updateProject}
                />
            </DndProvider>
        </>
    );
};

export default Main;