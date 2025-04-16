
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const DashboardSettings = () => {
  const { username } = useAuth();
  const { toast } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account settings</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{username?.substring(0, 2).toUpperCase() || 'CN'}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" type="button">
                      Change Avatar
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" defaultValue="Chris" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" defaultValue={username || 'chris.doe@example.com'} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" defaultValue="+254 712 345 678" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Update your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Session Timeout</h4>
                        <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Update Security Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notification Types</h4>
                    <div className="flex items-center justify-between">
                      <p>Ticket Purchases</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Event Reminders</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Marketing Updates</p>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <p>System Announcements</p>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your billing details and subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium">Current Plan</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-lg font-bold">Professional Plan</p>
                        <p className="text-sm text-gray-500">Billed monthly</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Payment Method</h4>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <span className="font-bold text-sm">VISA</span>
                        </div>
                        <div>
                          <p>Visa ending in 1234</p>
                          <p className="text-sm text-gray-500">Expires 02/2026</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline" className="w-full">Add Payment Method</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Billing History</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p>April 1, 2025</p>
                          <p className="text-sm text-gray-500">Professional Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KES 2,999</p>
                          <Button variant="link" size="sm" className="p-0 h-auto">Invoice</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p>March 1, 2025</p>
                          <p className="text-sm text-gray-500">Professional Plan - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KES 2,999</p>
                          <Button variant="link" size="sm" className="p-0 h-auto">Invoice</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
