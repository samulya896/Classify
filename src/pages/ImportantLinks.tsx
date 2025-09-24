import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Search,
  GraduationCap,
  Library,
  Map,
  Home,
  Users,
  BookOpen,
  Calendar,
  Phone,
  Globe,
  Mail
} from 'lucide-react';
import { mockImportantLinks } from '../data/mockData';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const ImportantLinks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const iconMap: Record<string, any> = {
    GraduationCap,
    Library,
    Map,
    Home,
    Users,
    BookOpen,
    Calendar,
    Phone,
    Globe,
    Mail
  };

  // Extended mock data with more links
  const extendedLinks = [
    ...mockImportantLinks,
    {
      id: '5',
      title: 'Student Email',
      description: 'Access your official college email account',
      url: '#',
      category: 'academic' as const,
      icon: 'Mail'
    },
    {
      id: '6',
      title: 'Course Catalog',
      description: 'Browse available courses and their descriptions',
      url: '#',
      category: 'academic' as const,
      icon: 'BookOpen'
    },
    {
      id: '7',
      title: 'Academic Calendar',
      description: 'Important academic dates and deadlines',
      url: '#',
      category: 'academic' as const,
      icon: 'Calendar'
    },
    {
      id: '8',
      title: 'Emergency Contacts',
      description: 'Important phone numbers for emergencies',
      url: '#',
      category: 'campus' as const,
      icon: 'Phone'
    },
    {
      id: '9',
      title: 'Student Clubs',
      description: 'Join various clubs and organizations',
      url: '#',
      category: 'campus' as const,
      icon: 'Users'
    },
    {
      id: '10',
      title: 'Online Learning Portal',
      description: 'Access online courses and materials',
      url: '#',
      category: 'resources' as const,
      icon: 'Globe'
    }
  ];

  const filteredLinks = extendedLinks.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || link.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'academic', label: 'Academic' },
    { value: 'campus', label: 'Campus' },
    { value: 'resources', label: 'Resources' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'campus':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'resources':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleLinkClick = (link: any) => {
    if (link.url === '#') {
      alert(`This would open: ${link.title}`);
    } else {
      window.open(link.url, '_blank');
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Important Links
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Quick access to all essential college resources and services you need
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Search links by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                />
              </div>
              
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
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
            Showing {filteredLinks.length} link{filteredLinks.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon] || ExternalLink;
            
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card hover className="p-6 h-full cursor-pointer" onClick={() => handleLinkClick(link)}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {link.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {link.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(link.category)}`}>
                          {link.category.charAt(0).toUpperCase() + link.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredLinks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No links found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Quick Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Check our help center or contact student support for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => alert('This would open the help center')}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Help Center
                </button>
                <button 
                  onClick={() => alert('This would open contact support')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium border border-indigo-400"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ImportantLinks;