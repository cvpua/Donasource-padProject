import React,{ useState } from 'react'

export const UserContext = React.createContext(null)

const UserProvider = ({children}) => {
	const [user, setUser] = useState({})
	const [token, setToken] = useState({})

	const store = {
		user: [user, setUser],
		token: [token, setToken],
	}

	return (
		<UserContext.Provider value={store} >
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider