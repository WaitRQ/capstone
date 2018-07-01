import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EditReservation from './EditReservation'

import {withStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {LocationStyles} from './style'

import Typography from '@material-ui/core/Typography'
import Event from '@material-ui/icons/Event'

import Button from '@material-ui/core/Button'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'

class LocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  handleClick = async () => {
    event.preventDefault()
    const id = this.props.user.id
    const price = this.state.price
    const updateObj = {id, price}
    await this.props.editReservation(updateObj)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const openReservations = this.props.allOpenReservations.filter(
      reservation => {
        return reservation.locationId === this.props.location.id
      }
    )

    console.log('this.props', this.props)
    var editable = false
    var currentRes = {}

    const {classes} = this.props

    return (
      <>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="headline" color="primary">
              Reservations Page
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item sm>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
                height: 600,
                overflow: 'auto'
              }}
            >
              {openReservations.map(item => {
                if (this.props.user.id === item.id) {
                  editable = true
                  currentRes = item
                }
                return (
                  <Fragment key={item.id}>
                    <Typography
                      style={{marginTop: 10}}
                      variant="headline"
                      color="primary"
                    >
                      Price: ${item.price}
                      <Button
                        style={{float: 'right'}}
                        mini
                        variant="fab"
                        color="primary"
                        aria-label="add"
                      >
                        <Event />
                      </Button>
                    </Typography>

                    <List component="ul">
                      <ListItem button>
                        <ListItemText primary={`Time: ${item.time}`} />
                      </ListItem>
                      <ListItem button component="a" href="#simple-list">
                        <ListItemText primary={`Date: ${item.date}`} />
                      </ListItem>
                    </List>
                    <Divider />
                  </Fragment>
                )
              })}
            </Paper>
          </Grid>

          <Grid item sm>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginBottom: 10,
                marginRight: 10,
                height: 150
              }}
            >
              <Typography variant="headline" color="primary">
                Welcome {this.props.user.name}!
              </Typography>
              <Typography variant="subheading" color="primary">
                Your location: {this.props.location.name}
              </Typography>
              <Typography variant="subheading" color="primary">
                {this.props.location.address}
              </Typography>
            </Paper>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginBottom: 10,
                marginRight: 10,
                height: 400
              }}
            >
              {editable ? (
                <Fragment>
                  <Typography variant="headline" color="primary">
                    Your Reservation
                  </Typography>
                  <EditReservation currentRes={currentRes} />
                </Fragment>
              ) : (
                <Typography variant="headline" color="primary">
                  You currently have no pending reservations
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Paper style={{marginRight: 10, marginLeft: 10}}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="All" />
            <Tab label="Price" />
            <Tab label="Date" />
          </Tabs>
        </Paper>
      </>
    )
  }
}

//   render() {
//
//     console.log("This is my user id", this.props.user)
//
//     const openReservations = this.props.allOpenReservations.filter(
//       reservation => {
//         return reservation.locationId === this.props.location.id
//       }
//     )
//
//    var editButton = false
//    var editable = false
//
//     const {classes} = this.props
//     return (
//       <Paper style={{backgroundColor: '#DED7D7', width: '100', height: '100'}}>
//         <List>
//           <ListItem>
//             <FormControl
//               style={{backgroundColor: 'white'}}
//               fullWidth
//               className={classes.margin}
//             >
//               <Input
//                 id="adornment-amount"
//                 value={`${this.props.location.name}  ${
//                   this.props.location.address
//                 }`}
//               />
//             </FormControl>
//           </ListItem>
//         </List>
//
//         <Grid container className={classes.cont} style={{backgroundColor: '#DED7D7'}}>
//           <Grid item md={6}>
//             <Paper
//               style={{
//
//                 padding: 20,
//                 marginTop: 10,
//                 marginLeft: 20,
//                 marginRight: 20
//               }}
//             >
//               <Card className={classes.card}>
//                 <CardMedia
//                   className={classes.media}
//                   image="https://cbsnewyork.files.wordpress.com/2014/09/455720728.jpg?w=594"
//                   title="Why Wait Online?"
//                 />
//               </Card>
//             </Paper>
//           </Grid>
//
//           <Grid item md={6}>
//             <Paper
//               style={{
//                 padding: 20,
//                 marginTop: 10,
//                 marginRight: 20,
//                 marginBottom: 20
//
//               }}
//             >
//
//               <List className={classes.ListBox}>
//                 {openReservations.map((item, n) => {
//                 if (this.props.user.id === item.id){
//                   editButton = true
//                   editable = true
//
//
//                 }
//                  return (
//                    <div className={classes.row} key={n}>
//                       <ListItem >
//                       <div>
//
//
//                           <Typography  variant="subheading" gutterBottom>
//                           {`Date: ${item.date}_______  Time: ${item.time}_______  Contact: ${item.seller.name}`}
//                           </Typography>
//                           <br/>
//                           {editable ?
//                           <Input
//                              id="price"
//                              name='price'
//                              value={this.state.price}
//                              onChange={this.handleChange}
//                           />
//                            :
//                            <Input
//                               value={item.price}
//                             />
//                           }
//
//                         </div>
//
//                         <Button
//
//                           variant="contained"
//                           color="primary"
//                           className={classes.button}
//                         >
//                           Reserve
//                         </Button>
//                       </ListItem>
//
//                     </div>
//                   )
//
//
//                 })}
//
//               </List>
//
//               <Button
//                 style={{marginTop: 20}}
//                 variant="contained"
//                 color="secondary"
//                 onClick={this.handleClick}
//                 className={classes.button}
//               >
//                 Make New Reservation
//                 <Event className={classes.rightIcon} />
//               </Button>
//               { editButton ?
//                     <Button
//                       style={{marginTop: 20}}
//                       onClick={() => this.handleClick(item.id)}
//
//                       variant="contained"
//                       className={classes.button}
//                     >
//                       Edit Price
//                     </Button>
//                     : ""
//               }
//
//
//             </Paper>
//           </Grid>
//         </Grid>
//       </Paper>
//     )
//   }
// }
// /**
//  * CONTAINER
//  */
//
const mapStateToProps = state => ({
  allOpenReservations: state.reservation.newReservations,
  user: state.user
})

export default connect(mapStateToProps, null)(
  withStyles(LocationStyles)(LocationScreen)
)

LocationScreen.propTypes = {
  classes: PropTypes.object.isRequired
}
