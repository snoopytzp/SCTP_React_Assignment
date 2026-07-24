import {useState, useContext} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import styles from "./EditTaskForm.module.css";

function EditTaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, updateTask } = useContext(TaskContext);
    const fetchedTask = tasks.find((task) => task.id === Number(id));

    const [form, setForm] = useState({
      title: fetchedTask?.title || "",
      description: fetchedTask?.description || "",
      status: fetchedTask?.status || "todo",
      priority: fetchedTask?.priority || "medium"
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            id: Number(id),
            ...form,
        };
        updateTask(updatedTask);
        navigate(`/tasks/${id}`);
    }

    if (!fetchedTask) {
      return (
        <div className={styles.panel}>
          <h2 className={styles.name}>Task not found</h2>
        </div>
      );
    }

    return(
      <div className={styles.panel}>
      <h2 className={styles.name}>Edit Tasks</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className={styles.fieldControl}
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.fieldControl}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel} htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              className={styles.fieldControl}
              value={form.status}
              onChange={handleChange}
            >
              <option value="todo">To-Do</option>
              <option value="in-progress">In-Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel} htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className={styles.fieldControl}
              value={form.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className={styles.editActions}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <Link to={`/tasks/${id}`} className={styles.cancelButton}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
export default EditTaskForm;