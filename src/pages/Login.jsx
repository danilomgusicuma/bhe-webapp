import React, {useState} from 'react'
import {Box, Main, TextInput, Button, Image} from 'grommet'
import { useHistory } from 'react-router-dom'

const Login = ({setUser}) => {

  const history = useHistory()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [wait, setWait] = useState(false)

  const login = () => {
    setWait(true)
    function capitalizeFirstLetter([ first, ...rest ], locale = navigator.language) {
      return [ first.toLocaleUpperCase(locale), ...rest ].join('');
    }
    const name = capitalizeFirstLetter(email.slice(0,email.indexOf('@')))
    setUser(name)
    setTimeout(()=>history.push('/app/shipments'), 800)
  }

  return(
    <Main
      pad="large"
      align = "center"
      justify = "center"
    >
      <Box
        pad="large"
        background="light-1"
        elevation="small"
        width="medium"
        style={{
          marginTop:"-100px",
        }}
      >
          <Box
            justify="center"
          >
            <Box
              height="xsmall"
              width="xsmall"
              alignSelf="center"
              pad="small"
            >
              <Image
                  fit="cover"
                  src="https://4pl-public.s3.us-east-1.amazonaws.com/company/36f552dc-27b5-4725-b803-a850e2385725/logo.png"
              />
            </Box>
          </Box>
          <Box
            pad = "xsmall"
          >
            <TextInput
              placeholder="username"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Box>
          <Box
            pad = "xsmall"
          >
            <TextInput
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Box>
          <Box
            pad = "xsmall"
          >
            <Button onClick={()=>login()} type="submit" primary label={wait? <i className="fas fa-spinner fa-spin"></i> : "Submit"}/>
          </Box>
      </Box>
    </Main>
  )
}

export default Login