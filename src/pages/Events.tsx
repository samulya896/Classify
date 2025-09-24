import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Bell,
  BookOpen,
  Trophy,
  AlertCircle,
  Presentation
} from 'lucide-react';
import { mockEvents } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || event.type === selectedType;
      
      // Filter by timeframe
      const eventDate = new Date(event.date);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      let matchesTimeframe = true;
      if (selectedTimeframe === 'today') {
        matchesTimeframe = eventDate.toDateString() === today.toDateString();
      } else if (selectedTimeframe === 'week') {
        matchesTimeframe = eventDate >= today && eventDate <= nextWeek;
      } else if (selectedTimeframe === 'month') {
        matchesTimeframe = eventDate >= today && eventDate <= nextMonth;
      }
      
      return matchesSearch && matchesType && matchesTimeframe;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, selectedType, selectedTimeframe]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return BookOpen;
      case 'fest': return Trophy;
      case 'deadline': return AlertCircle;
      case 'seminar': return Presentation;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'from-blue-500 to-blue-600';
      case 'fest': return 'from-purple-500 to-purple-600';
      case 'deadline': return 'from-red-500 to-red-600';
      case 'seminar': return 'from-emerald-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'fest': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'deadline': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'seminar': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const isEventSoon = (eventDate: string) => {
    const event = new Date(eventDate);
    const today = new Date();
    const diffInDays = Math.ceil((event.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3 && diffInDays >= 0;
  };

  const handleRegister = (event: any) => {
    alert(`Registration for "${event.title}" - This would open the registration form.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Events & Announcements
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Stay updated with the latest campus events, workshops, and important deadlines
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Search events and announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="workshop">Workshops</option>
                  <option value="fest">Festivals</option>
                  <option value="deadline">Deadlines</option>
                  <option value="seminar">Seminars</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          {filteredEvents.map((event, index) => {
            const EventIcon = getEventIcon(event.type);
            const isUrgent = isEventSoon(event.date);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className={`p-6 ${isUrgent ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}>
                  <div className="flex items-start space-x-4">
                    {/* Event Icon */}
                    <div className={`flex-shrink-0 p-3 bg-gradient-to-r ${getEventColor(event.type)} rounded-lg`}>
                      <EventIcon className="h-6 w-6 text-white" />
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          {isUrgent && (
                            <div className="flex items-center text-orange-600 dark:text-orange-400">
                              <Bell className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Soon</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {event.description}
                      </p>

                      {/* Event Metadata */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        {event.type !== 'deadline' && (
                          <Button size="sm" onClick={() => handleRegister(event)}>
                            {event.type === 'workshop' ? 'Register' : 'Learn More'}
                          </Button>
                        )}
                        <Button variant="outline" size="sm" icon={Bell}>
                          Remind Me
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Upcoming Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Stay connected with all the exciting events happening on campus. 
                Enable notifications to get alerts about registration deadlines and new events.
              </p>
              <Button 
                variant="secondary" 
                icon={Bell} 
                onClick={() => alert('Notifications feature would be implemented with a proper backend')}
              >
                Enable Notifications
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;