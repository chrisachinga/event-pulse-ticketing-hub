
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

type AuthType = 'login' | 'register';

const AuthForm = ({ defaultType = 'login' }: { defaultType?: AuthType }) => {
  const [authType, setAuthType] = useState<AuthType>(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  // Get redirect location from state if available
  const from = location.state?.from || '/dashboard';
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (authType === 'login') {
        const success = login(email, password);
        if (success) {
          navigate(from);
        } else {
          setIsLoading(false);
        }
      } else {
        // For demo, simulate registration then login
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please ensure your passwords match",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Mock successful registration
        setTimeout(() => {
          toast({
            title: "Account created",
            description: `Welcome to EventPulse, ${name}!`,
          });
          // Auto login after registration
          const success = login(email, password);
          if (success) {
            navigate(from);
          } else {
            setIsLoading(false);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {authType === 'login' ? 'Login to Your Account' : 'Create an Account'}
        </CardTitle>
        <CardDescription className="text-center">
          {authType === 'login'
            ? 'Enter your email and password to access your account'
            : 'Fill in your details to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={authType} onValueChange={(value) => setAuthType(value as AuthType)}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {authType === 'register' && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {authType === 'login' && (
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {authType === 'register' && (
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Please wait</span>
                  </>
                ) : authType === 'login' ? (
                  'Login'
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {authType === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setAuthType('register')}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setAuthType('login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
