import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  Link as LinkIcon,
  TrendingUp,
  Clock,
  Bell,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Browse PYQs',
      description: 'Access previous year questions',
      icon: BookOpen,
      path: '/pyq',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Check Calendar',
      description: 'View upcoming exams',
      icon: Calendar,
      path: '/calendar',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Browse Notes',
      description: 'Find study materials',
      icon: FileText,
      path: '/notes',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Campus Events',
      description: 'Discover events & workshops',
      icon: Users,
      path: '/events',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    { action: 'Downloaded', item: 'Data Structures Midterm 2023', time: '2 hours ago' },
    { action: 'Uploaded', item: 'DBMS Notes Chapter 5', time: '1 day ago' },
    { action: 'Registered for', item: 'React Workshop', time: '2 days ago' },
    { action: 'Viewed', item: 'Exam Calendar', time: '3 days ago' }
  ];

  const upcomingEvents = [
    { title: 'Data Structures Midterm', date: 'Feb 15, 2024', type: 'exam' },
    { title: 'React Workshop', date: 'Feb 18, 2024', type: 'workshop' },
    { title: 'Database Systems Final', date: 'Feb 20, 2024', type: 'exam' },
    { title: 'Tech Fest 2024', date: 'Mar 1, 2024', type: 'event' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-indigo-100 text-lg">
                  {user?.course} • {user?.year}{user?.year === '1' ? 'st' : user?.year === '2' ? 'nd' : user?.year === '3' ? 'rd' : 'th'} Year • Semester {user?.semester}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-indigo-100">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={action.path}>
                  <Card hover className="p-6 h-full">
                    <div className={`p-3 bg-gradient-to-r ${action.color} rounded-lg w-fit mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </h3>
                <Link to="/profile" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white">
                        <span className="text-indigo-600 dark:text-indigo-400">{activity.action}</span>{' '}
                        {activity.item}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Upcoming
                </h3>
                <Link to="/calendar" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className={`h-3 w-3 rounded-full mt-1.5 ${
                      event.type === 'exam' ? 'bg-red-500' :
                      event.type === 'workshop' ? 'bg-blue-500' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {event.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'PYQ Downloads', value: '24', change: '+12%', icon: BookOpen },
              { title: 'Notes Shared', value: '8', change: '+3', icon: FileText },
              { title: 'Events Attended', value: '5', change: '+2', icon: Users },
              { title: 'Study Streak', value: '7 days', change: 'ongoing', icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <LinkIcon className="h-5 w-5 mr-2" />
              Quick Access
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Student Portal', url: '#', color: 'text-blue-600' },
                { title: 'Library', url: '#', color: 'text-emerald-600' },
                { title: 'Campus Map', url: '#', color: 'text-purple-600' },
                { title: 'Hostel Info', url: '#', color: 'text-orange-600' }
              ].map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.url}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className={`block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${link.color}`}
                >
                  <span className="font-medium">{link.title}</span>
                </motion.a>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;