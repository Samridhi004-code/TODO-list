import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";
const TaskForm = ({ fetchTasks, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [editMode, setEditMode] = useState(false);
  const host = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setEditMode(true);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setEditMode(false);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editMode) {
        await axios.put(
          `${host}/api/tasks/${taskToEdit.id}`,
          { title, description, status },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTaskToEdit(null); // Clear the taskToEdit after update
      } else {
        await axios.post(
          `${host}/api/tasks`,
          { title, description, status },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      fetchTasks();
    } catch (error) {
      alert("Failed to save task");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>{editMode ? "Edit Task" : "Add Task"}</h3>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="title"
            placeholder="Enter title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Dropdown onSelect={(selectedStatus) => setStatus(selectedStatus)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="pending" active={status === "pending"}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="completed"
                active={status === "completed"}
              >
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button variant="primary" type="submit">
          {editMode ? "Update Task" : "Add Task"}
        </Button>
        {editMode && (
          <Button
            variant="danger"
            type="button"
            onClick={() => setTaskToEdit(null)}
          >
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default TaskForm;
