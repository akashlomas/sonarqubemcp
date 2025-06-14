import { z } from 'zod';

// Schema for the response from GET /api/authentication/validate
export const SonarQubeAuthValidationResponseSchema = z.object({
    valid: z.boolean()
});

// Schema for a single project component in the SonarQube API (used in search results)
export const SonarQubeProjectComponentSchema = z.object({
    key: z.string(),
    name: z.string(),
    qualifier: z.string(), // e.g., 'TRK' for project, 'FIL' for file, 'DIR' for directory
    project: z.string().optional(), // The key of the parent project
    organization: z.string(), // Organization key
    // Add other relevant fields from the API response if needed
});

// Schema for the response from GET /api/projects/search
export const SonarQubeProjectsSearchResponseSchema = z.object({
    components: z.array(SonarQubeProjectComponentSchema),
    // paging and other metadata fields might be present but are omitted for simplicity
});

// Schema for a single measure in the SonarQube API
export const SonarQubeMeasureSchema = z.object({
    metric: z.string(),
    value: z.string(), // Value is often a string, even for numbers
    // Add other relevant fields like 'history' if needed
});

// Schema for the component details in the response from GET /api/measures/component
export const SonarQubeMeasuredComponentSchema = z.object({
    key: z.string(),
    name: z.string(),
    qualifier: z.string(),
    measures: z.array(SonarQubeMeasureSchema),
    // Add other relevant fields from the API response if needed
});

// Schema for the response from GET /api/measures/component
export const SonarQubeMeasuresComponentResponseSchema = z.object({
    component: SonarQubeMeasuredComponentSchema,
});

// Export types for convenience
export type SonarQubeAuthValidationResponse = z.infer<typeof SonarQubeAuthValidationResponseSchema>;
export type SonarQubeProjectComponent = z.infer<typeof SonarQubeProjectComponentSchema>;
export type SonarQubeProjectsSearchResponse = z.infer<typeof SonarQubeProjectsSearchResponseSchema>;
export type SonarQubeMeasure = z.infer<typeof SonarQubeMeasureSchema>;
export type SonarQubeMeasuredComponent = z.infer<typeof SonarQubeMeasuredComponentSchema>;
export type SonarQubeMeasuresComponentResponse = z.infer<typeof SonarQubeMeasuresComponentResponseSchema>;

// Note: Input schemas for tools like 'authenticate' or 'list_projects'
// are defined directly within index.ts using the z.object({...}) syntax
// as they are simple and specific to each tool's parameters.
// More complex or reusable input schemas could be defined here if necessary.