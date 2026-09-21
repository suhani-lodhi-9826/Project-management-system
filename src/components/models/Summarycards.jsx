
export default function Summarycards(props){
    return (
        <>
        
           <div className="summary card">
            <h4>{props.title}</h4>
            <h2>{props.value}</h2>
           </div>
        </>
    )
}