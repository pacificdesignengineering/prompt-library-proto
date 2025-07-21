# Contributing to prompt-library-proto

We welcome contributions! Follow these guidelines to maintain consistency.

## ✅ Prompt File Requirements
- **File type:** Markdown (.md)
- **Required Metadata:** YAML frontmatter with:
  - name
  - category
  - description
  - version
  - author
  - compatible_llms
  - compatible_interfaces
  - inputs
  - outputs
  - chaining_compatible

## ✅ Example Metadata
```yaml
---
name: "Example Prompt"
category: "category/path"
description: "Description of what the prompt does."
version: 1.0
author: "Your Name"
compatible_llms: [chatgpt, claude]
compatible_interfaces: [ui, cli, api]
inputs: [input1, input2]
outputs: [output1]
chaining_compatible: true
---
