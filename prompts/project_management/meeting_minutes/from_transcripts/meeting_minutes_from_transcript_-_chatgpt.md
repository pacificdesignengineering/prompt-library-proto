# Meeting Minutes from Transcript - ChatGPT

---
name: "Meeting Minutes from Transcript - ChatGPT"
category: "project_management/meeting_minutes"
description: "Uses Gemini meeting transcript and converts to Confluence based structure format.
version: 1.0
author: "Ajay Raman"
compatible_llms: [chatgpt]
compatible_interfaces: [ui]
inputs: []
outputs: [confluence_ready_meeting_minutes]
chaining_compatible: false
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Download or copy the transcript
2. **Set Parameters**: attach or paste transcript to bottom of prompt "Transcript Starts Here:"
3. **Run the Prompt**: Copy the prompt and paste it into your preferred LLM interface
4. **Create the Confluence meeting minutes**: i.e. create new external meeting minutes button
5. **Review & Process**: Review output, adjust/correct if needed. 
6. **Transfer**: Manually paste over content to Confluence and adjust formatting.

### Video Tutorial
📹 **Screen Recording**: [How to Use Meeting Minutes from Transcript - ChatGPT]https://drive.google.com/file/d/16O4bZRfakDPaFxT62TdSgnxWldD6mj7H/view?usp=drive_link)

### Step-by-Step Instructions
1. **Input Requirements**:
   Meeting transcript
   
2. **Expected Output**:
   PDE' Confluence meeting minutes template structure. Requires manual copy/paste into Confluence and editing to leverage macros (/decisions, /action_items, @mentions etc) 

3. **Best Practices**:
   Always review output

### Common Use Cases
convert meeting transcript to Confluence ready meeting minutes

---

## prompt

Using the following as a template. fill in the template using the meeting transcript Ensure there is significant detail for each question  or topic discussed such that each talking point allows the reader to understand the context of the discussion even if they were not there. 
Template : 

 Date

add '/date' here

 Participants





 Goals





 Discussion topics

Item

Notes









 Action items

Add Action items to close the loop on open questions or discussion topics. Ensure someone is assigned to the action item with '@'. Add a /date if the action item requires a deadline



 

 Decisions

Type /decision to record the decisions you make in this meeting. Ensure decisions contain the agent that made the decision, the decision itself, and the reason.  Example: ‘@person intends to X because of Y’ or ‘Customer has removed X from scope due to time constraints’

Transcript Starts Here:

<!-- END PROMPT -->

## Example Usage
```

```

## Best Practices


## Common Pitfalls to Avoid


## Adaptation Tips


---
Version: 1.0  
Last Updated: 2025-08-08  
Compatible With:   
Recommended Use: 