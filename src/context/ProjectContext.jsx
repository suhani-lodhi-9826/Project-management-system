import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const API_URL = "http://localhost:3000/projects";
const API_URL_TASKS = "http://localhost:3000/tasks";


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
                const res = await fetch(API_URL_TASKS + "/" + taskId, {
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

        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setProjects((prev) => prev.filter((p) => p.id !== id));
    }, [projects, deleteTaskByProjectId]);


    const getProjectsByUser = useCallback(
        (userId) => projects.filter((p) => p.members.includes(userId)),
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


    const summary = useMemo(()=>{
          const totalProjects = projects;
          const todoProjects = projects.filter((p)=> p.status === 'TODO');
          const inprogressProjects = projects.filter((p)=> p.status === 'IN_PROGRESS');
          const doneProjects = projects.filter((p)=> p.status === 'DONE');
          const highProjects = projects.filter((p)=> p.priority === 'HIGH');
          const mediumProjects = projects.filter((p)=> p.priority === 'MEDIUM');
          const lowProjects = projects.filter((p)=> p.priority === 'LOW');
          const data ={
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



    const value = useMemo(
        () => ({
            projects,
            loading,
            summary,
            addProject,
            updateProject,
            deleteProject,
            getProjectsByUser,
            addTasks
        }),
        [projects, loading, summary, addProject, updateProject, deleteProject, getProjectsByUser, addTasks]
    );

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;


}

export function useProjects() {
    const ctx = useContext(ProjectContext);
    if (!ctx) throw new Error("useProjects must be used inside <ProjectProvider>");
    return ctx;
}