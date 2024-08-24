import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const host = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${host}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${host}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  return (
    <>
      <div className="container">
        <h2>Task List</h2>
        <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Task"}
        </Button>
        {showForm && (
          <TaskForm
            fetchTasks={fetchTasks}
            taskToEdit={taskToEdit}
            setTaskToEdit={setTaskToEdit}
          />
        )}
        <Row className="g-4">
          {tasks.map((task) => (
            <Col key={task.id} xs={12} md={6} lg={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Footer className="text-muted">
                    Status: {task.status}
                  </Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(task)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default TaskList;
