import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1E3DE4' },
    secondary: { main: '#10D182' },
    error: { main: '#C31212' },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#1F204C',
        color: '#fff',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.12)',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#000',
        fontSize: '14px',
        padding: '8px 12px',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
})
export default theme
