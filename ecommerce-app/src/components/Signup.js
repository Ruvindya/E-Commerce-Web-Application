import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../store/authSlice';
import { Card, CardHeader, CardContent, Input, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


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



export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("handle submit called", values);
    dispatch(signup({ email: values.email }));
    navigate('/products');
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    fullWidth
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    fullWidth
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};