import PropTypes from 'prop-types';
import React from 'react';
//import './currencyInput.css';

function AllUsersInput(props){
    return (
        <div className="flexGrow">
            
            <select value={props.user} onChange={event => props.onUserChange(event.target.value)}>

                {props.users.map((user => 
                    <option key={user.username} value={user.username}>{user.username}</option>
                ))}

            </select>
        </div>
    )
}

AllUsersInput.propTypes = {
    user: PropTypes.object,
    users: PropTypes.array,
    onUserChange : PropTypes.func,
}

export default AllUsersInput;