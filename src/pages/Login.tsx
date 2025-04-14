
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AuthForm from '@/components/authentication/AuthForm';

const Login = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <AuthForm defaultType="login" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
