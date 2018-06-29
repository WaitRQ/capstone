import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import {LocationStyles} from './style'
import Input from '@material-ui/core/Input'

import Event from '@material-ui/icons/Event'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import CardMedia from '@material-ui/core/CardMedia'

import Card from '@material-ui/core/Card'

class LocationScreen extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = async itemId => {}

  render() {
    console.log('these are my props', this.props.user.id)
    const openReservations = this.props.allOpenReservations.filter(
      reservation => {
        return reservation.locationId === this.props.location.id
      }
    )

    const {classes} = this.props
    return (
      <Paper style={{backgroundColor: '#DED7D7', maxHeight: '20em'}}>
        <List>
          <ListItem>
            <FormControl
              style={{backgroundColor: 'white'}}
              fullWidth
              className={classes.margin}
            >
              <Input
                id="adornment-amount"
                value={`${this.props.location.name}  ${
                  this.props.location.address
                }`}
              />
            </FormControl>
          </ListItem>
        </List>

        <Grid container style={{backgroundColor: '#DED7D7'}}>
          <Grid item md={6}>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://cbsnewyork.files.wordpress.com/2014/09/455720728.jpg?w=594"
                  title="Why Wait Online?"
                />
              </Card>
            </Paper>
          </Grid>

          <Grid item md={6}>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginRight: 20,
                marginBottom: 20
              }}
            >
              <List className={classes.ListBox}>
                {openReservations.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`Price: $${item.price} Contact: ${
                            item.buyer.name
                          } `}
                          secondary={`Time: ${item.time}`}
                        />
                        {}
                        <Button
                          onClick={() => this.handleClick(item.id)}
                          style={{marginRight: 20}}
                          variant="contained"
                          className={classes.button}
                        >
                          Edit Price
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Reserve
                        </Button>
                      </ListItem>
                      <Divider />
                    </div>
                  )
                })}
              </List>
              <Button
                style={{marginTop: 20}}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Make New Reservation
                <Event className={classes.rightIcon} />
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  allOpenReservations: state.reservation.allReservations
})

export default connect(mapStateToProps, null)(
  withStyles(LocationStyles)(LocationScreen)
)

LocationScreen.propTypes = {
  classes: PropTypes.object.isRequired
}

// <Card className={classes.card}>
// <CardMedia
//   className={classes.media}
//   image="https://cbsnewyork.files.wordpress.com/2014/09/455720728.jpg?w=594"
//   title="Contemplative Reptile"
// />
// </Card>

// <div className={classes.root}>
//    <List>
//     <ListItem>
//       <FormControl fullWidth className={classes.margin}>
//         <InputLabel htmlFor="adornment-amount">Location</InputLabel>
//           <Input
//             id="adornment-amount"
//             value='Location'
//             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//           />
//       </FormControl>
//     </ListItem>
//
//     <ListItem>
//
//     </ListItem>
//
//
//   <ListItem>
//     <div className="m3 col-12 border mx-auto">
//       <div className="m3 col-9 border block mx-auto center">
//
//
//             <div className={classes.list} style={{minHeight: '15em'}}>
//                {
//                  ["listItem1", 'listItem2', 'listitem3'].map((item) => {
//                  return (
//                 <div>
//                    <ListItem>
//                      <ListItemText primary={item} secondary="Jan 9, 2014" />
//                       <Button variant="contained" className={classes.button}>
//                          Default
//                       </Button>
//                       <Button variant="contained" color="primary" className={classes.button}>
//                          Primary
//                       </Button>
//                     </ListItem>
//                     <Divider />
//                 </div>
//                 )
//              })}
//           </div>
//
//
//       </div>
//     </div>
//   </ListItem>
//  </List>
// </div>
