import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
    const [projects, setProjects] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            let data = await fetch('http://localhost:3000/projects')
            data = await data.json();
            setProjects(data);
        }

        fetchData();
        console.log("useeffect of project")
    }, [])

    const calculateSummary = useMemo((status) => {
        return
    })

    async function deleteProject(id) {
        await fetch("http://localhost:3000/projects/" + id, {
            method: "delete"
        })
        const filteredProjects = projects.filter((p) => p.id !== id);
        setProjects(filteredProjects);
    }

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
            <th>{p.status}</th>
            <th>
                <button onClick={() => editProject(p.id)}>Edit</button>
                <button onClick={() => deleteProject(p.id)}>delete</button>
            </th>
        </tr>)
    }) : null;


    return (
        <>
            <h1>Projects</h1>
            <button onClick={() => navigate('../add-project')}>Create new project</button>


            <div className="summary">

            </div>

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
        </>
    )
}