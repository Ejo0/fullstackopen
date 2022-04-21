const BlogForm = ({handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl}) => (
    <div>
        <form onSubmit={handleCreateBlog}>
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

export default BlogForm