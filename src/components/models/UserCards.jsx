import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

export default function UserCards(props) {
  const { getProjectsByUser } = useProjects();
  const { deleteUser } = useAuth();

  const projects = getProjectsByUser(props.user.id);

  const details = {
    total: projects.length,
    completed: projects.filter((p) => p.status == "DONO").length,
    pending: projects.filter(
      (p) => p.status == "IN_PROGRESS" || p.status == "TODO",
    ).length,
  };

  return (
    <>
      <div className="card user">
        <h3>{props.user.name}</h3>
        <p>{props.user.email}</p>
        <h4>Total projects: {details.total}</h4>
        <button
          onClick={() =>
            confirm("Are you sure you want to delete this user?") &&
            deleteUser(props.user.id)
          }
          className="btn-danger"
        >
          Delete User
        </button>
      </div>
    </>
  );
}
