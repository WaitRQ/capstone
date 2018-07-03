import React, {Component} from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {NewReservationStyle} from './style'
import {connect} from 'react-redux'
import {logout} from '../store'
import Payment from './payment'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      thousandSeparator
      prefix="$"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

class NewReservation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018-06-26',
      time: '07:30',
      price: '20',
      booked: false
    }
  }

  setTimeDate = () => {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()
    var hour = today.getHours()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    if (hour < 10) {
      hour = '0' + hour
    }

    this.setState({
      date: yyyy + '-' + mm + '-' + dd,
      time: hour + ':00'
    })
  }

  componentDidMount() {
    this.setTimeDate()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handlePaid = () => {
    this.setState({booked: true})
  }

  handleNewRes = () => {
    this.setTimeDate()
    this.setState({booked: false})
  }

  render() {
    console.log('in new Reservation')
    const {classes} = this.props
    const {price, date, time} = this.state
    return (
      <div className="max-width-2 mx-auto">
        <div className="py2">
          <Typography variant="title" color="primary" component="h3">
            Make a new Reservation
          </Typography>
        </div>
        <div className="pb2">
          <Paper className={classes.root} elevation={1}>
            <form
              className={classes.container}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <div className="block">
                <TextField
                  id="date"
                  label="Reservation Date"
                  type="date"
                  value={date}
                  onChange={this.handleChange('date')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className="block">
                <TextField
                  id="time"
                  label="Reservation Time"
                  type="time"
                  value={time}
                  onChange={this.handleChange('time')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </div>
              <div className="block">
                <TextField
                  className={classes.formControl}
                  label="Reservation Price"
                  value={price}
                  onChange={this.handleChange('price')}
                  id="price"
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />
              </div>
            </form>
          </Paper>
        </div>
        <div className="center">
          {this.state.booked ? (
            <MuiThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                onClick={this.handleNewRes}
              >
                Reservation Created!
              </Button>
            </MuiThemeProvider>
          ) : (
            <Payment
              {...this.state}
              {...this.props.location}
              userId={this.props.userId}
              handlePaid={this.handlePaid}
            />
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    userName: state.user.name
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: evt => {
      evt.preventDefault()
      dispatch(logout())
    }
  }
}

export default withStyles(NewReservationStyle)(
  connect(mapState, mapDispatch)(NewReservation)
)

/**
 * PROP TYPES
 */
NewReservation.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

// return (
//   <div className="max-width-2 mx-auto">
//     <div className="py2">
//       <Typography variant="headline" component="h3">
//         Make a new reservation
//       </Typography>
//       <Typography variant="subheading">
//         {this.props.location.name}
//       </Typography>
//     </div>
//     <div className="pb2">
//       <Paper className={classes.root} elevation={1}>
//         <form
//           className={classes.container}
//           noValidate
//           onSubmit={this.handleSubmit}
//         >
//           <div className="block">
//             <TextField
//               id="date"
//               label="Reservation Date"
//               type="date"
//               value={date}
//               onChange={this.handleChange('date')}
//               className={classes.textField}
//               InputLabelProps={{
//                 shrink: true
//               }}
//             />
//           </div>
//           <div className="block">
//             <TextField
//               id="time"
//               label="Reservation Time"
//               type="time"
//               value={time}
//               onChange={this.handleChange('time')}
//               className={classes.textField}
//               InputLabelProps={{
//                 shrink: true
//               }}
//               inputProps={{
//                 step: 300 // 5 min
//               }}
//             />
//           </div>
//           <div className="block">
//             <TextField
//               className={classes.formControl}
//               label="Reservation Price"
//               value={price}
//               onChange={this.handleChange('price')}
//               id="price"
//               InputProps={{
//                 inputComponent: NumberFormatCustom
//               }}
//             />
//           </div>
//         </form>
//       </Paper>
//     </div>
//     <div className="center">
//       {this.state.booked ? (
//         <MuiThemeProvider theme={theme}>
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.margin}
//             onClick={this.handleNewRes}
//           >
//             Reservation Created!
//           </Button>
//         </MuiThemeProvider>
//       ) : (
//         <Payment
//           {...this.state}
//           {...this.props.location}
//           userId={this.props.userId}
//           handlePaid={this.handlePaid}
//         />
//       )}
//     </div>
//   </div>
// )
// }
// }
