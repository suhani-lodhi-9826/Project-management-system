import Summarycards from "../models/Summarycards";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function Dashboardhome() {
    const { user } = useAuth();

    const navigate = useNavigate()


    const {
        getProjectsByUser,
        changeProjectStatus
    } = useProjects();

    const [selectedFilter, setSelectedFilter] = useState("ALL");

    const myProjects = user
        ? getProjectsByUser(user.id)
        : [];

    const recentProjects = [...myProjects].sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    
    const filteredProjects = recentProjects.filter((project) => {
        if (selectedFilter === "COMPLETED") {
            return project.status === "DONE";
        }

        if (selectedFilter === "PENDING") {
            return (
                project.status === "TODO" ||
                project.status === "IN_PROGRESS"
            );
        }

        return true; 
    });

    const completedProjects = myProjects.filter(
        (project) => project.status === "DONE"
    );

    const pendingProjects = myProjects.filter(
        (project) =>
            project.status === "TODO" ||
            project.status === "IN_PROGRESS"
    );


    return (
        <>
            <h1>Dashboard</h1>

            <div className="summary-cards">

                {/* TOTAL */}
                <span onClick={() => setSelectedFilter("ALL")}>
                    <Summarycards
                        title="Total projects assigned"
                        value={myProjects.length}
                    />
                </span>

                {/* COMPLETED */}
                <span onClick={() => setSelectedFilter("COMPLETED")}>
                    <Summarycards
                        title="Total completed projects"
                        value={completedProjects.length}
                    />
                </span>

                {/* PENDING */}
                <span onClick={() => setSelectedFilter("PENDING")}>
                    <Summarycards
                        title="Total pending projects"
                        value={pendingProjects.length}
                    />
                </span>

            </div>

            <h2 className="subtitle">
                {selectedFilter === "ALL"
                    ? "My Projects"
                    : selectedFilter === "COMPLETED"
                        ? "Completed Projects"
                        : "Pending Projects"
                }
            </h2>

            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProjects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                           <td>
                                <span className={`status status-${project.status.toLowerCase()}`}>
                                     {project.status}
                                </span>
                            </td>
                            <td>
                                <span className= {project.priority ? `priority priority-${project.priority.toLowerCase()}` : ''}>
                                    {project.priority}
                                </span>
                            </td>
                            <td>{project.startDate}</td>
                            <td>{project.dueDate}</td>

                            <td>
                                {project.status === "TODO" && (
                                    <button
                                        onClick={() =>
                                            changeProjectStatus(
                                                project.id,
                                                "IN_PROGRESS"
                                            )
                                        }
                                        className="btn-primary"
                                    >
                                        Start Project
                                    </button>
                                )}

                                {project.status === "IN_PROGRESS" && (
                                    <button
                                        onClick={() =>
                                            changeProjectStatus(
                                                project.id,
                                                "DONE"
                                            )
                                        }
                                        className="btn-primary"
                                    >
                                        Mark as Done
                                    </button>
                                )}

                                {project.status === "DONE" && (
                                    <button
                                        onClick={() =>
                
                                            changeProjectStatus(
                                                project.id,
                                                "IN_PROGRESS"
                                            )
                                        }
                                        className="btn-primary"
                                    >
                                        Mark as UnDone
                                    </button>
                                )}

                                    <button className="btn-secondary" onClick={() => navigate(`/user/dashboard/project/${project.id}`)}>
                                        View Details
                                    </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredProjects.length === 0 && (
                <p>No projects to display.</p>
            )}
        </>
    );
}