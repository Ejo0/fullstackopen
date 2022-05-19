export const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>Has {anecdote.votes} votes</p>
    <p>For more info see {anecdote.info}</p>
  </div>
)
