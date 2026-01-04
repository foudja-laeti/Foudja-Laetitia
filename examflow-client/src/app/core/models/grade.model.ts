export interface Grade {
    id: string;
    studentId: string;
    studentName: string;
    subjectId: string;
    subjectName: string;
    classId: string;
    evaluationType: 'DS' | 'INTERROGATION' | 'COMPOSITION';
    score: number;
    maxScore: number;
    coefficient: number;
    term: string;
    academicYear: string;
    teacherId: string;
    status: 'DRAFT' | 'SUBMITTED' | 'VALIDATED';
    submittedAt?: Date;
    validatedAt?: Date;
    validatedBy?: string;
    comments?: string;
  }
  
  export interface Subject {
    id: string;
    name: string;
    code: string;
    coefficient: number;
    teacherId: string;
    teacherName: string;
    department: string;
  }
  
  export interface Class {
    id: string;
    name: string;
    level: string;
    department: string;
    studentCount: number;
    academicYear: string;
  }
  