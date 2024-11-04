 const Chapter = ({chapter})=>{
    const parts = chapter.parts;
    const renderParts = ()=>{
        return parts.map(part => 
            <h3 key={part.id}>{part.name} {part.exercises}</h3>
        )
    }
    const total = ()=>{
        return parts.reduce((sum, part) => sum + part.exercises,0)
    }
    return(
        <div>
            <h1>{chapter.id}. {chapter.name}</h1>
            <div>
                {renderParts()}             
            </div>
            <h5>Total of {total()}</h5>
        </div>
    )
}
const Course = ({course})=>{
    return(
        <div>
            {(course.map(chapter => (
                <Chapter key={chapter.id} chapter = {chapter}></Chapter>
            )))}
        </div>
    )
}
export default Course