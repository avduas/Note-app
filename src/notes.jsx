import React, { useState, useEffect } from 'react';
import './notes.css';
import Example from './modal';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [content, setNote] = useState('');
  const [storage, addToStorage] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    addToStorage(storedNotes);
  }, []);
  
  useEffect(() => {
    if (storage.length > 0) {
      localStorage.setItem('notes', JSON.stringify(storage));
    }
  }, [storage]);  

  const addNote = (e) => {
    e.preventDefault();

    if (!content) {
      alert("Please fill in the note field");
      return;
    }

    const newDate = new Date();
    const options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = newDate.toLocaleString('en-US', options);

    const newNote = {
      title: title,
      text: content,
      date: formattedDate,
    };

    addToStorage([...storage, newNote]);
    setTitle('');
    setNote('');
  };

  const deleteNote = (index) => {
    const shouldDelete = window.confirm("Are you sure?");
    if (shouldDelete) {
      const updatedStorage = [...storage];
      updatedStorage.splice(index, 1);
      addToStorage(updatedStorage);
    }
  };

  const handleEditNote = (editedTitle, editedText) => {
    const updatedStorage = [...storage];
    const formattedDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    updatedStorage[selectedNoteIndex] = {
      ...updatedStorage[selectedNoteIndex],
      title: editedTitle,
      text: editedText,
      date: formattedDate,
    };
    addToStorage(updatedStorage);
    setSelectedNoteIndex(null);
  };

  return (
    <div>
      <form className='text-form'>
        <input
          className='titleArea'
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className='textarea'
          placeholder='Put the note here'
          value={content}
          onChange={(e) => setNote(e.target.value)}
          rows={content.split('\n').length || 1}
        ></textarea>
        <button className='button' onClick={addNote}>
          Add new note
        </button>
      </form>
      <div className='notes-grid'>
        {storage.map((note, index) => (
          <div key={index} className='note-container' onClick={() => setSelectedNoteIndex(index)}>
            <div className='title-box'>
              <span className='close-icon' onClick={() => deleteNote(index)}>✖</span>
              <p className='title'>{note.title}</p>
            </div>
            <p>{note.text}</p>
            <p>{note.date.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <Example
        show={selectedNoteIndex !== null}
        handleClose={() => setSelectedNoteIndex(null)}
        note={selectedNoteIndex !== null ? storage[selectedNoteIndex] : null}
        onEdit={handleEditNote}
      />
    </div>
  );
};

export default Notes;
