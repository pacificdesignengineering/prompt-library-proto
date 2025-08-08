# Meeting Minutes from Transcript

---
name: "Meeting Minutes from Transcript"
category: "project_management/meeting_minutes/from_transcripts"
description: "Converts a raw meeting transcript into formal, template-compliant meeting minutes with structured formatting and critical accuracy standards."
version: 1.1
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

**Template Location:** {{TEMPLATE_URL}}

## Process Overview
### Step 1: Template Analysis
- Access and review the meeting minutes template.
- Identify required sections, formatting structure, and style guidelines.
- Note specific formatting requirements, macros, or special elements.

### Step 2: Content Processing
- Analyze the meeting transcript for key information.
- Extract participants, decisions, action items, and discussion points.
- Organize content according to the template structure.

### Step 3: Draft Creation
- Generate minutes in the exact template format.
- Incorporate formatting elements like status indicators, info panels, task lists.
- Maintain professional tone and clarity.
- **STOP: Do not proceed to publication. Present draft for approval first.**

### Critical Accuracy Requirements
- Include only statements explicitly made in the transcript.
- Use direct quotes for technical details.
- Clearly distinguish facts from opinions/speculation.
- Attribute interpretations properly (e.g., "According to [Name]...").
- Avoid presenting inferred information as facts.
- Quote directly or omit when uncertain.

### Step 4: MANDATORY Review Process
- **WAIT FOR APPROVAL: Present draft and await confirmation before publishing.**
- **DO NOT publish without explicit user consent.**
- Be prepared for revisions.
- **Before proceeding to Step 5, confirm:**
  - [ ] Draft reviewed by user
  - [ ] User explicitly approved publication
  - [ ] All requested revisions completed

### Step 5: Publication (ONLY AFTER APPROVAL)
- **MUST receive explicit user approval before publishing.**
- Publish to designated location post-approval.
- Verify formatting renders correctly.

### Step 6: Quality Verification
- Read published content to verify accuracy.
- Confirm formatting and functional elements.
- Report any discrepancies.

## Additional Requirements
### Content Standards
- Prioritize accuracy and completeness.
- Consistent formatting.
- Clear action items with owners and deadlines.

### Documentation Standards
- Quote all technical data.
- Distinguish decisions, opinions, and facts.
- Attribute summaries accurately.

### Template Customization Instructions
- Replace template URL with actual location.
- Customize formatting and verification steps.
- Adjust accuracy requirements as needed.

### Meeting Type Adaptations
- **External meetings:** Emphasize decisions and actions.
- **Internal meetings:** Focus on discussions and next steps.
- **Project meetings:** Highlight milestones and risks.
- **Status meetings:** Focus on updates and blockers.

### Common Template Formats
- Confluence: Macros, task lists, info panels.
- Word: Headers, tables, bullets.
- Google Docs: Comments, suggestions.
- Markdown: Checkboxes, tables.

## Quality Checklist
- Participants listed.
- Date, time, and purpose stated.
- All major topics captured.
- Action items assigned.
- Decisions with decision-makers identified.
- Technical details quoted.
- Template format followed.
- All links functional.
- Document accessible.

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
Version: 1.0  
Last Updated: [Insert Date]  
Compatible With: Confluence, Microsoft Word, Google Docs, Markdown  
Recommended Use: Project meetings, external client meetings, formal business meetings
