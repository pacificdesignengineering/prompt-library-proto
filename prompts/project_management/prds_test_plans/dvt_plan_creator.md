# DVT Plan Creator

---
name: "DVT Plan Creator"
category: "project_management/prds_test_plans"
description: "Generates a comprehensive Design Verification Test (DVT) plan for multi-PCB systems."
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [chatgpt, claude]
compatible_interfaces: [ui]
inputs: [PROJECT_NAME, SYSTEM_DESCRIPTION, ALTIUM_FILES, COMPLIANCE_REQUIREMENTS]
outputs: [dvt_plan_document]
chaining_compatible: true
---

## prompt

## Objective
Develop a detailed DVT plan for the project {{PROJECT_NAME}}: {{SYSTEM_DESCRIPTION}}. The plan should cover a three-PCB system including electrical, functional, EMI/EMC, mechanical, and compliance tests.

## Required Files
- Altium design files ({{ALTIUM_FILES}})
- BOM, DRC, ERC reports
- Firmware (if applicable)
- Mechanical files

## Plan Structure
1. Electrical Tests
2. Functional Tests
3. EMI/EMC & ESD
4. Mechanical & Assembly
5. Production Readiness
6. Compliance

## Optional Customizations
- Add/remove test cases
- Include automation scripting

<!-- END PROMPT -->