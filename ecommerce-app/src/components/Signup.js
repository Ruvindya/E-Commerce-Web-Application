import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, selectUser  } from '../store/authSlice';
import { Card, CardHeader, CardContent, Input, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EmailExistsModal from './EmailExistsModal';
import { v4 as uuidv4 } from 'uuid';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
});

const CustomInput = ({ field, form: { touched, errors }, ...props }) => (
  <div className="space-y-2">
    <Input {...field} {...props} className="w-full px-4 py-2" />
    {touched[field.name] && errors[field.name] && (
      <div className="text-red-500 text-sm">{errors[field.name]}</div>
    )}
  </div>
);

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signup({
        email: values.email,
        password: values.password,
        createdAt: new Date().toISOString(),
        id: uuidv4(),
      })).unwrap();
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto">
      <CardHeader
          title="SignUp"
          className="text-2xl font-bold text-center text-gray-800"
        />
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={CustomInput}
                />

                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  component={CustomInput}
                />

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2"
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </Button>
              </Form>
            )}
          </Formik>
          <EmailExistsModal />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;