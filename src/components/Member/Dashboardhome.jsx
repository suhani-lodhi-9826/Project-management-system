import Summarycards from "../models/Summarycards";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";
import { useState } from "react";

export default function Dashboardhome() {
    const { user } = useAuth();

    const {
        getProjectsByUser,
        changeProjectStatus
    } = useProjects();

    const [selectedFilter, setSelectedFilter] = useState("ALL");

    const myProjects = user
        ? getProjectsByUser(user.id)
        : [];

    // Recent projects
    const recentProjects = [...myProjects].sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    // Projects according to selected card
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

        return true; // ALL
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

            <div>

                {/* TOTAL */}
                <button onClick={() => setSelectedFilter("ALL")}>
                    <Summarycards
                        title="Total projects assigned"
                        value={myProjects.length}
                    />
                </button>

                {/* COMPLETED */}
                <button onClick={() => setSelectedFilter("COMPLETED")}>
                    <Summarycards
                        title="Total completed projects"
                        value={completedProjects.length}
                    />
                </button>

                {/* PENDING */}
                <button onClick={() => setSelectedFilter("PENDING")}>
                    <Summarycards
                        title="Total pending projects"
                        value={pendingProjects.length}
                    />
                </button>

            </div>

            <h2>
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
                            <td>{project.status}</td>
                            <td>{project.priority}</td>
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
                                    >
                                        Mark as Done
                                    </button>
                                )}

                                {project.status === "DONE" && (
                                    <button>
                                        View Project
                                    </button>
                                )}
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