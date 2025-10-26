import { PYQ, Note, ExamEvent, Event, ImportantLink } from '../types';

export const mockPYQs: PYQ[] = [
  {
    id: '1',
    title: 'Data Structures ',
    subject: 'Data Structures',
    semester: '3',
    year: 2023,
    type: 'end semester',
    downloadUrl: 'https://drive.google.com/drive/folders/1teXP8p4jzzXHp35Z6Wy8HAn4tvckpLvS'
  },
  {
    id: '2',
    title: 'Operating Systems ',
    subject: 'Operating Systems',
    semester: '3',
    year: 2023,
    type: 'end semester',
    downloadUrl: 'https://drive.google.com/file/d/1JbsMpAnBDBAuqvyendtizPJo89LktUkx/view?usp=sharing'
  },
  {
    id: '3',
    title: 'Advanced Programming Practice',
    subject: 'Advanced Programming',
    semester: '3',
    year: 2023,
    type: 'ct-2',
    downloadUrl: 'https://drive.google.com/file/d/13JgajWedB-GtdG1WmeDbM_txUA4Cnhik/view'
  },
  {
    id: '6',                                
    title: 'Computer Organization and Architecture ',
    subject: 'Computer Organization and Architecture',                
    semester: '3',                          
    year: 2023,                             
    type: 'ct-all',                  
    downloadUrl: 'https://drive.google.com/drive/folders/1qqQ5mvOZ1pLHfyYIGdqbds6X3HsYI_DN'
  },
  {
    id: '4',
    title: 'Computer Networks ',
    subject: 'Computer Networks',
    semester: '6',
    year: 2022,
    type: 'midterm',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_4'
  },
  {
    id: '5',
    title: 'Software Engineering',
    subject: 'Software Engineering',
    semester: '7',
    year: 2022,
    type: 'final',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_5'
  },
  {
    id: '7',
    title: 'Calculus and Linear Algebra',
    subject: 'Calculus and Linear Algebra',
    semester: '1',
    year: 2024,
    type: 'CT-1',
    downloadUrl: 'https://drive.google.com/drive/folders/1ip_gN8-5k_lhNuDAnwShcwJPVxrWMG0M?usp=sharing'
  },
  {
    id: '8',
    title: 'Chemistry',
    subject: 'Chemistry',
    semester: '1',
    year: 2024,
    type: 'CT-1',
    downloadUrl: 'https://drive.google.com/drive/folders/1gZND3Bot3g5DKQFl7augCqZfX_qBQUyx?usp=sharing'
  },
  {
    id: '9',
    title: 'Chemistry',
    subject: 'Chemistry',
    semester: '1',
    year: 2024,
    type: 'CT-2',
    downloadUrl: 'https://drive.google.com/drive/folders/1Sh57xw4vjhhI1TlMDuzaZ485N185ttpt?usp=sharing'
  },
  {
    id: '10',
    title: 'Programming For Problem Solving',
    subject: 'Programming For Problem Solving',
    semester: '1',
    year: 2024,
    type: 'CT-1',
    downloadUrl: 'https://drive.google.com/drive/folders/1Br_431Udmj9UFKJ7r5mAZoa3xKkgQNfT?usp=sharing'
  }


];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'DSA Handwritten Notes',
    subject: 'Data Structures',
    semester: '3',
    uploadedBy: 'Vansh',
    uploadDate: '2024-10-16',
    downloadUrl: 'https://drive.google.com/file/d/1aWdnDMxz6FY4yq7FXs3-_gVE1Tukofb2/view',
    fileSize: '5.4 MB'
  },
  {
    id: '2',
    title: 'APP Handwritten Notes',
    subject: 'Advanced Programming Practice',
    semester: '3',
    uploadedBy: 'Vansh',
    uploadDate: '2024-10-16',
    downloadUrl: 'https://drive.google.com/file/d/1IEIS1XWJ_6jSQgiuYqgi6eA0kKbqluSK/view',
    fileSize: '10.0 MB'
  },
  {
    id: '3',
    title: 'Operating Systems Full Syllabus',
    subject: 'Operating Systems',
    semester: '3',
    uploadedBy: 'Vansh',
    uploadDate: '2025-10-16',
    downloadUrl: 'https://drive.google.com/drive/folders/1n7VZmVD2M2T9sDfy4P0pZeFQjiWdWyxM',
    fileSize: '20 MB'
  },
  {
    id: '4',
    title: 'OS Handwritten Notes',
    subject: 'Operating Systems',
    semester: '3',
    uploadedBy: 'Amulya',
    uploadDate: '2024-10-16',
    downloadUrl: 'https://drive.google.com/drive/folders/1iTPtjfaj8H5EGcdy_KymedKiM9tEhMJS',
    fileSize: '9.2 MB'
  },
  {
    id: '5',
    title: 'Integration Formula sheet',
    subject: 'Transforms and Boundary Value Problems',
    semester: '3',
    uploadedBy: 'Vansh',
    uploadDate: '2024-10-16',
    downloadUrl: 'https://drive.google.com/file/d/1_vlBS0mtCu9fM1BQOMz-gvsyIu6ir_uo/view',
    fileSize: '5.0 MB'
  },
];

export const mockExams: ExamEvent[] = [
  {
    id: '1',
    title: 'APP PROJECT REVIEW',
    subject: 'Advanced Programming Practice',
    date: '2025-10-16',
    time: '10:00 AM',
    type: 'practical',
    room: 'Room 506'
  },
  {
    id: '2',
    title: 'COA CT-2',
    subject: 'Computer Organization and Architecture',
    date: '2025-10-15',
    time: '2:00 PM',
    type: 'midterm',
    room: 'Room 506'
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
    title: 'Aaruush 2025',
    description: 'National Level Techno-Management Fest 2025',
    date: '2025-09-10',
    time: '9:00 AM',
    location: 'TP Ganeshan Auditorium',
    type: 'fest'
  },
  {
    id: '2',
    title: 'React Workshop',
    description: 'Learn modern React development techniques',
    date: '2024-10-18',
    time: '2:00 PM',
    location: 'Imac Lab',
    type: 'workshop'
  },
  {
    id: '3',
    title: 'Portfolio submission deadline',
    description: 'Final deadline for APP portfolio submission',
    date: '2024-10-16',
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
    url: 'https://sp.srmist.edu.in/',
    category: 'academic',
    icon: 'GraduationCap'
  },
  {
    id: '2',
    title: 'Library Portal',
    description: 'Search books, journals, and digital resources',
    url: 'https://library.srmist.edu.in/univlib/',
    category: 'resources',
    icon: 'Library'
  },
  {
    id: '4',
    title: 'Hostel Information',
    description: 'Accommodation details and services',
    url: 'https://www.srmist.edu.in/srm-hostels/',
    category: 'campus',
    icon: 'Home'
  },
  {
    id: '5',
    title: 'Elab',
    description: 'Elab is a auto evaluation tool for learning programming',
    url: 'https://dld.srmist.edu.in/ktretelab2024/#/',
    category: 'academic',
    icon: 'Code'
  },
  {
    id: '6',
    title: 'eCurricula',
    description: 'Provides centralized access to high quality educational resources',
    url: 'https://dld.srmist.edu.in/ktretecurricula2024/#/ktretecurricula2024/',
    category: 'academic',
    icon: 'Code'
  },
];