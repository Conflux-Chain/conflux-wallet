import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
export function isMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}
