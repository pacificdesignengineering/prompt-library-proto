---
name: "Gmail to Confluence Meeting Minutes"
category: "project_management/meeting_minutes/from_gmail"
description: "Extracts meeting minutes from Gmail threads and formats them for Confluence."
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [chatgpt, claude]
compatible_interfaces: [api, ui]
inputs: [email_subject, confluence_page_id]
outputs: [confluence_formatted_meeting_minutes]
chaining_compatible: false
---

### Objective
Convert email conversations into formal meeting minutes suitable for Confluence publishing.

### Process
1. Retrieve full Gmail thread using MCP.
2. Identify participants, decisions, action items.
3. Structure content:
   - Email Context
   - Discussion Topics
   - Action Items
   - Decisions
4. Flag any Gmail API limitations in data completeness.
