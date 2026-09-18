import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom";

export default function AddProject() {
    const projectId = useParams().id;
    const location = useLocation().pathname;
    console.log(location);
    const editpage = "/admin/dashboard/edit-project/2";
    const addpage = "/admin/dashboard/add-project";
    console.log(projectId);
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [currProject, setCurrProject] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:3000/users");
                const data = await res.json();
                setUsers(data);

            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoadingUsers(false);
            }

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


        let projectresponse = await fetch("http://localhost:3000/projects", {
            method: 'Post',
            body: JSON.stringify(project)
        })

        if (!projectresponse.ok) {
            const errorData = await projectresponse.json().catch(() => null);
            console.error("project creation failed:", projectresponse.status, errorData);
            throw new Error(`Failed to create project: ${JSON.stringify(errorData)}`);
        }
        else {
            console.log("project created")
            projectresponse = await projectresponse.json()
            console.log(projectresponse)
        }



        const allTask = tasks.map((t) => {
            return { ...t, status: "TODO", projectId: projectresponse.id }
        })

        const taskResponse = await Promise.all(
            allTask.map(async (task) => {
                const res = await fetch("http://localhost:3000/tasks", {
                    method: "post",
                    body: JSON.stringify(task)
                })

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    console.error("Task creation failed:", res.status, errorData);
                    throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`);
                }
                else {
                    console.log("task created")
                }

                return res.json();
            })
        )
    }
    else if(location==editpage){

    }


        setTasks([])
    }

    return (
        <>
            <form action={handleSubmit}>
                <input type="text" name="name" placeholder="Enter project name" required />
                <textarea placeholder="Give discription about the project" name="description" required />
                <label>Start date:
                    <input type="date" name="startDate" required />
                </label>
                <label>Due date:
                    <input type="date" name="dueDate" required />
                </label>
                <label >
                    Set Priority
                    <select name="priority">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </label>
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
                            disabled={loadingUsers}
                            required
                        >
                            <option value="">
                                {loadingUsers ? "Loading users..." : "Select user"}
                            </option>
                            {users.map((user) => (
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
                        </select>title

                        <button type="button" onClick={() => removeTask(index)}>
                            Remove Task
                        </button>
                    </div>
                ))}


                <button type="submit">Create Project</button>
            </form>


        </>
    )
}