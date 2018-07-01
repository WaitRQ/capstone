import React from 'react'

const EditProfile = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="userName">Name:</label>
      <input
        name="userName"
        type="text"
        value={props.userName}
        onChange={props.handleChange}
      />

      <label htmlFor="userEmail">Email:</label>
      <input
        name="userEmail"
        type="text"
        value={props.userEmail}
        onChange={props.handleChange}
      />

      <label htmlFor="userAddress">Address:</label>
      <input
        name="userAddress"
        type="text"
        value={props.userAddress}
        onChange={props.handleChange}
      />

      <button type="submit">update my profile</button>
    </form>
    <button type="submit">delete account</button>
    <div>Danger Zone!!</div>
  </div>
)

export default EditProfile
