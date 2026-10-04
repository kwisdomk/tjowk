# Chapter 7: Content Guide

> *"Adding content to KWAIX requires editing a text file, not clicking around in a bulky database GUI."*

---

## 1. Purpose

This chapter is a step-by-step cookbook for updating the site. It shows you exactly how to update your current operational status, add a new engineering project, record a certification, add a timeline entry, or publish a new journal post.

---

## 2. Quick Recipes

---

### Recipe 1: Update Your Live Operational Status (30 Seconds)

When your active daily focus or study track changes:

1. Open `content/status.json`.
2. Update the fields:
   ```json
   {
     "operation": "Developing kOS terminal telemetry integrations",
     "secondaryOp": "RHSA I — RH124 Ch10 Managing Local Linux Users",
     "machine": "Athena (HP Victus 15)",
     "uptime": "ACTIVE",
     "lastUpdated": "May 2026"
   }
   ```
3. Save the file.
4. Push to GitHub (`git commit -am "chore: update active operations" && git push`).
5. Vercel deploys the change to [kwaix.dev](https://kwaix.dev) automatically in under 45 seconds.

---

### Recipe 2: Add a New Engineering Project

When you build a new system or prototype:

1. Create a new JSON file inside `content/projects/` named after your project's slug (e.g. `content/projects/my-new-tool.json`).
2. Copy and fill out this template:
   ```json
   {
     "id": "my-new-tool",
     "codename": "TOOL-ALPHA",
     "title": "Automated Threat Scanner",
     "tagline": "A lightweight Python daemon for continuous port monitoring.",
     "category": "security",
     "phase": "systems",
     "status": "active",
     "date": "May 2026",
     "problem": "Manual port scans across internal subnets were slow and unmonitored.",
     "solution": "Built a zero-dependency async port listener integrated with Discord webhooks.",
     "impact": "Reduced detection latency from 24 hours to sub-5 seconds.",
     "stack": ["Python", "AsyncIO", "Docker", "Linux"],
     "featured": true,
     "links": {
       "github": "https://github.com/kwisdomk/my-new-tool"
     }
   }
   ```
3. **Valid Categories:** `"ai"`, `"security"`, `"web"`, `"infra"`, `"tools"`
4. **Valid Phases:** `"exploration"`, `"systems"`, `"production"`
5. **Valid Statuses:** `"active"`, `"paused"`, `"archived"`
6. Add a corresponding entry in `content/timeline.json` (see Recipe 4).

---

### Recipe 3: Record a Certification

1. Open `content/certs.json`.
2. Add a new object to the array:
   ```json
   {
     "title": "CompTIA Security+ (SY0-701)",
     "issuer": "CompTIA",
     "status": "in-progress",
     "deadline": "Nov 2026",
     "notes": "Targeting high-assurance baseline credentials"
   }
   ```
3. When completed, change `"status": "complete"`, add `"score": "92%"`, and add `"credlyUrl": "https://www.credly.com/badges/..."`.

---

### Recipe 4: Add a Timeline Milestone

1. Open `content/timeline.json`.
2. Add an entry into the array:
   ```json
   {
     "id": "MAS-MAS9",
     "date": "2026",
     "title": "OTDT — OpenShift & MAS 9.1",
     "type": "project",
     "summary": "Full deployment of Maximo Application Suite on Red Hat OpenShift.",
     "projectId": "otdt"
   }
   ```
3. **Valid Types:** `"project"`, `"experiment"`, `"milestone"`

---

### Recipe 5: Publish a Journal Dispatch

1. Create a new Markdown file in `content/journal/` using the date format `YYYY-MM-DD-slug.md` (e.g. `2026-05-15-openshift-storage-lessons.md`).
2. Add frontmatter at the very top:
   ```markdown
   ---
   title: "Lessons from Debugging OpenShift Ceph Storage"
   date: "2026-05-15"
   tag: "Infrastructure"
   summary: "What happened when a persistent volume claim failed during a MAS 9.1 installation and how we fixed it."
   ---

   ## The Outage

   Write your engineering field notes here...
   ```
3. The post will automatically appear on `/journal` and `/journal/openshift-storage-lessons`.

---

## 3. How to Test Your Changes Before Pushing

Always run the build check locally to make sure all Zod schemas pass:

```bash
# Test type checking and schema validation:
npm run build
```

If everything is valid, Next.js will output:
```
✓ Compiled successfully
✓ Generating static pages (100%)
```

---

## 4. Common Validation Errors and How to Fix Them

### Error: `Invalid enum value`
```
[loaders.ts] Project schema validation failed: [ { "path": ["category"], "message": "Invalid enum value" } ]
```
**Cause:** You used a category name like `"networking"` instead of one of the allowed 5 categories (`"ai"`, `"security"`, `"web"`, `"infra"`, `"tools"`).  
**Fix:** Change the category to an allowed value.

### Error: `Required`
```
[loaders.ts] Project schema validation failed: [ { "path": ["tagline"], "message": "Required" } ]
```
**Cause:** A mandatory field (like `tagline`, `title`, or `codename`) was omitted from the JSON file.  
**Fix:** Add the missing field to your JSON file.

---

## 5. Related Chapters

- [Chapter 3: Data Layer](03-data-layer.md) — Detailed specifications for all schemas.
- [Chapter 11: Rules & Philosophy](11-rules-and-philosophy.md) — Hard rules for content integrity.
