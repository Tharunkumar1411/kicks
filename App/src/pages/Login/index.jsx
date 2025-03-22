import { CircularProgress, FormControl, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import styles from "./styles.module.scss"
import { Formik } from "formik";
import GoogleImg from "../../assets/images/GoogleIcon.svg"
import AppleImg from "../../assets/images/AppleIcon.svg"
import FbImg from "../../assets/images/FaceBookIcon.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LOGIN_DETAILS } from "../../utils/constants";
import JoinCard from "../../components/JoinCard";
import { handleAppleAuth, handleEmailAuth, handleFbAuth, handleGoogleAuth } from "../../utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";

function Login(){
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleLogin = async(values) => {
        setLoading(prev => !prev);

        try {
            const userDetails = await handleEmailAuth(values.email, values.password, "Login");
            sessionStorage.setItem("Auth Token", userDetails?.user?.accessToken);
            nav(ROUTES.HOME);
        } catch (error) {
        } finally {
            setLoading(prev => !prev)
        }
    }

    const handleGoogleLogin = async() => {
        const result = await handleGoogleAuth();
        sessionStorage.setItem("Auth Token", result?.accessToken);
        if(result?.accessToken){
            nav(ROUTES.HOME);
        }
    }

    const handleNavRegister = () => {
        nav(`/register`);
    }

    return(
        <div className={styles.registerRootContainer}>
            <div className={styles.registerContainer}>
                <div>
                    <Typography className={styles.registerTxt}>Login</Typography>
                    <Typography className={styles.registerSubTxt} onClick={handleNavRegister}>Create your account here</Typography>
                </div>

                <Formik  
                    initialValues={LOGIN_DETAILS.initialValue}
                    validationSchema={LOGIN_DETAILS.validationSchema}
                    onSubmit={handleLogin}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        handleBlur,
                    }) => (
                        <form className={styles.formWrapper}>
                            <FormControl>
                                <OutlinedInput
                                    type="email"
                                    className={styles.input}
                                    placeholder="Email *"
                                    onInput={(e) => {
                                        setFieldValue("email", e.target.value);
                                    }}
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    error={errors?.email && touched?.email}
                                    inputProps={{
                                        maxLength: "26",
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <OutlinedInput
                                    type="password"
                                    className={styles.input}
                                    placeholder="Password *"
                                    onInput={(e) => {
                                        setFieldValue("password", e.target.value);
                                    }}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    error={errors?.password && touched?.password}
                                    inputProps={{
                                        maxLength: "26",
                                    }}
                                />
                                <FormHelperText className={styles.error}>
                                    {errors?.password && touched?.password && errors?.password}
                                </FormHelperText>
                            </FormControl>

                            <div className={styles.registerBtn} onClick={!loading ? handleSubmit : null}>
                                <Typography>EMAIL LOGIN</Typography>
                                {loading ? <CircularProgress className={styles.circleLoader}/> : <ArrowForwardIcon />}
                            </div>

                            <div className={styles.socialContainer}>
                                <img src={GoogleImg} alt="google" className={styles.socialBtn} onClick={handleGoogleLogin}/>
                                <img src={AppleImg} alt="google" className={styles.socialBtn} onClick={handleAppleAuth}/>
                                <img src={FbImg} alt="google" className={styles.socialBtn} onClick={handleFbAuth}/> 
                            </div>


                        </form>
                    )}
                </Formik>
            </div>

            <div className={styles.clubContainer}>
                <JoinCard />
            </div>
            
        </div>
    )
}-0

export default Login;