const Login = ({ handleLogin, username, setUsername, password, setPassword}) => (
    <div>
        <form onSubmit={handleLogin}>
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

// eslint-disable-next-line import/no-anonymous-default-export
export default Login