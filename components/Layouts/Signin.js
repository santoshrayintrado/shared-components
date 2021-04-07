import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoginLayout from './Login'
import { useTranslation } from 'next-i18next'

 const Signin = (props) => {
    
    const Layout = layout || LoginLayout
    const router = useRouter();
    const { t } = useTranslation('common')
    const {title,desc,layout,handleSubmit} = props
    
    return (
      <Layout>
       <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
       <div>
       <Container maxWidth="md">
       <form onSubmit={handleSubmit}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
           {desc}
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom align="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <Button variant="contained" color="primary" type="submit">
              Sign In
            </Button>
            </Grid>
            
            </Grid>
            </Typography>
            
        </Box>
        </form>
      </Container>
      </div>
      </Layout>  
    )
  }
  export default Signin