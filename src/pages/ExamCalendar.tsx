import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Filter,
  Plus
} from 'lucide-react';
import { mockExams } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ExamCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');

  const today = new Date();
  
  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Start from the beginning of the week
    startDate.setDate(startDate.getDate() - startDate.getDay());
    // End at the end of the week
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const filteredExams = useMemo(() => {
    return mockExams.filter(exam => {
      return !selectedType || exam.type === selectedType;
    });
  }, [selectedType]);

  const getExamsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredExams.filter(exam => exam.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'midterm': return 'bg-blue-500';
      case 'final': return 'bg-red-500';
      case 'practical': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const monthData = getMonthData(currentDate);

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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Exam Calendar
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Keep track of all your upcoming exams and important dates
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Types</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="practical">Practical</option>
              </select>
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'month'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  } rounded-l-lg`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'list'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  } rounded-r-lg`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {viewMode === 'month' ? (
          /* Calendar View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronLeft}
                    onClick={() => navigateMonth('prev')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronRight}
                    onClick={() => navigateMonth('next')}
                  />
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="bg-gray-50 dark:bg-gray-800 p-3 text-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {day}
                    </span>
                  </div>
                ))}

                {/* Calendar Days */}
                {monthData.map((date, index) => {
                  const dayExams = getExamsForDate(date);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.01, duration: 0.3 }}
                      className={`bg-white dark:bg-gray-800 p-2 min-h-[100px] border-r border-b border-gray-100 dark:border-gray-700 ${
                        !isCurrentMonth(date) ? 'opacity-40' : ''
                      } ${isToday(date) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(date) 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayExams.slice(0, 2).map(exam => (
                          <div
                            key={exam.id}
                            className={`text-xs p-1 rounded text-white truncate ${getTypeColor(exam.type)}`}
                            title={exam.title}
                          >
                            {exam.subject}
                          </div>
                        ))}
                        {dayExams.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{dayExams.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-6">
                {[
                  { type: 'midterm', label: 'Midterm' },
                  { type: 'final', label: 'Final' },
                  { type: 'practical', label: 'Practical' }
                ].map(item => (
                  <div key={item.type} className="flex items-center">
                    <div className={`w-3 h-3 rounded ${getTypeColor(item.type)} mr-2`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-6"
          >
            {filteredExams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(exam.type)} mr-3`} />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exam.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{exam.subject}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(exam.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exam.room}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(exam.type)}`}>
                      {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredExams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No exams scheduled
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No exams match your current filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExamCalendar;