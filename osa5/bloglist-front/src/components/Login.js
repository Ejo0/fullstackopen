import { useState } from "react"

const Login = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async (event) => {
        event.preventDefault()
        const credentials = {username, password}
        if (await handleLogin(credentials)) {
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <div>
                    <span>Username: </span>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <span>Password: </span>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default Login