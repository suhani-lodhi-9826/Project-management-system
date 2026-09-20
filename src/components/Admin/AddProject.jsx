import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";

export default function AddProject() {
    const projectId = useParams().id;
    const location = useLocation().pathname;
    console.log(location);
    const editpage = "/admin/dashboard/edit-project/2";
    const addpage = "/admin/dashboard/add-project";
    const navigate = useNavigate();
    const {allUser}= useAuth();
    const {addProject, addTasks} = useProjects();
    const [tasks, setTasks] = useState([])
    const [currProject, setCurrProject] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            // try {
            //     const res = await fetch("http://localhost:3000/users");
            //     const data = await res.json();
            //     setUsers(data);

            // } catch (err) {
            //     console.error("Failed to fetch users", err);
            // } finally {
            //     setLoadingUsers(false);
            // }

            if(projectId){
                let project = await fetch("http://localhost:3000/projects/"+projectId);
                project= await project.json();
                setCurrProject(project)
                console.log(project);

              
            }
           
        };
        fetchUsers();
    }, []);


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

    const handleSubmit = async (formdata) => {
        if(location==addpage){
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
     
    navigate(-1);
    
    }
    return (
        <>
            <h1>{location==addpage ? "Add Project" : "Edit Project"}</h1>
            <form action={handleSubmit}>
                <input type="text" name="name" placeholder="Enter project name" required />
                <textarea placeholder="Give discription about the project" name="description" required />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                Start date:<input type="date" name="startDate" required />
    
                Due date:<input type="date" name="dueDate" required />
                
                    Set Priority
                    <select name="priority">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                
                </div>
                <hr />

                <button type="button" onClick={addTask}>Add Task</button>
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

                        <button type="button" onClick={() => removeTask(index)} className="btn-danger">
                            Remove Task
                        </button>
                    </div>
                ))}


                <button type="submit" className="btn-primary">Create Project</button>
            </form>


        </>
    )
    }