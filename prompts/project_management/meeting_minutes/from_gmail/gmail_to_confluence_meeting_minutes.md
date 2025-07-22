# Gmail to Confluence Meeting Minutes

---
name: "Gmail to Confluence Meeting Minutes"
category: "project_management/meeting_minutes/from_gmail"
description: "Extract comprehensive meeting notes from a Gmail thread and format them for Confluence, handling Gmail API limitations gracefully."
version: 1.1
author: "Mathieu Schneider"
compatible_llms: [chatgpt, claude]
compatible_interfaces: [api, ui]
inputs: [EMAIL_SUBJECT, CONFLUENCE_PAGE]
outputs: [confluence_formatted_meeting_minutes]
chaining_compatible: false
---

## prompt

Create comprehensive meeting notes from the specified email thread and update the given Confluence page. Handle Gmail API limitations gracefully while maximizing content extraction.

Provide output for my review before updating the Confluence page.

### Task Parameters
- **Email Subject/Search:** {{EMAIL_SUBJECT}}
- **Confluence Page:** {{CONFLUENCE_PAGE}}

### Email Retrieval Protocol
1. Search for the email using `search_gmail_messages` with the provided subject/criteria.
2. Retrieve complete thread using `read_gmail_thread` with `include_full_messages=true`.
3. Validate content accessibility by ensuring message bodies contain actual content (not empty "data" fields or size=0).

### Gmail API Limitation Handling
- Gmail API often returns empty body content for multipart/related emails despite substantial size estimates.
- If body size is 0 but `sizeEstimate` >10KB, this indicates a Gmail API limitation.
- **Never assume missing content.** Work only with confirmed data and report limitations.

### Maximum Data Extraction Strategy
- Extract all information from:
  - Email headers: participants, dates, subjects.
  - Email snippets (~150 characters) for key topics.
  - Thread chronology.
- Cross-reference with any existing Confluence pages.
- Be transparent about data sources.

### Fallback Actions
- Explicitly report missing or limited data.
- Show actual API response limitations.
- Suggest uploading `.eml` files for full analysis.

### Content Requirements
- All participants with email addresses and roles.
- Complete timeline with exact dates/times.
- Specific technical information and exact quotes.
- Action items with assignees and deadlines.
- Decisions made with rationale and alternatives.

### Confluence Update Format
```
## 📄 Email Context

| Subject Title | {{EMAIL_SUBJECT}} |
| --- | --- |
| Email Start Date | [Start] to [End dates] |
| Participants | [All participants with roles] |
| **Data Quality** | **[X of Y emails with full content access]** |

## 🗣 Discussion Topics

[High-level summary of email thread purpose and key outcomes]

### Important Details

| **Date** | **Notes** |
| --- | --- |
| [Timestamp] | **[Sender to Recipient]**: "[Content]" **[Source: Full Email/Snippet]** |
| [Timestamp] | **[Key decisions, technical details, commitments]** |

**Content Access Note**: [If applicable] Some emails in this thread had limited content access via Gmail API (multipart/related format limitation). Analysis based on [specify sources used].

## ✅ Action Items

- [ ] @[Person] [Specific action] **[Due: date if specified]**
- [ ] @[Person] [Action] **[Status/Dependencies]**

## ⤴ Decisions

**[Decision]**: [Who] decided [what] based on [rationale]. **[Confidence level based on data completeness]**
```

### Response Protocols
- **If Gmail API limitations:**
  "I found the email thread but encountered Gmail API limitations with [X] of [Y] messages showing empty body content despite size estimates of [sizes]. I can extract information from headers and snippets: [list available data]. For complete analysis, please upload .eml files."

- **If mixed content access:**
  "Retrieved [X] emails with complete content and [Y] with limited access. Creating comprehensive notes based on available data, clearly marking content source quality."

- **If complete access:**
  "All emails fully accessible. Creating comprehensive meeting notes with complete content and exact quotes."

### Success Requirements
- **Transparency:** Report data access limitations.
- **Accuracy:** Only confirmed information.
- **Completeness:** Maximize available data.
- **Actionability:** Provide clear next steps.
- **Professional Quality:** Maintain standards regardless of constraints.

<!-- END PROMPT -->