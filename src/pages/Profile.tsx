import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Save,
  Camera,
  Moon,
  Sun,
  Bell,
  Lock,
  Shield,
  Settings,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useApp();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    course: user?.course || '',
    year: user?.year || '',
    semester: user?.semester || ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser(formData);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const stats = [
    { title: 'PYQ Downloads', value: '24', icon: Activity, color: 'text-blue-600' },
    { title: 'Notes Shared', value: '8', icon: Activity, color: 'text-emerald-600' },
    { title: 'Events Attended', value: '5', icon: Activity, color: 'text-purple-600' },
    { title: 'Study Streak', value: '7 days', icon: Activity, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {user?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{user?.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.course} • {user?.year}{user?.year === '1' ? 'st' : user?.year === '2' ? 'nd' : user?.year === '3' ? 'rd' : 'th'} Year
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div key={stat.title} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </span>
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          course: user?.course || '',
                          year: user?.year || '',
                          semester: user?.semester || ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      icon={Save} 
                      loading={isSaving}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={User}
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={Mail}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Course
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="4">4th</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem.toString()}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Preferences */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                <Settings className="h-5 w-5 mr-2" />
                Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Choose between light and dark mode
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified about events and deadlines
                      </p>
                    </div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Security */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
                <Shield className="h-5 w-5 mr-2" />
                Security
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Update your account password
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;