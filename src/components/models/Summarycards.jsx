import './Summarycard.css'
export default function Summarycards(props){
    return (
        <>
        
           <div className="summary">
            <h4>{props.title}</h4>
            <h2>{props.value}</h2>
           </div>
        </>
    )
}