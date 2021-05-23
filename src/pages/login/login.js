import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import logo from './logo.png'

import { AuthContext } from '../../contexts/auth'

function Login() {
    const { loginGit, loginGoogle } = useContext(AuthContext)

    return(
        <Container>
            <Grid container justify='center' spacing={10}>
                <Grid item>
                    <img style={{width: '100%'}} src={logo} alt='Logo'/>
                </Grid>

                <Grid item xs={12} container justify='center'>                      
                        <GitHubButton 
                            variant="contained" 
                            fullWidth
                            onClick={loginGit}>
                                Entrar com github
                        </GitHubButton>
                </Grid>
                <Grid item xs={12} container justify='center'>                      
                        <FaceBookButton 
                            color="secondary"
                            variant="contained" 
                            fullWidth
                            onClick={loginGoogle}>
                                Entrar com google
                        </FaceBookButton>
                </Grid>
            </Grid>
        </Container>
        )
}

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing(3)}px;
`
const GitHubButton = styled(Button)`
    && {
        font-size: ${({ theme }) => theme.typography.h5.fontSize};
        padding: 15px;
        text-transform: none;
    }
`
const FaceBookButton = styled(Button)`
    && {
        font-size: ${({ theme }) => theme.typography.h5.fontSize};
        padding: 15px;
        text-transform: none;
    }
`

export default Login