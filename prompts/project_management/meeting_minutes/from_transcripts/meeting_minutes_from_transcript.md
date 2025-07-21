---
name: "Meeting Minutes from Transcript"
category: "project_management/meeting_minutes/from_transcripts"
description: "Converts a raw meeting transcript into formal, template-compliant meeting minutes."
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt]
compatible_interfaces: [ui]
inputs: [meeting_transcript, template_url]
outputs: [formatted_meeting_minutes]
chaining_compatible: false
---

### Objective
Generate formal meeting minutes from provided transcript content, following the specified template.

### Process
1. Analyze transcript to extract:
   - Participants
   - Key decisions
   - Action items
   - Technical discussions
2. Apply required formatting standards.
3. Provide draft for approval prior to Confluence publishing.

### Critical Standards
- Use direct quotes for technical details.
- No inference; only facts stated in the transcript.
- Attribution required for speculative comments.
