"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, User, Palette } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function Page() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useKindeBrowserClient(); // Get user data from Kinde

  // Ensure the component is mounted before applying theme
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) {
    return null; // Avoid rendering until the component is mounted
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Appearance Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Switch
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={toggleDarkMode}
            />
            <Label htmlFor="dark-mode" className="text-lg">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </Label>
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </div>
        </CardContent>
      </Card>

      {/* Profile Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile
          </CardTitle>
          <CardDescription>View and manage your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-lg">Name:</Label>
              <p className="text-gray-700 dark:text-gray-300">
                {user?.given_name} {user?.family_name}
              </p>
            </div>
            <div>
              <Label className="text-lg">Email:</Label>
              <p className="text-gray-700 dark:text-gray-300">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;