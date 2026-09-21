import { useParams } from "react-router-dom"
import { useProjects } from "../../context/ProjectContext";

export default function ViewTask(){

    // const {id} = useParams();
    // const {tasks, getProjectById} = useProjects();

    // const data = tasks ? tasks.filter((t)=> t.id==id):[];
    // console.log(data)
    // const projectData = getProjectById(data ? data[0].projectId : null)
    // console.log(projectData);
    return (
        <>
        <h1>My task</h1>
        <div>
            {/* <h2>{{projectData[0].name}}</h2> */}
        </div>
        </>
    )
}