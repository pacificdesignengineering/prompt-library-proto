# Meeting Minutes from Transcript

---
name: "Meeting Minutes from Transcript"
category: "project_management/meeting_minutes/from_transcripts"
description: "Converts a raw meeting transcript into formal, template-compliant meeting minutes with structured formatting and critical accuracy standards."
version: 1.2
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt]
compatible_interfaces: [ui]
inputs: [MEETING_TRANSCRIPT, TEMPLATE_URL]
outputs: [published_confluence_meeting_minutes]
chaining_compatible: false
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Have your meeting transcript ready (text format)
2. **Set Confluence Meeting Minutes URL**: Provide the URL to your meeting minutes
3. **Run the Prompt**: Copy the prompt and paste it into your preferred LLM interface
4. **Review & Approve**: The prompt will generate a draft for your review before finalizing

### Video Tutorial
📹 **Screen Recording**: [How to Use Meeting Minutes Prompt](https://drive.google.com/file/d/1VWof14_ZZ6892AiStmpuMhicyB-v-v8J/view?usp=drive_link)

### Step-by-Step Instructions
1. **Input Requirements**:
   - Meeting transcript (raw text from recording or notes)
   - Minutes URL (Confluence)
   
2. **Expected Output**:
   - Confluence formatted meeting minutes following your template provided
   - *Requires manual post* formatting for Confluence Macros and mentions
   - Structured with participants, decisions, action items
   - Ready for review and publishing

3. **Best Practices**:
   - Always review the generated draft before finalizing
   - Verify technical details are accurately quoted
   - Check that action items have clear owners and *deadlines* when applicable

### Common Use Cases
- **Project Status Meetings**: Focus on milestones and blockers
- **Client Meetings**: Emphasize decisions and next steps
- **Internal Team Meetings**: Capture discussions and action items
- **External Stakeholder Meetings**: Highlight key decisions and commitments

---

## prompt

## Context
Attached is a meeting transcript that needs to be converted into formal meeting minutes following our standardized meeting format.



Context

Attached is a complete meeting transcript.
Your task is to convert it into formal, factually accurate meeting minutes that conform to our organization’s documentation standards.
The format and tone must be professional, objective, and suitable for publication or archival in Confluence Cloud.
Use the following Confluence page as a template and to publish to:
**Template Location:** {{TEMPLATE_URL}}

Process Overview
Step 1 – Template Analysis

Review the meeting-minutes template specified by the user (if provided).

Identify required structural sections (e.g., date, attendees, goals, topics, decisions, action items, ambiguities).

Preserve required formatting such as tables, headings, task lists, or Confluence macros.

If no template is provided, default to a standard structure:

Date / Time / Duration

Participants (by organization or role)

Goals or Agenda

Discussion Topics (in tabular format)

Decisions

Action Items

Ambiguities / Follow-ups

Quality Checklist

Step 2 – Transcript Processing Requirements

Read the entire transcript in full before summarizing.

Do not stop after the first section or topic.

Meetings may include multiple subject areas (e.g., sales updates, engineering design, project planning, risk reviews).

Every major section of discussion must be represented in the final minutes.

After reading, produce a coverage checklist listing each main topic or transition you detected.

Example: “1. Budget forecast, 2. Product roadmap, 3. Security compliance, 4. Marketing alignment.”

If any section of the meeting seems missing or truncated, clearly flag this before drafting minutes.

Step 3 – Validated Fact Extraction

Extract factual content from the entire transcript.
Record only what is explicitly stated or clearly implied.

Capture the following elements:

Date, time, and meeting title

Participant list and organizational affiliation

Key topics discussed

Decisions made (with context)

Action items (with owner and due date, if mentioned)

Quantitative data or technical details (quote or paraphrase accurately)

Open questions or unresolved issues

Rules:

Quote directly when technical or numeric information is given.

Do not infer meaning beyond what is said.

If a template section has no data, insert:

“No statements recorded in the transcript.”

Attribute each decision or recommendation to the correct speaker.

When uncertain, note:

“[Unclear in transcript – pending clarification].”

Step 4 – Draft Creation

Using the validated facts, generate a formal meeting-minutes draft.
Follow these standards:

Maintain a neutral, factual tone (no opinions or speculation).

Present discussion topics in chronological or logical order.

Use tables for Discussion Topics (columns: Item | Notes).

Use checkbox lists for Action Items (e.g., - [ ] Owner – Task – Due date).

Under each Decision, include:

Agent / Decision Maker

Decision Summary

Rationale or Impact

Include a section titled Ambiguities / Missing Information for anything unclear, unrecorded, or requiring follow-up.

Step 5 – Quality Verification and Review Gate

Before completing the output, confirm the following:

Quality Checklist

 All entries traceable to transcript evidence

 No invented or assumed details

 Each technical or numeric statement quoted or attributed

 All sections of the transcript represented

 Professional tone and structure maintained

 Clearly distinguished facts, decisions, and action items

 Ambiguities explicitly listed

 Draft prepared for review only — do not publish automatically

Then output:

Coverage Checklist – list of topics found in the full transcript

Validated Facts Table – key points extracted

Formal Meeting Minutes Draft (in the required format)

Ambiguities / Missing Information list

Content Standards

Prioritize accuracy over completeness.

Do not invent data to fill empty sections.

Maintain clarity, conciseness, and professional readability.

Use Canadian or local corporate English as appropriate.

Format dates as YYYY-MM-DD.

Attribute all statements by name or role when known.

Optional Enhancements for Long Transcripts

Process the transcript in segments (e.g., every 5–10 minutes or ~500 lines).

Extract and summarise each segment, then merge them chronologically.

Confirm end-of-file reached before producing the final draft.

Success Criteria

The final output must:

Represent the entire meeting (no section omitted)

Contain zero speculation or fabrication

Be formatted for direct insertion into a documentation system

Be ready for user or SME review prior to publication

<!-- END PROMPT -->

## Example Usage
```
# Meeting Minutes Generation Instructions

## Context
I have attached a meeting transcript that needs to be converted into formal meeting minutes following our standardized [ORGANIZATION] meeting format.
Template Location: {{TEMPLATE_URL}}

[Process steps customized for the organization]

## Additional Requirements
- [Organization-specific requirements]
- [Compliance or legal requirements]
- [Distribution requirements]
```

## Best Practices
- Verify template access before starting.
- Test publication with a draft.
- Retain original transcript for reference.
- Set review timelines.
- Standardize formatting.

## Common Pitfalls to Avoid
- Do not assume unstated information.
- Avoid combining unrelated points.
- Avoid jargon without direct quotes.
- Do not publish without approval.
- Verify formatting before publishing.

## Adaptation Tips
- Modify accuracy for sensitive meetings.
- Adjust detail for the audience.
- Customize action item formats.
- Include compliance and industry-specific terminology.

---
Version: 1.2  
Last Updated: 2025-10-21  
Compatible With: Confluence, Microsoft Word, Google Docs, Markdown  
Recommended Use: Project meetings, external client meetings, formal business meetings
