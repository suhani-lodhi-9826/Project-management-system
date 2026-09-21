import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectContext'

export default function Projects() {
    const { projects, deleteProject } = useProjects();

    const navigate = useNavigate();



    async function editProject(id) {
        navigate("../edit-project/" + id)
    }


    console.log(projects)
    const projectElement = projects ? projects.map((p) => {
        return (<tr key={p.id}>
            <th>{p.name}</th>
            <th>{p.members.length}</th>
            <th>{p.startDate}</th>
            <th>{p.dueDate}</th>
            <td>
                <span className={`status status-${p.status.toLowerCase()}`}>
                    {p.status}
                </span>
            </td>
            <th>
                <button onClick={() => editProject(p.id)} className="btn-secondary">View</button>
                <button onClick={() => deleteProject(p.id)} className="btn-danger" style={{ marginLeft: 10 }} >delete</button>
            </th>
        </tr>)
    }) : null;


    return (
        <>
            <div className="project-header">
                <h1>Projects</h1>
                <button onClick={() => navigate('../add-project')} className="btn-primary">
                    Create new project
                </button>
            </div>
            <br />
            <br />


            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>total members</th>
                        <th>Start_date</th>
                        <th>Due_date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projectElement}
                </tbody>
            </table>

            {
                projects.length === 0 &&
                <p>No projects to display...</p>
            }
        </>
    )
}