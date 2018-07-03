//HOME CAROUSEL JS
import React, {Component} from 'react'
import {Carousel} from 'react-responsive-carousel'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  paperText: {
    textAlign: 'center'
  }
})

class HomeCarousel extends Component {
  render() {
    const {classes, cars} = this.props
    return (
      <div>
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography
              className={classes.paperText}
              variant="headline"
              component="h3"
            >
              Welcome to Wait a Que
            </Typography>
            <Typography className={classes.paperText} component="p">
              The world's premier Waiting Application.
            </Typography>
          </Paper>
        </div>

        <div className="carousel-container">
          <Carousel className="carousel" autoPlay>
            <div>
              <img src="https://images.unsplash.com/photo-1525250646001-99ba4c565986?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c2653a0d22f6710bac2a453ea40d07e9&auto=format&fit=crop&w=1650&q=80" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1511406933301-8e740b28cc89?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b91a3fb35ac84f11a67826ef71d4e1b&auto=format&fit=crop&w=1730&q=80" />
              <p className="legend">Legend 2</p>
            </div>

            <div>
              <img src="https://images.unsplash.com/photo-1517364350421-1d6871888e1b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e2c5ebcd2f3de707d00d931237f6099&auto=format&fit=crop&w=1650&q=80" />
              <p className="legend">Legend 3</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1517364350421-1d6871888e1b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e2c5ebcd2f3de707d00d931237f6099&auto=format&fit=crop&w=1650&q=80" />
              <p className="legend">Legend 4</p>
            </div>
          </Carousel>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HomeCarousel)
