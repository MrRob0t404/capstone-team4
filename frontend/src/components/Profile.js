import React from 'react'; 

class Profile extends React.Component { 
    constructor() {
        super()
        this.setState={
            userName: "",
            userBio: ""
        }
    }

    render () {
        return (
            <div>
                Profile
            </div>
        )
    }
}

export default Profile; 