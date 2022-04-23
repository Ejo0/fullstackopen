import { useState } from "react"

const Blog = ({ blog }) => {
    const [fullView, setFullView] = useState(false)

    const toggleFullView = () => setFullView(!fullView)

    return (
        <div className="blog">
            {blog.title}; {blog.author} 
            <button onClick={toggleFullView}>{fullView ? 'Hide' : 'View'}</button><br/>
            {fullView
            ? (
                <div>
                    {blog.url}<br/>
                    Likes: {blog.likes} 
                    <button>Like</button><br/>
                    {blog.user.name}      
                </div>
            )
            : null}
        </div>
    )
}

export default Blog