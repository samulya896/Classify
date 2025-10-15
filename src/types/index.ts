export interface User {
  id: string;
  name: string;
  email: string;
  course: string;
  year: string;
  semester: string;
}

export interface PYQ {
  id: string;
  title: string;
  subject: string;
  semester: string;
  year: number;
  type: string;
  downloadUrl: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  semester: string;
  uploadedBy: string;
  uploadDate: string;
  downloadUrl: string;
  fileSize: string;
}

export interface ExamEvent {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  type: 'midterm' | 'final' | 'practical';
  room: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'fest' | 'deadline' | 'seminar';
}

export interface ImportantLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'academic' | 'campus' | 'resources';
  icon: string;
}