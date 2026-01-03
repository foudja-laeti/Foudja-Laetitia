export interface DashboardStats {
    totalStudents?: number;
    totalTeachers?: number;
    totalClasses?: number;
    totalSubjects?: number;
    pendingGrades?: number;
    validatedGrades?: number;
    averageSuccess?: number;
    recentActivities?: Activity[];
  }
  
  export interface Activity {
    id: string;
    type: 'GRADE_SUBMITTED' | 'GRADE_VALIDATED' | 'BULLETIN_GENERATED' | 'USER_CREATED';
    description: string;
    user: string;
    timestamp: Date;
    icon: string;
    color: string;
  }