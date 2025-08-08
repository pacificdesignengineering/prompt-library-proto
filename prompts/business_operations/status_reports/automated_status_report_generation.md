# Automated Status Report Generation

---
name: "Automated Status Report Generation"
category: "business_operations/status_reports"
description: "Generates a structured Confluence-formatted status report and PO review analysis using Jira, Confluence scope pages, and meeting notes. Includes embedded decision extraction logic."
version: 1.1
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt, cursor]
compatible_interfaces: [api, ui, cli]
inputs: [REPORTING_PERIOD, CUSTOMER, SYSTEM_PROJECT_NAME, SCOPE_PAGES, MEETING_NOTES_LOCATION, STATUS_REPORT_TEMPLATE]
outputs: [status_report_confluence_format, po_review_analysis]
chaining_compatible: true
---
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Have your reporting period and project details ready
2. **Set Project Parameters**: Provide customer, system name, and Confluence page locations
3. **Run the Prompt**: Copy the prompt and paste it into your preferred LLM interface
4. **Review & Publish**: The prompt will generate a comprehensive status report for your review

### Video Tutorial
📹 **Screen Recording**: [N/A]()

### Step-by-Step Instructions
1. **Input Requirements**:
   - Reporting period (e.g., "July 2025")
   - Customer and system/project name
   - Confluence scope pages location
   - Meeting notes location
   - Status report template page
   
2. **Expected Output**:
   - Confluence-formatted status report with departmental breakdown
   - PO review analysis with decision extraction
   - Work completed, planned, and remaining
   - Risks, roadblocks, and budget concerns

3. **Best Practices**:
   - Verify all Jira work items are properly categorized
   - Check decision extraction accuracy from meeting notes
   - Review departmental work breakdown
   - Validate budget and timeline accuracy

### Common Use Cases
- **Monthly Status Reports**: Regular project status updates for clients
- **Quarterly Reviews**: Comprehensive project health assessments
- **PO Review Analysis**: Contract and scope compliance verification
- **Risk Assessment**: Identify and document project challenges

---

## Required Variables

```
REPORTING_PERIOD = "July 2025"
CUSTOMER = "Skyline Ziplines"
SYSTEM_PROJECT_NAME = "Skyline Ziplines (EZ Launch)"
SCOPE_PAGES = "SKY6618/pages/766542318/Proof-of-Concept+Development"
MEETING_NOTES_LOCATION = "SKY6618/pages/766902293/Meeting+Notes"
STATUS_REPORT_TEMPLATE = "SKY6618/pages/778272831/Template+Page"
```

---

## Prompt

Please generate a Confluence-formatted status report for the following:

* **Reporting Period:** {{REPORTING_PERIOD}}
* **Customer:** {{CUSTOMER}}
* **System/Project Name:** {{SYSTEM_PROJECT_NAME}}
* **Scope Pages:** {{SCOPE_PAGES}}
* **Meeting Notes Location:** {{MEETING_NOTES_LOCATION}}
* **Status Report Template:** {{STATUS_REPORT_TEMPLATE}}

---

Generate a status report for the configured reporting period by:

1. **Reading the status report template page** to understand the required format and structure.
2. **Reading the scope documents** to identify project structure and associated Jira epics.
3. **Querying Jira** for work completed during the reporting period.
4. **Finding active/planned work** for next period.
5. **Identifying remaining work** from scope-defined epics.
6. **Extracting formal /decision macro entries** from meeting notes under the configured location using the decision extraction function below.
7. **Scanning for risks/roadblocks** based on blocked issues, budget keywords, and delays.
8. **Mapping all work items** to appropriate departments based on issue content and assignees.

---

### Decision Extraction Function

```javascript
function extractDecisionEntries(confluenceBody) {
   const decisions = [];

   const decisionsMatch = confluenceBody.match(/## .*?Decisions([\s\S]*?)(?=##|$)/i);
   if (!decisionsMatch) return [];

   let content = decisionsMatch[1];

   content = content.replace(/Type \/decision to record.*?constraints.*?'/gi, '');
   content = content.replace(/Example:.*?constraints.*?'/gi, '');
   content = content.replace(/_@person.*?constraints.*?'/gi, '');

   const decisionActors = /(?=(?:Customer|Client|PO|@\w+|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s)/i;
   const parts = content.split(decisionActors);

   for (const part of parts) {
       const trimmed = part.trim();
       if (trimmed.length > 15 &&
           trimmed.match(/^(Customer|Client|PO|@\w+|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?).*(wants|prefers|confirmed|will|has|intends|decided)/i)) {
           decisions.push(trimmed + (trimmed.endsWith('.') ? '' : '.'));
       }
   }

   return decisions;
}
```

### Usage

For each meeting note page retrieved during the reporting period, apply `extractDecisionEntries(pageBody)` to extract formal /decision macro entries. Combine all extracted decisions into the final report's Decisions section. If no decisions are found, state:

> *"No formal decisions recorded during this reporting period."*

---

### Report Format

* **Customer/System/Date header table**
* **Departmental tables for accomplished work** (with completion percentages using status tags: 0-25%, 26-50%, 51-75%, 76-99%, Done)
* **Planned work by department**
* **Remaining Statement of Work by department**
* **Roadblocks/challenges/risks/budget concerns** with status tags (blocked, Challenges, Risks, budget)
* **ONLY formal /decision macro entries** in the decisions section.

---

### Output Requirements

1. **First:** Provide the formatted status report content that matches the template structure exactly, including all Confluence-specific markup and Jira links.

2. **Then:** Provide a separate analysis section for PO review that includes:

   * Timeline considerations and milestones.
   * Budget status and tracking.
   * Synthesized decisions from discussions/comments (not formal /decision entries).
   * Additional context and recommendations.
   * Items requiring PO investigation or follow-up.
   * Overall project health assessment.

> The status report content should be **ready for direct Confluence publication after PO review**.

<!-- END PROMPT -->
---

### Quick Setup

1. Edit the variables in the block at the top as needed.
2. Paste this entire configuration into the LLM or prompt tool.
3. After execution:

   * Review the generated report and PO analysis.
   * Publish the final report to:

```
SKY6618/pages/778272831/2025-07-10+Status+Report+-+Mat+Experiment
```

---

### Success Criteria

* Output matches the Confluence template's formatting and content.
* The PO analysis section offers clear, actionable insights.
* Accurate reporting of progress, decisions, risks, and budget statuses.

---

### Version Control

* Version: 1.1
* Last Updated: 2025-07-21
* Compatible With: Confluence, Jira, MCP-integrated tools
* Recommended Use: Monthly or milestone project status reporting.
