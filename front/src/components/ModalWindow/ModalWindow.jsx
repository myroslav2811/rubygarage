import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalWindow = (props) => {

    const { projectName, setProjectName, addProject, updateProject, editId, setEditId, ...rest } = props;

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        if (e.target.value.trim().length < 1) {
            setError(true);
        } else {
            setError(false);
        }
        if (e.target.value.length <= 30) {
            setProjectName(e.target.value);
        }
    }

    const addNewProject = () => {
        if (!error) {
            addProject(projectName);
            setProjectName('');
            rest.onHide();
        }
    }

    const updateCurrProject = () => {
        if (!error) {
            updateProject();
            setProjectName('');
            rest.onHide();
            setEditId(null)
        }
    }

    return (
        <Modal
            {...rest}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editId ? 'EditProject' : 'Create new Project'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Project name</Form.Label>
                    <Form.Control type="text"
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={handleChange}
                        isInvalid={error} />
                    <Form.Control.Feedback type="invalid">
                        Invalid project name!
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={editId ? updateCurrProject : addNewProject}>{editId ? 'Edit' : 'Add'}</Button>
                <Button onClick={rest.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;