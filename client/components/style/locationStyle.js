export const LocationStyles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    minWidth: '600px'
  },
  ListBox: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 240
  },
  leftPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'auto'
  },
  upperRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  lowerRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  }
})

export default LocationStyles
//backgroundColor: theme.palette.background.paper,
