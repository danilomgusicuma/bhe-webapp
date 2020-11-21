import React from 'react'
import { Box, Heading, Button, Sidebar, Nav, Avatar, Image } from 'grommet'
import { Notification } from 'grommet-icons'
import ShipmentsList from '../components/ShipmentsList'
import { Route, useHistory } from 'react-router-dom'
import './Admin.css'
import Dashboard from '../pages/Dashboard'

const paths = [
  {
    path: 'shipments',
    component: ShipmentsList,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  }
]

const AppBar = props => {
  return(
    <Box
      tag = "header"
      direction = "row"
      align = "center"
      justify = "between"
      background = "light-1"
      elevation = "small"
      style={{ zIndex: '1' }}
      {...props}
    >
      <Box direction="row">
        <Box
          alignSelf="center"
          width="30px"
          height="30px"
          margin={{left:"10px"}}
        >
          <Image height="100%" src="https://i.imgur.com/Q7FLqvE.png"/>
        </Box>
        <Heading margin="small" level={4}>
          Konfere
        </Heading>
      </Box>
      <Box direction="row">
        <Heading level={4}>
          {props.user}
        </Heading>
        <Avatar margin="small" size="small" alignSelf="center" src="https://i.imgur.com/v0DtlWb.png" />
      </Box>
    </Box>
  )
}

const Layout = ({user}) => {
  const history = useHistory()
  return(
    <Box fill background="light-1">
      <AppBar user={user}>
        Konfere
      </AppBar>
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Box
          background='light-2'
          align='center'
          justify='center'
          
        >
          <Sidebar
            background="light-2"
            width="xsmall"
            footer={
              <Button justify="center" icon={<i style={{width:'100%'}} className="fas fa-cog"></i>} hoverIndicator />
            }
          >
            <Nav gap="small">
              <Button onClick={()=>history.push('/app/dashboard')} icon={<i style={{width:'100%'}} className="fas fa-chart-pie"></i>} hoverIndicator />
              <Button onClick={()=>history.push('/app/shipments')} icon={<i style={{width:'100%'}} className="fas fa-ship"></i>} hoverIndicator />
            </Nav>
          </Sidebar>
        </Box>
        <Box flex>
          {console.log('path', paths)}
          {paths.map(path => <Route path={`/app/${path.path}`} key={path.path} render={(props)=>(<path.component user={user} {...props}/>)}/>)}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout