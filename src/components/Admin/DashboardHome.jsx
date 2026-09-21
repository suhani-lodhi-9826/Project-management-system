
import { useState, useMemo } from "react";
import { useProjects } from "../../context/ProjectContext";
import Summarycards from "../models/Summarycards";

export default function DashboardHome() {
    const { summary, projects } = useProjects();

    const [selected, setSelected] = useState(null);   

    const recentProjects = useMemo(() => {
        const source = selected ? summary[selected] : projects;

        return [...source]                             
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .slice(0, 5);
    }, [projects, summary, selected]);

    return (
        <>
            <h1>Dashboard</h1>
            <div className="summary-cards">
                <span onClick={() => setSelected(null)}>
                    <Summarycards title="Total Projects" value={summary.totalProjects.length} />
                </span>
                <span onClick={() => setSelected("inprogressProjects")} >
                   <Summarycards title="In-Progress Projects" value={summary.inprogressProjects.length}/>
                </span>
                <span onClick={() => setSelected("doneProjects")} >
                    <Summarycards title="Completed Projects" value={summary.doneProjects.length}/>
                </span>
                <span onClick={() => setSelected("highProjects")}>
                    <Summarycards title="High Priority Projects" value={summary.highProjects.length} />
                </span>
                <span onClick={() => setSelected("mediumProjects")}>
                    <Summarycards title="Medium Priority Projects" value={summary.mediumProjects.length} />
                </span>
                <span  onClick={() => setSelected("lowProjects")}>
                     <Summarycards title="Low Priority Projects" value={summary.lowProjects.length} />
                </span>
            </div>

            <table style={{ marginTop: "50px"}}>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Total members</th>
                        <th>Start date</th>
                        <th>Due date</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProjects.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.members.length}</td>
                            <td>{p.startDate}</td>
                            <td>{p.dueDate}</td>
                            <td>
                                <span className={`status status-${p.status.toLowerCase()}`}>
                                     {p.status}
                                </span>
                            </td>
                            <td>
                                <span className= {p.priority ? `priority priority-${p.priority.toLowerCase()}` : ''}>
                                    {p.priority}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {recentProjects.length===0 && 
            <p>Np projects to display...</p>
            }
        </>
    );
}