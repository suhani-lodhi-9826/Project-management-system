import { useProjects } from "../../context/ProjectContext"

export default function UserCards(props){

    const {getProjectsByUser} = useProjects();

    const projects = getProjectsByUser(props.user.id);



    const details = {
        total: projects.length,
        completed : projects.filter(p => p.status == 'DONO').length,
        pending : projects.filter(p => p.status=='IN_PROGRESS' || p.status == 'TODO').length
    }

  

    return (
        <>
          <div className="card user">
            <h3>{props.user.name}</h3>
            <p>{props.user.email}</p>
            <h4>Total projects: {details.total}</h4>
            <h4>Total Completed Projects : {details.completed}</h4>
            <h4>Total Pending Projects : {details.pending}</h4>
          </div>
        </>
    )
}