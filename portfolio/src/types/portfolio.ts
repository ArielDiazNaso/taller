export enum SkillCategory {
  FRONTEND = "frontend",
  BACKEND = "backend",
  DATABASE = "database",
  TOOLS = "tools",
}

export type SkillCategoryKey = keyof typeof SkillCategory;

export interface UserProfile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly title: string;
  readonly tagline: string;
  readonly bio: string;
  readonly avatarUrl: string;
  readonly email: string;
  readonly phone: string | null;
  readonly location: string;
  readonly resumeUrl: string | null;
  readonly socials: ReadonlyArray<SocialLink>;
  readonly highlights: ReadonlyArray<string>;
}

export interface SocialLink {
  readonly id: string;
  readonly platform: string;
  readonly url: string;
  readonly iconKey: string;
}

export const SKILL_PROFICIENCY = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
  MASTER: 5,
} as const;

export type SkillProficiency = (typeof SKILL_PROFICIENCY)[keyof typeof SKILL_PROFICIENCY];

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly proficiency: SkillProficiency;
  readonly iconKey: string;
  readonly yearsOfExperience: number;
}

export enum ExperienceType {
  WORK = "work",
  EDUCATION = "education",
  ACHIEVEMENT = "achievement",
}

export interface ExperienceItem {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
  readonly type: ExperienceType;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: string;
  readonly bulletPoints: ReadonlyArray<string>;
  readonly order: number;
  readonly location: string | null;
  readonly relatedSkillsIds: ReadonlyArray<string>;
}

export interface ProjectTag {
  readonly id: string;
  readonly name: string;
  readonly color: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly imageUrl: string;
  readonly demoUrl: string | null;
  readonly repoUrl: string | null;
  readonly featured: boolean;
  readonly order: number;
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly tagIds: ReadonlyArray<string>;
  readonly screenshots: ReadonlyArray<string>;
}

export interface ContactMessage {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly createdAt: string;
  readonly read: boolean;
  readonly replied: boolean;
}

export interface ContactFormInput {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface PortfolioData {
  readonly profile: UserProfile;
  readonly skills: ReadonlyArray<Skill>;
  readonly experience: ReadonlyArray<ExperienceItem>;
  readonly projects: ReadonlyArray<Project>;
  readonly projectTags: ReadonlyArray<ProjectTag>;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}
