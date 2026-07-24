import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import Header from "../components/Header";
import styles from "./TaskDetailPage.module.css";
import shellStyles from "./PageShell.module.css";

function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useContext(TaskContext);
  const taskId = Number(id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <div className={shellStyles.page}>
        <Header />
        <main className={shellStyles.content}>
          <div className={styles.panel}>
            <h2 className={styles.name}>Task not found</h2>
            <p className={styles.notFoundText}>The requested task does not exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={shellStyles.page}>
      <Header />
      <main className={shellStyles.content}>
        <div className={styles.panel}>
          <h2 className={styles.name}>Task details</h2>

          <div className={styles.section}>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>ID</span>
              <span className={styles.fieldValue}>{task.id}</span>
            </div>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Title</span>
              <span className={styles.fieldValue}>{task.title}</span>
            </div>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Description</span>
              <span className={styles.fieldValue}>{task.description}</span>
            </div>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Status</span>
              <span className={styles.fieldValue}>{task.status}</span>
            </div>
            <div className={styles.fieldRow}>
              <span className={styles.fieldLabel}>Priority</span>
              <span className={styles.fieldValue}>{task.priority}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to={`/tasks/${id}/edit`} className={styles.editButton}>
              Edit
            </Link>
            <Link to="/tasks" className={styles.cancelButton}>
              Back
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskDetailPage;