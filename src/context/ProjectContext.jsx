import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const API_URL = "http://localhost:3000/projects/";
const API_URL_TASKS = "http://localhost:3000/tasks/";


const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                setProjects(data);
                const taskres = await fetch(API_URL_TASKS);
                const taskdata = await taskres.json();
                setTasks(taskdata)
            } catch (err) {
                console.error("Failed to fetch projects", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [])


    const addProject = useCallback(async (project) => {


        let projectresponse = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!projectresponse.ok) {
            const errorData = await projectresponse.json().catch(() => null);
            console.error("project creation failed:", projectresponse.status, errorData);
            throw new Error(`Failed to create project: ${JSON.stringify(errorData)}`);
        }
        else {
            console.log("project created")
            projectresponse = await projectresponse.json()
            setProjects((prev) => [...prev, projectresponse]);
        }

        return projectresponse;
    }, []);


    const updateProject = useCallback(async (id, updates) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }, []);


    const deleteTask = useCallback(async (id) => {
        await fetch(`${API_URL_TASKS}/${id}`, { method: "DELETE" });
        setTasks((prev) => prev.filter((p) => p.id !== id));
    }, [])

    const deleteTaskByProjectId = useCallback(async (id) => {
        console.log(tasks);
        const deletetasks = tasks.filter((t) => t.projectId == id).map((t) => t.id);
        console.log(deletetasks);
        await Promise.all(
            deletetasks.map(async (taskId) => {
                const res = await fetch(API_URL_TASKS  + taskId, {
                    method: "delete"
                })

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    console.error("Task creation failed:", res.status, errorData);
                    throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`);
                }
                else {
                    setTasks((prev) => prev.filter((p) => p.id !== taskId));
                    console.log("tasks deleted")
                }

                return res.json();
            })
        )
    }, [tasks])

    const deleteProject = useCallback(async (id) => {
        const project = projects.find((p) => p.id === id);
        if (!project) return;

        await deleteTaskByProjectId(id);

        await fetch(`${API_URL}${id}`, { method: "DELETE" });
        setProjects((prev) => prev.filter((p) => p.id !== id));
    }, [projects, deleteTaskByProjectId]);


    const getProjectsByUser = useCallback(
        (userId) => {
            return projects.filter((project) =>
                project.members.some(
                    (memberId) => String(memberId) === String(userId)
                )
            );
        },
        [projects]
    );

    const addTasks = useCallback(async (allTasks) => {
        await Promise.all(
            allTasks.map(async (task) => {
                let res = await fetch(API_URL_TASKS, {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(task)
                })

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    console.error("Task creation failed:", res.status, errorData);
                    throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`);
                }
                else {
                    res = await res.json();
                    setTasks((prev) => [...prev, res]);
                    console.log("task created")
                }

            })
        )

    }, [])


    const changeProjectStatus = useCallback(
        async (projectId, newStatus) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/projects/${projectId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            status: newStatus
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to update project status");
                }

                const updatedProject = await response.json();

                setProjects((prev) =>
                    prev.map((project) =>
                        project.id === projectId
                            ? updatedProject
                            : project
                    )
                );

                return updatedProject;
            } catch (error) {
                console.error("Failed to change project status:", error);
                throw error;
            }
        },
        []
    );


    const changeTaskStatus = useCallback(
        async (projectId, newStatus) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/tasks/${projectId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            status: newStatus
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to update project status");
                }

                const updatedProject = await response.json();

                setTasks((prev) =>
                    prev.map((project) =>
                        project.id === projectId
                            ? updatedProject
                            : project
                    )
                );

                return updatedProject;
            } catch (error) {
                console.error("Failed to change project status:", error);
                throw error;
            }
        },
        []
    );





    const getTasksByProjectId = useCallback(
        (projectId) => {
            return tasks.filter((task) => task.projectId == projectId);
        },
        [tasks]
    );

    const getTasksByUserId = useCallback(
        (userId) => {
            return tasks.filter((task) => task.assignedTo == userId)
        },
        [tasks]
    )

    const deleteTaskById = useCallback(async (id)=>{
        let res = await fetch("http://localhost:3000/tasks/"+id,
        {method : "delete"}
       )
       if(res.ok){
        res=await res.json();
        const filter= tasks.filter((t)=> t.id != id);
        setTasks(filter)
       }
       else{
        console.log("error ocurred");
       }
    }, [tasks])

    const editProject = useCallback(async (id, data) => {
         let res = await fetch(API_URL+id, {
            method: "put",
            headers: {
                            "Content-Type": "application/json"
                        },
            body : JSON.stringify(data)

         })

         if(res.ok){
            res = await res.json();
            setProjects((prev) => prev.map((p)=> p.id==id? res : p));
            console.log("project edited")
         }
         else{
            console.log("error occured in updating project")
         }
    }, [])

const editTask = useCallback(async (id, data)=>{
    let res = await fetch(API_URL_TASKS+id,{
        method: "put",
            headers: {
                            "Content-Type": "application/json"
                        },
            body : JSON.stringify(data)
    })

    if(res.ok){
            res = await res.json();
            setTasks((prev) => prev.map((p)=> p.id==id? res : p));
            console.log("task edited")
         }
         else{
            console.log("error occured in updating project")
         }
})
    
const addOneTask = useCallback(async (data) =>{
    let res = await fetch(API_URL_TASKS,{
        method: "POST",
            headers: {
                            "Content-Type": "application/json"
                        },
            body : JSON.stringify(data)
    })

    if(res.ok){
            res = await res.json();
            setTasks((prev) => [...prev, res]);
            console.log("task created")
            
         }
         else{
            console.log("error occured in updating project")
         }
})


    const summary = useMemo(() => {
        const totalProjects = projects;
        const todoProjects = projects.filter((p) => p.status === 'TODO');
        const inprogressProjects = projects.filter((p) => p.status === 'IN_PROGRESS');
        const doneProjects = projects.filter((p) => p.status === 'DONE');
        const highProjects = projects.filter((p) => p.priority === 'HIGH');
        const mediumProjects = projects.filter((p) => p.priority === 'MEDIUM');
        const lowProjects = projects.filter((p) => p.priority === 'LOW');
        const data = {
            totalProjects,
            todoProjects,
            inprogressProjects,
            doneProjects,
            highProjects,
            mediumProjects,
            lowProjects
        }

        console.log(data)

        return data;
    }, [projects])

    const getProjectById = useCallback((id) => {
        return projects.filter((p) => p.id == id);
    }, [projects])

    const value = useMemo(
        () => ({
            projects,
            loading,
            summary,
            tasks,
            addProject,
            updateProject,
            deleteProject,
            getProjectsByUser,
            addTasks,
            changeProjectStatus,
            getTasksByProjectId,
            getTasksByUserId,
            changeTaskStatus,
            getProjectById,
            deleteTaskById,
            editProject,
            editTask,
            addOneTask
        }),
        [projects, loading, summary, tasks, addProject, updateProject, deleteProject, getProjectsByUser, addTasks, changeProjectStatus, getTasksByProjectId, getTasksByProjectId, changeTaskStatus, getProjectById, deleteTaskById, editProject, editTask, addOneTask]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;


}

export function useProjects() {
    const ctx = useContext(ProjectContext);
    if (!ctx) throw new Error("useProjects must be used inside <ProjectProvider>");
    return ctx;
}