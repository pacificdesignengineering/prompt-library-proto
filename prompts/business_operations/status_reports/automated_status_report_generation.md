---
name: "Automated Status Report Generation"
category: "business_operations/status_reports"
description: "Generates Confluence-formatted status reports by pulling data from Jira, Confluence scope pages, and meeting notes."
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt, cursor]
compatible_interfaces: [api, ui, cli]
inputs: [reporting_period, customer_name, system_project_name, scope_pages, meeting_notes_location]
outputs: [status_report_confluence_format, po_review_analysis]
chaining_compatible: true
---

### Objective
Automatically generate status reports for projects by synthesizing Jira data, meeting notes, and scope documents.

### Process
1. Query Jira for completed work and risks.
2. Extract decisions from Confluence meeting notes.
3. Categorize by department and completion percentages.
4. Include formal decisions only in the report.
5. Output Confluence markup content for direct publication.
