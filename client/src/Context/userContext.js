import React from 'react'

const UserContext = React.createContext()
class UserProvider extends React.Component {
    // Context state
    state = {
        user: {name:'guest'},
    }

    // Method to update state
    setUser = user  => {
        this.setState(prevState => ({ user }))
    }

    render() {
        const { children } = this.props
        const { user } = this.state
        const { setUser } = this

        return (
            <UserContext.Provider
                value={{
                    user,
                    setUser,
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer

export {UserProvider, UserConsumer}
// export const UserProvider = UserContext.Provider



