import { Box, CircularProgress } from "@mui/material"

interface IProps {
    size?: number
}

const Loader = ({ size = 25 }: IProps) => {
  return (
    <Box alignContent="center" textAlign="center">
      <CircularProgress color="primary" thickness={4} size={size} />
    </Box>
  )
}

export default Loader;
