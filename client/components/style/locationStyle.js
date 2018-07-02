export const LocationStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  ListBox: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 240
  },
  ListItemText: {
    fontFamily: 'medium-content-sans-serif-font'
  },
  leftPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 600,
    overflow: 'auto'
  },
  upperRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    height: 150
  },
  lowerRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    height: 400
  }
})

export default LocationStyles
//backgroundColor: theme.palette.background.paper,
