import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  Typography,
} from '@mui/material';
import styles from './styles.module.scss';
import { Formik } from 'formik';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GENDERS, REGISTER_DETAILS, allowAlphabets, validationRules } from '../../utils/constants';
import JoinCard from '../../components/JoinCard';
import { useState } from 'react';
import { ROUTES } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import { handleRegisterAuth } from '../../utils/auth';

function Register() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const nameValidation = (value = '') => {
    return allowAlphabets(value);
  };

  const handleRegister = async (values) => {
    setLoading(true);
    const result = await handleRegisterAuth(values.email, values.password, values.firstName);
    if (result) {
      sessionStorage.setItem('Auth Token', result.user.accessToken);
      nav(ROUTES.HOME);
    }
    setLoading(false);
  };

  const checkValidation = (rule) => rule.regex.test(password);

  const handleNavLogin = () => {
    nav(ROUTES.LOGIN);
  };

  return (
    <div className={styles.registerRootContainer}>
      <div className={styles.registerContainer}>
        <div style={{ marginBlock: '20px' }}>
          <Typography className={styles.registerTxt}>Register</Typography>
          <Typography className={styles.registerSubTxt} onClick={handleNavLogin}>
            Already Have an account!
          </Typography>

          {/* <Typography className={styles.registerSubTxt}>Sign up with</Typography> */}
        </div>

        {/* <div className={styles.socialContainer}>
                    <img src={GoogleImg} alt="google" className={styles.socialBtn} onClick={handleGoogleAuth}/>
                    <img src={AppleImg} alt="google" className={styles.socialBtn} onClick={handleAppleAuth}/>
                    <img src={FbImg} alt="google" className={styles.socialBtn} onClick={handleFbAuth}/>
                </div>

                <Typography className={styles.orTxt}>OR</Typography> */}

        <Formik
          initialValues={REGISTER_DETAILS.initialValue}
          validationSchema={REGISTER_DETAILS.validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur }) => (
            <form className={styles.formWrapper}>
              <FormControl>
                <Typography className={styles.label}>Your Name</Typography>
                <OutlinedInput
                  sx={{
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #fff inset',
                      backgroundColor: 'transparent !important',
                    },
                  }}
                  autoComplete="off"
                  type="text"
                  className={styles.input}
                  placeholder="First Name *"
                  onInput={(e) => {
                    setFieldValue('firstName', nameValidation(e?.target?.value));
                  }}
                  value={values.firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  error={errors?.firstName && touched?.firstName}
                  inputProps={{
                    maxLength: '26',
                  }}
                />
              </FormControl>
              <FormControl>
                <OutlinedInput
                  sx={{
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #E7E7E3 inset',
                      backgroundColor: 'transparent !important',
                    },
                  }}
                  type="text"
                  className={styles.input}
                  placeholder="Last Name *"
                  onInput={(e) => {
                    setFieldValue('lastName', nameValidation(e?.target?.value));
                  }}
                  value={values.lastName}
                  name="lastName"
                  onBlur={handleBlur}
                  error={errors?.lastName && touched?.lastName}
                  inputProps={{
                    maxLength: '26',
                  }}
                />
              </FormControl>

              <FormControl>
                <Typography className={styles.label}>Gender</Typography>

                <Box row>
                  {GENDERS.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          checked={values.gender === value}
                          onChange={() => setFieldValue('gender', value)}
                          onBlur={handleBlur}
                          value={value.gender}
                        />
                      }
                      label={label}
                    />
                  ))}
                </Box>
              </FormControl>

              <FormControl>
                <Typography className={styles.label}>Login Details</Typography>
                <OutlinedInput
                  sx={{
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #E7E7E3 inset',
                      backgroundColor: 'transparent !important',
                    },
                  }}
                  type="email"
                  className={styles.input}
                  placeholder="Email *"
                  onInput={(e) => {
                    setFieldValue('email', e.target.value);
                  }}
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  error={errors?.email && touched?.email}
                  inputProps={{
                    maxLength: '26',
                  }}
                />
              </FormControl>
              <FormControl>
                <OutlinedInput
                  sx={{
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #E7E7E3 inset',
                      backgroundColor: 'transparent !important',
                    },
                  }}
                  type="password"
                  className={styles.input}
                  placeholder="Password *"
                  onInput={(e) => {
                    setPassword(e.target.value);
                    setFieldValue('password', e.target.value);
                  }}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  error={errors?.password && touched?.password}
                  inputProps={{
                    maxLength: '26',
                  }}
                />
                {/* <FormHelperText className={styles.error}>
                                    {errors?.password && touched?.password && errors?.password}
                                </FormHelperText> */}
                {validationRules.map((rule, index) => (
                  <Typography
                    className={styles.passwordHelpTxt}
                    key={index}
                    style={{
                      // eslint-disable-next-line no-nested-ternary
                      marginTop: '5px',
                      color: checkValidation(rule) ? 'green' : errors.password ? 'red' : '#000',
                      fontWeight: checkValidation(rule) ? 'bold' : 'normal',
                    }}
                  >
                    {rule.text}
                  </Typography>
                ))}
              </FormControl>

              <FormControl>
                <OutlinedInput
                  sx={{
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #E7E7E3 inset',
                      backgroundColor: 'transparent !important',
                    },
                  }}
                  type="password"
                  className={styles.input}
                  placeholder="Confirm Password *"
                  onInput={(e) => {
                    setFieldValue('confirmPassword', e.target.value);
                  }}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  error={errors?.confirmPassword && touched?.confirmPassword}
                  inputProps={{
                    maxLength: '26',
                  }}
                />
                <FormHelperText className={styles.error}>
                  {errors?.confirmPassword && touched?.confirmPassword && errors?.confirmPassword}
                </FormHelperText>
              </FormControl>

              <div className={styles.registerBtn} onClick={!loading ? handleSubmit : null}>
                <Typography>REGISTER</Typography>
                {loading ? (
                  <CircularProgress className={styles.circleLoader} />
                ) : (
                  <ArrowForwardIcon />
                )}
              </div>
              {console.log(errors)}
              {!!Object.keys(errors).length && (
                <FormHelperText style={{ color: 'red' }}>Enter required details</FormHelperText>
              )}
            </form>
          )}
        </Formik>
      </div>

      <div className={styles.clubContainer}>
        <JoinCard />
      </div>
    </div>
  );
}

export default Register;
