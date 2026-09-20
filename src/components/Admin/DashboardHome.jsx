// import { useState, useMemo } from "react";
// import { useProjects } from "../../context/ProjectContext";
// import Summarycards from "../models/Summarycards";

// export default function DashboardHome() {
//     const { summary, projects } = useProjects();

//     // store the key of the selected card, not a copy of the data
//     // const [selected, setSelected] = useState(null);   // e.g. "doneProjects"

//     // const recentProjects = useMemo(() => {
//     //     const source = selected ? summary[selected] : projects;

//     //     return [...source]
//     //         .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//     //         .slice(0, 5);
//     // }, [projects, summary, selected]);


//     const [filtered, setFiltered] = useState(projects);


//     function toggle(filterProjects){
//         console.log("toggle called")
//         setFiltered(filterProjects)
//     }

    

//     return (
//         <>
//             <div>
//                 <Summarycards title="Total Projects" value={summary.totalProjects.length}
//                     onClick={() => setSelected(projects)} />
//                 <Summarycards title="In-Progress Projects" value={summary.inprogressProjects.length}
//                     onClick={() => toggle(summary.inprogressProjects)} />
//                 <Summarycards title="Completed Projects" value={summary.doneProjects.length}
//                     onClick={() => toggle(summary.doneProjects)} />
//                 <Summarycards title="High Priority Projects" value={summary.highProjects.length}
//                     onClick={() => toggle(summary.highProjects)} />
//                 <Summarycards title="Medium Priority Projects" value={summary.mediumProjects.length}
//                     onClick={() => toggle(summary.mediumProjects)} />
//                 <Summarycards title="Low Priority Projects" value={summary.lowProjects.length}
//                     onClick={() => toggle(summary.lowProjects)} />
//             </div>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Project</th>
//                         <th>Total members</th>
//                         <th>Start date</th>
//                         <th>Due date</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//                        .slice(0, 5).map((p) => (
//                         <tr key={p.id}>
//                             <td>{p.name}</td>
//                             <td>{p.members.length}</td>
//                             <td>{p.startDate}</td>
//                             <td>{p.dueDate}</td>
//                             <td>{p.status}</td>
//                             <th>{p.priority}</th>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// }



import { useState, useMemo } from "react";
import { useProjects } from "../../context/ProjectContext";
import Summarycards from "../models/Summarycards";

export default function DashboardHome() {
    const { summary, projects } = useProjects();

    const [selected, setSelected] = useState(null);   // e.g. "doneProjects"

    const recentProjects = useMemo(() => {
        const source = selected ? summary[selected] : projects;

        return [...source]                             // copy before sorting
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .slice(0, 5);
    }, [projects, summary, selected]);

    return (
        <>
            <div>
                <button onClick={() => setSelected(null)}>
                    <Summarycards title="Total Projects" value={summary.totalProjects.length} />
                </button>
                <button onClick={() => setSelected("inprogressProjects")} >
                   <Summarycards title="In-Progress Projects" value={summary.inprogressProjects.length}/>
                </button>
                <button onClick={() => setSelected("doneProjects")} >
                    <Summarycards title="Completed Projects" value={summary.doneProjects.length}/>
                </button>
                <button onClick={() => setSelected("highProjects")}>
                    <Summarycards title="High Priority Projects" value={summary.highProjects.length} />
                </button>
                <button onClick={() => setSelected("mediumProjects")}>
                    <Summarycards title="Medium Priority Projects" value={summary.mediumProjects.length} />
                </button>
                <button  onClick={() => setSelected("lowProjects")}>
                     <Summarycards title="Low Priority Projects" value={summary.lowProjects.length} />
                </button>
            </div>

            <table>
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
                            <td>{p.status}</td>
                            <td>{p.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}