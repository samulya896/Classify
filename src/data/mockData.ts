import { PYQ, Note, ExamEvent, Event, ImportantLink } from '../types';

export const mockPYQs: PYQ[] = [
  {
    id: '1',
    title: 'Data Structures Midterm 2023',
    subject: 'Data Structures',
    semester: '3',
    year: 2023,
    type: 'midterm',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Database Systems Final 2023',
    subject: 'Database Systems',
    semester: '4',
    year: 2023,
    type: 'final',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Operating Systems Practical 2023',
    subject: 'Operating Systems',
    semester: '5',
    year: 2023,
    type: 'practical',
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Computer Networks Midterm 2022',
    subject: 'Computer Networks',
    semester: '6',
    year: 2022,
    type: 'midterm',
    downloadUrl: '#'
  },
  {
    id: '5',
    title: 'Software Engineering Final 2022',
    subject: 'Software Engineering',
    semester: '7',
    year: 2022,
    type: 'final',
    downloadUrl: '#'
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Complete DSA Notes',
    subject: 'Data Structures',
    semester: '3',
    uploadedBy: 'John Doe',
    uploadDate: '2024-01-15',
    downloadUrl: '#',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'DBMS Comprehensive Guide',
    subject: 'Database Systems',
    semester: '4',
    uploadedBy: 'Jane Smith',
    uploadDate: '2024-01-10',
    downloadUrl: '#',
    fileSize: '3.1 MB'
  },
  {
    id: '3',
    title: 'OS Concepts & Implementation',
    subject: 'Operating Systems',
    semester: '5',
    uploadedBy: 'Mike Johnson',
    uploadDate: '2024-01-05',
    downloadUrl: '#',
    fileSize: '4.2 MB'
  }
];

export const mockExams: ExamEvent[] = [
  {
    id: '1',
    title: 'Data Structures Midterm',
    subject: 'Data Structures',
    date: '2024-02-15',
    time: '10:00 AM',
    type: 'midterm',
    room: 'Room 101'
  },
  {
    id: '2',
    title: 'Database Systems Final',
    subject: 'Database Systems',
    date: '2024-02-20',
    time: '2:00 PM',
    type: 'final',
    room: 'Room 205'
  },
  {
    id: '3',
    title: 'OS Practical Exam',
    subject: 'Operating Systems',
    date: '2024-02-25',
    time: '9:00 AM',
    type: 'practical',
    room: 'Lab 3'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Fest 2024',
    description: 'Annual technology festival with coding competitions and workshops',
    date: '2024-03-01',
    time: '9:00 AM',
    location: 'Main Auditorium',
    type: 'fest'
  },
  {
    id: '2',
    title: 'React Workshop',
    description: 'Learn modern React development techniques',
    date: '2024-02-18',
    time: '2:00 PM',
    location: 'Computer Lab',
    type: 'workshop'
  },
  {
    id: '3',
    title: 'Assignment Submission Deadline',
    description: 'Final deadline for Software Engineering project',
    date: '2024-02-12',
    time: '11:59 PM',
    location: 'Online',
    type: 'deadline'
  }
];

export const mockImportantLinks: ImportantLink[] = [
  {
    id: '1',
    title: 'Student Portal',
    description: 'Access grades, transcripts, and academic records',
    url: '#',
    category: 'academic',
    icon: 'GraduationCap'
  },
  {
    id: '2',
    title: 'Library Portal',
    description: 'Search books, journals, and digital resources',
    url: '#',
    category: 'resources',
    icon: 'Library'
  },
  {
    id: '3',
    title: 'Campus Map',
    description: 'Interactive map of the campus facilities',
    url: '#',
    category: 'campus',
    icon: 'Map'
  },
  {
    id: '4',
    title: 'Hostel Information',
    description: 'Accommodation details and services',
    url: '#',
    category: 'campus',
    icon: 'Home'
  }
];