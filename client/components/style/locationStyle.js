export const LocationStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  media: {
    height: 0,
    padding: '25%'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  ListBox: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 240
  },
  card: {
    width: '100%',
    position: 'relative',
    maxHeight: 370
  }
})

export default LocationStyles
//backgroundColor: theme.palette.background.paper,
