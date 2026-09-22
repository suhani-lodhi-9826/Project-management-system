import { useParams } from "react-router-dom"
import { useProjects } from "../../context/ProjectContext";

export default function ViewTask(){
    const {id}= useParams();
    const {getTaskById, getProjectById} = useProjects()

    const taskData = getTaskById(id)[0];
    console.log(taskData);
    const project = getProjectById(taskData.projectId)?.[0];
    return (
        <>
        <h1>My task</h1>
       {
        taskData? <div className="project-card card" key={taskData.id}>
                    <h2>{taskData.title}</h2>
                    <p>Description : {taskData.description}</p>
                    <p>Due-date : {taskData.dueDate}</p>
                    <p>Status : {taskData.status}</p>
                    <p>Priority : {taskData.priority}</p>
                </div>
        : <p>Task details not found</p>
       }
        <h2 className="subtitle">Project details</h2>
        {project ? <div className="project-card card">
            <h2>Project-Title : {project.name}</h2>
            <p>Project-description : {project.description}</p>
            <p>Start-Date : {project.startDate}</p>
            <p>End-Date : {project.dueDate}</p>
            <p>Status : {project.status}</p>
            <p>Priority : {project.priority}</p>

        </div>: <p>Project Details not found...</p>}
        </>
    )
}