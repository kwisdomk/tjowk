// Data integrity contract — internal only. Never rendered.
// These are enforced by discipline, not by a linter.

export const rules = {
  no_fake_metrics: true,                           // Don't write "65% faster" unless you measured it
  no_stock_images: true,                           // Screenshots of real work only
  no_typewriter_hero: true,                        // Banned in all forms
  no_skill_progress_bars: true,                    // "Security: 87%" means nothing
  one_accent_color: 'emerald #10B981',             // Not negotiable
  all_activity_in_timeline: true,                  // Everything you built goes on the timeline
  inactive_projects_archived_not_deleted: true,    // The journey includes the abandoned ones
  no_placeholder_content_in_production: true,      // Except /journal
  no_secrets_in_frontend: true,                    // Ever
  status_must_reflect_real_activity: true,         // status.ts must be kept current
  content_first_ui_second: true,                   // If it works but looks plain, that's fine
} as const;
