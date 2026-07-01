import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string(),
  alias: z.string(),
  handles: z.object({
    github_primary: z.string(),
    github_secondary: z.string(),
    linkedin: z.string(),
    email: z.string(),
  }),
  role: z.string(),
  subRoles: z.array(z.string()),
  location: z.string(),
  timezone: z.string(),
  tagline: z.string(),
  philosophy: z.string(),
  machine: z.object({
    name: z.string(),
    specs: z.string().optional(),
  }),
  openTo: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const SystemStatusSchema = z.object({
  operation: z.string(),
  secondaryOp: z.string(),
  machine: z.string(),
  uptime: z.enum(['ACTIVE', 'STANDBY', 'MAINTENANCE']),
  lastUpdated: z.string(),
});

export type SystemStatus = z.infer<typeof SystemStatusSchema>;

export const CertStatusSchema = z.enum(['complete', 'in-progress', 'planned']);

export const CertSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  status: CertStatusSchema,
  score: z.string().optional(),
  date: z.string().optional(),
  deadline: z.string().optional(),
  credlyUrl: z.string().optional(),
  notes: z.string().optional(),
});

export type Cert = z.infer<typeof CertSchema>;
export type CertStatus = z.infer<typeof CertStatusSchema>;

export const CertsFileSchema = z.object({
  certs: z.array(CertSchema),
});

export const TimelineEntryTypeSchema = z.enum(['project', 'experiment', 'milestone']);

export const TimelineEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  year: z.number(),
  title: z.string(),
  type: TimelineEntryTypeSchema,
  summary: z.string(),
  projectId: z.string().optional(),
  highlight: z.boolean().optional(),
});

export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;
export type TimelineEntryType = z.infer<typeof TimelineEntryTypeSchema>;

export const TimelineFileSchema = z.object({
  entries: z.array(TimelineEntrySchema),
});

export const ProjectPhaseSchema = z.enum(['exploration', 'systems', 'production', 'concept', 'learning']);
export const ProjectStatusSchema = z.enum(['active', 'paused', 'archived', 'maintained', 'exploring']);
export const ProjectCategorySchema = z.enum(['ai', 'security', 'web', 'infra', 'tools', 'automation']);

export const ProjectVisualSchema = z.object({
  src: z.string(),
  type: z.enum(['diagram', 'screenshot']),
  alt: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  codename: z.string(),
  title: z.string(),
  tagline: z.string(),
  phase: ProjectPhaseSchema,
  status: ProjectStatusSchema,
  date: z.string(),
  featured: z.boolean(),
  featuredOrder: z.number().int().positive().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  workflow: z.string().optional(),
  stack: z.array(z.string()),
  category: ProjectCategorySchema,
  links: z.object({
    github: z.string().optional(),
    live: z.string().optional(),
    windowsScript: z.string().optional(),
    linuxScript: z.string().optional(),
  }).optional(),
  visuals: z.array(ProjectVisualSchema).optional(),
  platforms: z.array(z.object({
    name: z.string(),
    status: z.enum(['stable', 'beta', 'experimental', 'planned']),
  })).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectPhase = z.infer<typeof ProjectPhaseSchema>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
export type ProjectVisual = z.infer<typeof ProjectVisualSchema>;

export const PostMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  tag: z.string(),
  summary: z.string(),
});

export type PostMetadata = z.infer<typeof PostMetadataSchema> & { slug: string };
