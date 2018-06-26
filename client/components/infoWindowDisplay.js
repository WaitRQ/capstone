import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {DrawerStyle} from './style'

class InfoWindowDisplay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('This is props', this.props.bounds)
    const {classes} = this.props
    return (
      <div className={classes.rootB}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Location Name</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={10}>
                <Paper className={classes.paper}>New Reservation</Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper className={classes.paper}>Open Reservation</Paper>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

InfoWindowDisplay.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(DrawerStyle)(InfoWindowDisplay)
