import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  BookOpen,
  Calendar,
  Tag,
  SortAsc,
  Grid,
  List
} from 'lucide-react';
import { mockPYQs } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const PYQRepository: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPYQs = useMemo(() => {
    return mockPYQs
      .filter(pyq => {
        const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pyq.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSemester = !selectedSemester || pyq.semester === selectedSemester;
        const matchesType = !selectedType || pyq.type === selectedType;
        const matchesYear = !selectedYear || pyq.year.toString() === selectedYear;
        
        return matchesSearch && matchesSemester && matchesType && matchesYear;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'subject':
            return a.subject.localeCompare(b.subject);
          case 'year':
            return b.year - a.year;
          case 'semester':
            return parseInt(a.semester) - parseInt(b.semester);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedSemester, selectedType, selectedYear, sortBy]);

  const handleDownload = (pyq: any) => {
    // Simulate download
    alert(`Downloading: ${pyq.title}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'midterm': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'final': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'practical': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                PYQ Repository
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Access previous year question papers organized by semester and subject
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                icon={Grid}
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                icon={List}
                onClick={() => setViewMode('list')}
              />
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Search by title or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              
              <div>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem.toString()}>Semester {sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                  <option value="practical">Practical</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="title">Sort by Title</option>
                  <option value="subject">Sort by Subject</option>
                  <option value="year">Sort by Year</option>
                  <option value="semester">Sort by Semester</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredPYQs.length} result{filteredPYQs.length !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>

        {/* PYQ Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPYQs.map((pyq, index) => (
                <motion.div
                  key={pyq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card hover className="p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {pyq.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {pyq.subject}
                        </p>
                      </div>
                      <BookOpen className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {pyq.year}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        Sem {pyq.semester}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(pyq.type)}`}>
                        {pyq.type.charAt(0).toUpperCase() + pyq.type.slice(1)}
                      </span>
                      <Button
                        size="sm"
                        icon={Download}
                        onClick={() => handleDownload(pyq)}
                      >
                        Download
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPYQs.map((pyq, index) => (
                <motion.div
                  key={pyq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {pyq.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(pyq.type)}`}>
                            {pyq.type.charAt(0).toUpperCase() + pyq.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{pyq.subject}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Year: {pyq.year}</span>
                          <span>Semester: {pyq.semester}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        icon={Download}
                        onClick={() => handleDownload(pyq)}
                      >
                        Download
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {filteredPYQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No PYQs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PYQRepository;