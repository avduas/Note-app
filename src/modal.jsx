import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./modal.css"

const Example = ({ show, handleClose, note, onEdit }) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    setEditedTitle(note ? note.title : '');
    setEditedText(note ? note.text : '');
  }, [note]);

  const handleSave = () => {
    onEdit(editedTitle, editedText);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        {note ? (
          <>
            <p>{note.date.toLocaleString()}</p>
          </>
        ) : (
          <p>No note selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSave} className='update'>Update</button>
      </Modal.Footer>
    </Modal>
  );
};

export default Example;
