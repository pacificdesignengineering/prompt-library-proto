---
name: "Automated Status Report Generation"
category: "business_operations/status_reports"
description: "Generates structured Confluence-formatted status reports by synthesizing Jira data, Confluence scope pages, and meeting notes for customer reporting."
version: 1.1
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt, cursor]
compatible_interfaces: [api, ui, cli]
inputs: [reporting_period, customer_name, system_project_name, scope_pages, meeting_notes_location, status_report_template]
outputs: [status_report_confluence_format, po_review_analysis]
chaining_compatible: true
---

## Quick Setup
Edit this section of the prompt:
```
REPORTING_PERIOD = "July 2025"
CUSTOMER = "Skyline Ziplines"
SYSTEM_PROJECT_NAME = "Skyline Ziplines (EZ Launch)"
SCOPE_PAGES = "SKY6618/pages/766542318/Proof-of-Concept+Development"
MEETING_NOTES_LOCATION = "SKY6618/pages/766902293/Meeting+Notes"
STATUS_REPORT_TEMPLATE = "SKY6618/pages/778272831/Template+Page"
```
Paste this configuration into the prompt.

After it runs:
1. Confirm the output.
2. Make any necessary adjustments.
3. Then prompt:
```
Publish this to:
SKY6618/pages/778272831/2025-07-10+Status+Report+-+Mat+Experiment
```

## What It Does
- Reads the status report template to understand the required format and structure.
- Pulls Jira data for the work completed during the reporting period.
- Extracts decisions from Confluence meeting notes via formal /decision entries.
- Maps work to departments based on assignees and content.
- Identifies roadblocks including blocked issues, budget concerns, and delays.

## Output
- **Report:** Ready-to-paste Confluence content that matches the template exactly.
- **Analysis:** Separate PO review with timeline, budget status, and recommendations.

## Key Features
- Auto-calculates completion percentages using status tags (0-25%, 26-50%, etc.).
- Maps work to departments: Firmware/Software, Electrical, Mechanical.
- Risk categorization: Blocked, Challenges, Risks, Budget tags.
- Decision extraction using provided JavaScript function.

## Usage Instructions
Simply:
1. Update the variables at the top.
2. Run the prompt.
3. The system fetches all data automatically from Confluence and Jira.

---

## Success Criteria
- Output matches the formatting and content expectations of the Confluence template.
- Analysis section provides clear, actionable recommendations.
- All decisions, risks, and progress percentages accurately reflected.

## Version Control
Version: 1.1  
Last Updated: 2025-07-21  
Compatible With: Confluence, Jira, MCP-integrated tools  
Recommended Use: Monthly or milestone project status reporting.
