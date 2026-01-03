export interface Bulletin {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    term: string;
    academicYear: string;
    subjects: BulletinSubject[];
    generalAverage: number;
    rank: number;
    totalStudents: number;
    appreciation: string;
    generatedAt: Date;
    status: 'DRAFT' | 'VALIDATED' | 'PRINTED';
  }
  
  export interface BulletinSubject {
    subjectName: string;
    coefficient: number;
    scores: {
      ds?: number;
      interrogation?: number;
      composition?: number;
    };
    average: number;
    weightedAverage: number;
    appreciation: string;
  }
  