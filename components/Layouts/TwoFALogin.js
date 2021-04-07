import React from "react"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PhoneField from "../PhoneField/PhoneField";
import {useRouter} from 'next/router'
import LoginLayout from './Login'
import Head from 'next/head'
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    phoneField:{
      width: '100% !important'
    }
  }));

export default function Twofalogin({username,
    title,
    desc,
    layout,
    url
  }){

  const Layout = layout || LoginLayout
  const classes = useStyles();
  const formRef = React.useRef(null);
  const router = useRouter();
  const Url = url;

  const [sidValues, setSidValues] = React.useState({
    sid:''
  });
  const [formValues, setFormValues] = React.useState({
    username:username,
    phone:'',
    token:''
  });
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }
  
  const handleReSubmit = async e =>{
   
    const phonenumber = '+'+(formRef.current.phone.value).replace(/\D/g,'');
    if(phonenumber !== '+'){
      e.preventDefault();
      //setSidValues({sid:''});
      const data = {
        phone: phonenumber
      }
      console.log(JSON.stringify(data));
          const res = await fetch(`https://twilioservice-dot-ec-hoot-back-office-dev-01.uc.r.appspot.com/getToken`, {
            mode:'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }).then(async res => {
            if (res.ok) {
              const resp = await res.clone().json().catch(() => res.text())
              if(resp.status === 'pending'){
                  setSidValues({sid:resp.sid});
              }
            }
            return false
          }).catch(err => {
              console.error("api", "_fetch", "err", err)
              return false
          })

     
    }
  }
 

  const handleSubmit = async e => {
    const phonenumber = '+'+(formRef.current.phone.value).replace(/\D/g,'');
    try{
    if(phonenumber !== '+'){
      e.preventDefault();
      if(sidValues.sid === ''){
        const data = {
          phone: phonenumber
        }
         const res = await fetch(`https://twilioservice-dot-ec-hoot-back-office-dev-01.uc.r.appspot.com/getToken`, {
              mode:'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            }).then(async res => {
              if (res.ok) {
                const resp = await res.clone().json().catch(() => res.text())
               // console.log(resp)
                if(resp.status === 'pending'){
                    setSidValues({sid:resp.sid});
                }
              }
              return false
            }).catch(err => {
                console.error("api", "_fetch", "err", err)
                return false
            })

      }else{

        const data = {
          code: formRef.current.token.value,
          phone: phonenumber,
        }
        //console.log(JSON.stringify(data));

        const res = await fetch(`https://twilioservice-dot-ec-hoot-back-office-dev-01.uc.r.appspot.com/verifyToken`, {
          mode:'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(async res => {
          if (res.ok) {
            const resp = await res.clone().json().catch(() => res.text())
            //console.log(resp)
            if(resp.status === 'approved'){
               router.push('/home')
            }
          }
          return false
        }).catch(err => {
            console.error("api", "_fetch", "err", err)
            return false
        })
         
       }
    }
  }catch(e){
    console.log(e)
  }
  }

    


  return (
    <Layout>
       <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
    <div>
    <Container maxWidth="sm">
         <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom align="center">
         {desc}
        </Typography>
       
        <form ref={formRef}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Id"
                    autoFocus
                    InputProps={{
                        readOnly: true,
                    }}
                    value={formValues.username}

                />
                </Grid>
                <Grid item xs={12}>
                  <PhoneField
                    required={true}
                    defaultCountry={'us'}
                    fullWidth
                    value={formValues.phone}
                    onChange={handleChange}
                    className={classes.phoneField}            
                  />
                 </Grid>
                 
                 <Grid item xs={12}>
                 {sidValues.sid != ''?
                <TextField
                    name="token"
                    variant="outlined"
                    required
                    fullWidth
                    id="token"
                    label="Token"
                    autoFocus
                    value={formValues.token}
                    onChange={handleChange}
                />
                :''}
                 </Grid>

                 <Grid item xs={12} sm={6}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Button
                      onClick={handleSubmit} 
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                     {sidValues.sid == ''? 'Send Token': ' Verify Token'}
                    </Button>
                    </Grid>
                    {sidValues.sid != ''?
                    <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                     <Button
                    onClick={handleReSubmit} 
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                     Resend Token
                    </Button>
                   
                  </Grid>
                   :''}

                  </Grid>
                  
              
        </form>
      
        </div>
        </Container>
    </div>
    </Layout>
  );

}