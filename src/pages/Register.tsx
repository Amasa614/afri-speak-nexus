
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { LanguageSelector } from '@/components/auth/LanguageSelector';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    primaryLanguage: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleSelect = (roleId: string) => {
    setFormData(prev => ({ ...prev, role: roleId }));
  };
  
  const handleLanguageSelect = (language: string) => {
    setFormData(prev => ({ ...prev, primaryLanguage: language }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission, API calls etc.
    console.log('Form submitted:', formData);
    navigate('/dashboard');
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Choose Your Role' : 'Select Languages'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Select how you'd like to contribute to the platform:
                    </p>
                    
                    <RoleSelector 
                      selectedRole={formData.role}
                      onSelectRole={handleRoleSelect}
                    />
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Select your primary African language for contributions:
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="primaryLanguage">Primary Language</Label>
                      <LanguageSelector
                        selectedLanguage={formData.primaryLanguage}
                        onSelectLanguage={handleLanguageSelect}
                      />
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      You can add more languages later in your profile settings.
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full flex justify-between">
                {step > 1 && (
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button 
                    className="ml-auto"
                    onClick={handleNextStep}
                    disabled={(step === 1 && (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword)) ||
                              (step === 2 && !formData.role)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    className="ml-auto" 
                    onClick={handleSubmit}
                    disabled={!formData.primaryLanguage}
                  >
                    Create Account
                  </Button>
                )}
              </div>
              
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-afri-orange hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
