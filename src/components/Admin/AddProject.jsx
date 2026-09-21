import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";

export default function AddProject() {
    const projectId = useParams().id;
    console.log(projectId)
    const navigate = useNavigate();
    const {allUser}= useAuth();
    const {addProject, addTasks, getProjectById, getTasksByProjectId, deleteTaskById, editProject, editTask, addOneTask} = useProjects();
    const [tasks, setTasks] = useState(projectId ? getTasksByProjectId(projectId): [])
    const projectData = projectId ? getProjectById(projectId)[0] : null;
    const taskData = projectId ? getTasksByProjectId(projectId) : null;



    const addTask = () => {
        setTasks([
            ...tasks,
            { title: "", description: "", assignedTo: "", dueDate: "", priority: "MEDIUM" },
        ]);
    };



    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));

    };

    const updateTask = (index, field, value) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    async function deleteTask(id){
       const check = confirm("Are you sure you want to delete this task?")
       if(check){
          deleteTaskById(id);
          setTasks(tasks.filter((t)=> t.id != id));
       }
    }


    const handleSubmit = async (formdata) => {
        if(!projectId){
        const projectData = Object.fromEntries(formdata.entries());
        console.log(projectData)
        console.log(tasks)

        const project = {
            ...projectData,
            status: "TODO",
            members: [...tasks.map((t) => t.assignedTo)]
        }

        const projectresponse = await addProject(project);


        const allTask = tasks.map((t) => {
            return { ...t, status: "TODO", projectId: projectresponse.id }
        })

        const taskResponse = addTasks(allTask);
    }
    else{
        console.log("edit task called")
    //     const projectData = Object.fromEntries(formdata.entries());
       
        
    //    for(let i=0; i<tasks.length; i++){
    //     if(tasks[i].id){
    //         await editTask(tasks[i].id, tasks[i])
    //     }
    //     else{
    //         const res = await addOneTask(task[i])
    //         projectData.members.push(task[i].assignedTo);
    //     }
    //    }

    //      await editProject(projectId, projectData);
    //    console.log("task edited")
        
    }
     
    navigate(-1);
    
    }
    return (
        <div className="page">
            <h1 className="page-title">{projectId ? "Edit Project" : "Add Project"}</h1>
            <form action={handleSubmit}>
                <input type="text" name="name" placeholder="Enter project name" value={projectData && projectData.name} required />
                <textarea placeholder="Give discription about the project" name="description" value={projectData && projectData.description} required />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                Start date:<input type="date" name="startDate" value={projectData && projectData.startDate } required />
    
                Due date:<input type="date" name="dueDate" value={projectData && projectData.dueDate} required />
                
                    Set Priority
                    <select name="priority" value={projectData && projectData.priority}>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                
                </div>
                <br/>
                <hr />

                <button type="button" onClick={addTask} className="btn-secondary" style={{margin : 10}} >Add Task</button>
                {tasks.map((task, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <h4>Task {index + 1}</h4>

                        <input

                            type="text"
                            placeholder="Task title"
                            value={task.title}
                            onChange={(e) => updateTask(index, "title", e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Task description"
                            value={task.description}
                            onChange={(e) => updateTask(index, "description", e.target.value)}
                            required
                        ></textarea>

                        <select
                            value={task.assignedTo}
                            onChange={(e) => updateTask(index, "assignedTo", e.target.value)}
                            //disabled={loadingUsers}
                            required
                        >
                            <option value="">
                                {/* {loadingUsers ? "Loading users..." : "Select user"} */}
                                Select user
                            </option>
                            {allUser.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        <label>
                            Due date:
                            <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) => updateTask(index, "dueDate", e.target.value)}
                                required
                            />

                        </label>
                        <select
                            value={task.priority}
                            onChange={(e) => updateTask(index, "priority", e.target.value)}
                        >
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>

                        <button type="button" onClick={() => projectId? deleteTask(task.id): removeTask(index)} className="btn-danger">
                            Remove Task
                        </button>
                    </div>
                ))}

             
                {projectId? <button type="submit" className="btn-primary">Edit Project</button> :<button type="submit" className="btn-primary">Create Project</button>}
            </form>


        </div>
    )
    }