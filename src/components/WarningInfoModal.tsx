import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const WarningInfoModal = ({ showModal, onClose, text }) => {

    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text} </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default WarningInfoModal;