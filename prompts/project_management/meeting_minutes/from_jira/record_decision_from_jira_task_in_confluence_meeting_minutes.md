# Record decision from Jira Task in Confluence meeting minutes

---
name: "Record decision from Jira Task in Confluence meeting minutes"
category: "project_management/meeting_minutes/from_jira"
description: "Records /decision made in a Jira Task comments as an out of band meeting minute in Confluence so that the decision is traceable"
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [claude]
compatible_interfaces: [ui]
inputs: [JIRA_TICKET_KEY, CONFLUENCE_PAGE_URL]
outputs: []
chaining_compatible: false
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Create/publish the Confluence "out of band" meeting minutes and copy the Confluence page URL
2. **Set Parameters**: Copy the Jira issue URL
3. **Run the Prompt**: Review Claude's output, refine, then instruct Claude to publish
4. **Review & Process**: Review new Confluence minutes page, manually clean up as need 

### Video Tutorial
📹 **Screen Recording**: [How to Use Record decision from Jira Task in Confluence meeting minutes](N/A)

### Step-by-Step Instructions
1. **Input Requirements**:
   Jira issue should have a conversation within the comments that results in action_item or decision that needs to be tracked in Confluence
   
2. **Expected Output**:
   Published Confluence Out of Band meeting minutes 
and
Jira comment with link back to page showing decision etc 

3. **Best Practices**:
   Create the Confluence page and set it to restricted, then publish, edit and one complete, remove restrictions

### Common Use Cases
Jira issue conversation leads to action item or decision that needs to be tracked. 
Example, customer approves new or modified work

---

## prompt

I need to document a project decision that was made in Jira comments as a formal Confluence decision record.

**Jira Ticket**: {{JIRA_TICKET_KEY}}
**Confluence Template Page**: {{CONFLUENCE_PAGE_URL}}

Please:
1. Analyze the conversation/decision in the Jira ticket comments
2. Fill out the Confluence template page with:
   - Participants (from Jira commenters)
   - Context/background of the decision
   - Discussion topics and key points
   - Final decisions made with rationale
   - Action items and owners
   - References back to Jira and other documentation
3. **🚨 CRITICAL: PROVIDE PREVIEW FOR REVIEW BEFORE PUBLISHING 🚨**
   - Show me the completed Confluence content for approval
   - Show me the proposed Jira comment for review
   - Wait for my explicit approval before publishing anything
4. Only after approval: Add cross-reference comment to Jira and publish Confluence updates

**⚠️ IMPORTANT: Do not publish or update anything until I have reviewed and approved the content.**

This creates bi-directional linking between our project tracking (Jira) and decision documentation (Confluence).

<!-- END PROMPT -->

## Example Usage
```

```

## Best Practices


## Common Pitfalls to Avoid


## Adaptation Tips


---
Version: 1.0  
Last Updated: 2025-08-11  
Compatible With:   
Recommended Use: 