import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {TaskContext} from "../contexts/TaskContext";
import styles from "./TaskList.module.css";

const STATUS_COLUMNS = [
  { key: "todo", label: "ToDo" },
  { key: "in-progress", label: "In-Progress" },
  { key: "done", label: "Done" },
];

function TaskCard({ task, onSelect }) {
  const { deleteTask } = useContext(TaskContext);
  const { id, title, description, priority } = task;

  const priorityClass =
    priority === "high"
      ? styles.priorityHigh
      : priority === "medium"
      ? styles.priorityMedium
      : styles.priorityLow;

  return (
    <article className={styles.card} onClick={() => onSelect(task.id)}>
      <div className={styles.cardTopRow}>
        <p className={styles.cardTitle}>{title}</p>
        <span className={`${styles.priorityBadge} ${priorityClass}`}>{priority}</span>
      </div>
      {description ? <p className={styles.cardDescription}>{description}</p> : null}

      <div className={styles.footer}>
        <Link
          to={`/tasks/${id}`}
          className={styles.viewLink}
          onClick={(e) => e.stopPropagation()}
        >
          View
        </Link>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(id);
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

function TaskList(){
    const { tasks, filteredTasks} = useContext(TaskContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const groupedTasks = useMemo(() => {
      return {
        todo: filteredTasks.filter((task) => task.status === "todo"),
        "in-progress": filteredTasks.filter((task) => task.status === "in-progress"),
        done: filteredTasks.filter((task) => task.status === "done"),
      };
    }, [filteredTasks]);

    return (
        <div className={styles.listRoot}>
            <div className={styles.toolbar}>
                <div>
                  <h2 className={styles.pageTitle}>Tasks</h2>
                  <p className={styles.pageSubTitle}>
                    Showing {filteredTasks.length} of {tasks.length} tasks
                  </p>
                </div>
                <Link to="/tasks/new" className={styles.addTaskButton}>
                    Add Task
                </Link>
            </div>
            <div className={styles.searchRow}>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search by title or description..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className={styles.boardGrid}>
                {STATUS_COLUMNS.map((column) => (
                  <section key={column.key} className={styles.column}>
                    <div className={styles.columnHeader}>
                      <h3 className={styles.columnTitle}>{column.label}</h3>
                      <span className={styles.columnCount}>{groupedTasks[column.key].length}</span>
                    </div>

                    <div className={styles.columnBody}>
                      {groupedTasks[column.key].length === 0 ? (
                        <p className={styles.emptyState}>No tasks</p>
                      ) : (
                        groupedTasks[column.key].map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onSelect={(taskId) => navigate(`/tasks/${taskId}`)}
                          />
                        ))
                      )}
                    </div>
                  </section>
                ))}
                </div>
        </div>
    );
}

export default TaskList
