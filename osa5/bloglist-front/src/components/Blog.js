import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
    const [fullView, setFullView] = useState(false)

    const toggleFullView = () => setFullView(!fullView)
    const addLike = () => handleLike(blog)

    return (
        <div className="blog">
            {blog.title}; {blog.author} 
            <button onClick={toggleFullView}>{fullView ? 'Hide' : 'View'}</button><br/>
            {fullView
            ? (
                <div>
                    {blog.url}<br/>
                    Likes: {blog.likes} 
                    <button onClick={addLike}>Like</button><br/>
                    {blog.user.name}      
                </div>
            )
            : null}
        </div>
    )
}

export default Blog