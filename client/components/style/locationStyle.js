export const LocationStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500
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
    height: 700,
    overflow: 'auto'
  },
  upperRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    height: 325
  },
  lowerRightPaperGrid: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    height: 325
  }
})

export default LocationStyles
//backgroundColor: theme.palette.background.paper,
