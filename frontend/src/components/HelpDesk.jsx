import React, { useState, useEffect } from "react";
import "./Helpdesk.css";

const API_URL = "http://localhost:5000/tickets";

const HelpDesk = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Error in fetching tickets: ", err));
  }, []);

  const handleCreateTicket = () => {
    const newTicket = { title, description };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets([...tickets, data]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.error("Error in creating ticket, please try after sometime: ", err));
  };

  const handleEditClick = (ticket) => {
    setEditId(ticket._id);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
  };

  const handleUpdateTicket = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    })
      .then((res) => res.json())
      .then((updatedTicket) => {
        setTickets(tickets.map(ticket => (ticket._id === id ? updatedTicket : ticket)));
        setEditId(null);
      })
      .catch((err) => console.error("Error in updating ticket, please try after sometime: ", err));
  };

  const handleDeleteTicket = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTickets(tickets.filter(ticket => ticket._id !== id)))
      .catch((err) => console.error("Error in deleting ticket, please try after sometime: ", err));
  };

  return (
    <div className="container">
      <h1>HelpDesk Ticketing System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateTicket}>Create Ticket</button>
      </div>

      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket._id} className="ticket-item">
            {editId === ticket._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button className="update-btn" onClick={() => handleUpdateTicket(ticket._id)}>Update</button>
                <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span><strong>{ticket.title}</strong>: {ticket.description}</span>
                <button className="edit-btn" onClick={() => handleEditClick(ticket)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteTicket(ticket._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpDesk;
