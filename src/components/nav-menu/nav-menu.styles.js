import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const MenuLink = styled(NavLink)`
  color: white;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.page === 'main' ? 'white' : 'black'}; 
`
