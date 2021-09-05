import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { useLoginMutation, useSignupMutation } from "../generated/operation";
import { ME_QUERY } from "../graphql/queries";
import { Header } from "../ui/Header";
import * as Yup from "yup";
import Link from "next/link";
import MUILink from '@material-ui/core/Link';
import technologyWaveImage from "../../assets/SVG/technologyWave.svg";
import { useCookies } from "react-cookie";

const useStyles = makeStyles(theme => ({
    container: {
        background: `url(${technologyWaveImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '120vw',
    },
    cardContainer: {
        width: "100%",
        marginTop: "20vh",
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.dark
    },
    textFieldContainer: {
        width: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    textField: {
        width: "100%"
    },
    buttonContainer: {
        width: "100%",
        marginBottom: theme.spacing(1)
    },
    button: {
        width: "100%"
    },
    link: {
        cursor: "pointer",
        color: theme.palette.secondary.light
    }
}));

export enum AuthFormType {
    LOGIN, SIGNUP
}

interface Props {
    type: AuthFormType
}

export const AuthForm: React.FC<Props> = ({type}) => {
    const classes = useStyles();

    const router = useRouter();

    const [cookies, setCookies] = useCookies(["accessToken"]);

    const [login, { error: loginError, data: loginData }] = useLoginMutation({ refetchQueries: [{ query: ME_QUERY }] });
    const [signup, { error: signupError, data: signupData }] = useSignupMutation({ refetchQueries: [{ query: ME_QUERY }] });

    useEffect(() => {
        if (loginData?.login || signupData?.signup) {
            router.push("/");
        }

    }, [loginData, signupData]);

    const setSchema = Yup.object().shape({
        username: Yup.string().required("Required").min(2, "Too short"),
        password: Yup.string().required("Required").min(8, "Password is too short")
    });

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                <Grid container direction="column" alignContent="center" alignItems="center">
                    <Grid item xs={11} sm={9} md={6} className={classes.cardContainer}>
                        <Card>
                            <CardHeader
                                title={type === AuthFormType.LOGIN ? "Welcome back!" : "Join us!"}
                                titleTypographyProps={{ align: "center" }}
                                className={classes.cardHeader}
                            />
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={setSchema}
                                onSubmit={async ({ username, password }, { setSubmitting }) => {
                                    let accessToken: string | undefined | null;
                                    if (type === AuthFormType.LOGIN) {
                                        const { data } = await login({ variables: { username, password } });
                                        accessToken = data?.login?.accessToken;
                                    } else {
                                        const { data } = await signup({ variables: { username, password }});
                                        accessToken = data?.signup?.accessToken;
                                    }
                                    setCookies("accessToken", accessToken, { path: "/" });

                                    setSubmitting(false);
                                }}
                            >
                                {({ submitForm, isSubmitting }) => (
                                    <Form>
                                        {isSubmitting && <LinearProgress />}
                                        <CardContent>
                                            <Grid container direction="column" alignContent="center" alignItems="center">
                                                <Grid item xs={12} sm={10} className={classes.textFieldContainer}>
                                                    <Field component={TextField} name="username" label="username" className={classes.textField} />
                                                </Grid>
                                                <Grid item xs={12} sm={10} className={classes.textFieldContainer}>
                                                    <Field component={TextField} name="password" type="password" label="password" className={classes.textField} />
                                                </Grid>
                                                {
                                                    loginError ?
                                                        <Grid item xs={12} sm={10}>
                                                            <Typography variant="body1" color="error">Invalid credentials. Please re-enter your username and password again!</Typography>
                                                        </Grid>
                                                    : null
                                                }
                                                {
                                                    signupError ?
                                                        <Grid item xs={12} sm={10}>
                                                            <Typography variant="body1" color="error">Username already exists! Please choose another username.</Typography>
                                                        </Grid>
                                                        : null
                                                }
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="body1">
                                                        {type === AuthFormType.LOGIN ? 
                                                            <>
                                                                Don't have an account? <Link href="/signup"><MUILink className={classes.link}>Sign up.</MUILink></Link>
                                                            </> : 
                                                            <>
                                                                Already have an account? <Link href="/login"><MUILink className={classes.link}>Login</MUILink></Link>.
                                                            </>
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container direction="column" alignContent="center" alignItems="center">
                                                <Grid item xs={12} sm={10} className={classes.buttonContainer}>
                                                    <Button variant="contained" color="primary" size="large" type="submit" className={classes.button} disableElevation onClick={submitForm}>
                                                        {type === AuthFormType.LOGIN ? "LOGIN" : "SIGN UP"}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                    </Form>
                                )}
                            </Formik>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}