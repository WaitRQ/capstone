import React from 'react'
import {updateUser, deleteUser} from '../store/user'
import {connect} from 'react-redux'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      address: this.props.user.address
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userName">Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="userEmail">Email:</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor="userAddress">Address:</label>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          />

          <button type="submit">update my profile</button>
        </form>
        <button
          type="submit"
          onClick={() => this.props.deleteUser(this.props.user.id)}
        >
          delete account
        </button>
        <h2>Danger Zone!!</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUser(userId)),
    updateUser: (id, user) => dispatch(updateUser(id, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
