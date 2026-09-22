import { useProjects } from "../../context/ProjectContext"
import {useAuth} from "../../context/AuthContext"
import {useState} from "react"
import Summarycards from "../models/Summarycards";
import { useNavigate } from "react-router-dom";


export default function Tasks() {
    const {getTasksByUserId, changeTaskStatus} = useProjects();
    const {user} = useAuth()
    const navigate = useNavigate()

    const [selectedFilter, setSelectedFilter] = useState("ALL");
    
        const myProjects = user
            ? getTasksByUserId(user.id)
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
          <h1>My Tasks</h1>

          <div className="summary-cards">
          
                          {/* TOTAL */}
                          <span onClick={() => setSelectedFilter("ALL")}>
                              <Summarycards
                                  title="Total Task assigned"
                                  value={myProjects.length}
                              />
                          </span>
          
                          {/* COMPLETED */}
                          <span onClick={() => setSelectedFilter("COMPLETED")}>
                              <Summarycards
                                  title="Total Completed Tasks"
                                  value={completedProjects.length}
                              />
                          </span>
          
                          {/* PENDING */}
                          <span onClick={() => setSelectedFilter("PENDING")}>
                              <Summarycards
                                  title="Total pending Tasks"
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
                                  <th>Task Title</th>
                                  <th>Status</th>
                                  <th>Priority</th>
                                  <th>Due Date</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
          
                          <tbody>
                              {filteredProjects.map((project) => (
                                  <tr key={project.id}>
                                      <td>{project.title}</td>
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
                                      
                                      <td>{project.dueDate}</td>
          
                                      <td>
                                          {project.status === "TODO" && (
                                              <button
                                                  onClick={() =>
                                                      changeTaskStatus(
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
                                                      changeTaskStatus(
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
                                                      changeTaskStatus(
                                                          project.id,
                                                          "IN_PROGRESS"
                                                      )
                                                  }
                                                  className="btn-primary"
                                              >
                                                  Mark as UnDone
                                              </button>
                                          )}
          
                    

                                          <button className="btn-secondary" onClick={()=> navigate("../task/"+project.id)}>
                                            view Details
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
    )
}