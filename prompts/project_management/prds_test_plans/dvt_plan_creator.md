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

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Have your project details and Altium files ready
2. **Set Project Parameters**: Provide project name, system description, and compliance requirements
3. **Run the Prompt**: Copy the prompt and paste it into your preferred LLM interface
4. **Review & Customize**: The prompt will generate a comprehensive DVT plan for your review

### Video Tutorial
📹 **Screen Recording**: [How to Use DVT Plan Creator](https://example.com/dvt-plan-tutorial)

### Step-by-Step Instructions
1. **Input Requirements**:
   - Project name and system description
   - Altium design files location
   - Compliance requirements (safety, EMI/EMC, etc.)
   
2. **Expected Output**:
   - Comprehensive DVT plan covering electrical, functional, EMI/EMC, mechanical tests
   - Structured test cases with pass/fail criteria
   - Production readiness assessment
   - Compliance verification checklist

3. **Best Practices**:
   - Review and customize test cases for your specific system
   - Add automation scripting where applicable
   - Include all relevant compliance standards
   - Verify test coverage for all PCB assemblies

### Common Use Cases
- **Multi-PCB Systems**: Comprehensive testing for complex electronic assemblies
- **Safety-Critical Systems**: Focus on safety and compliance testing
- **EMI/EMC Compliance**: Detailed electromagnetic compatibility testing
- **Production Readiness**: Validation for manufacturing scale-up

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