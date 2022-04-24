import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({handleCreateBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {title, author, url}
        if (await handleCreateBlog(newBlog)) {
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
        <form onSubmit={handleCreate}>
            <div>
                <span>Title: </span>
                <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({target}) => setTitle(target.value)}>
                </input>
            </div>
            <div>
                <span>Author: </span>
                <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({target}) => setAuthor(target.value)}>
                </input>
            </div>
            <div>
                <span>Url: </span>
                <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({target}) => setUrl(target.value)}>
                </input>
            </div>
            <button type="submit">Create</button>
        </form>
        </div>
    )

}

BlogForm.porpTypes = {
    handleCreateBlog: PropTypes.func.isRequired
}

export default BlogForm