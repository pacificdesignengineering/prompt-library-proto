# Report Review for Logical and Writing problems

---
name: "Report Review for Logical and Writing problems"
category: "technical_writing/report_review_support"
description: "Analyzes a provided report to identify logical flaws and writing issues, offering clear, actionable feedback for improvement while highlighting strengths."
version: 1.0
author: "Ajay Raman"
compatible_llms: [chatgpt]
compatible_interfaces: [ui]
inputs: [report_text]
outputs: [review report]
chaining_compatible: false
---

## How to Use This Prompt

### Quick Start Guide
1. **Prepare Your Input**: Paste your full report text into the input field
2. **Set Parameters**: Confirm that your text includes line numbers or clear paragraph breaks for easier locator tagging.
3. **Run the Prompt**: Run the prompt to generate analysis.
4. **Review & Process**: Review the logical critique, writing critique, strengths, and priority fix list.

### Video Tutorial
📹 **Screen Recording**: [How to Use Report Review for Logical and Writing problems](https://drive.google.com/file/d/17AImSQqffkMXUwEi09Nexds2Xb1m64rd/view?usp=drive_link)

### Step-by-Step Instructions
1. **Input Requirements**:
   A complete report or draft document. Ideally include line numbers or clearly separated paragraphs to enable precise locator tags.
   
2. **Expected Output**:
   A structured review containing an overview, numbered logical issues, numbered writing/clarity issues, strengths, and a prioritized fix list, all with locator tags and excerpts.

3. **Best Practices**:
   Provide the most complete version of your report possible. Include line numbers or paragraph breaks. Avoid partial excerpts that remove important context.

### Common Use Cases
Review all technical reports in Google Docs, Confluence etc before releasing to review internal or external release

---

## prompt

Role: You are an expert editor and logician.
Task: Read the report pasted below and
• Identify logical issues (unsupported claims, faulty assumptions, non-sequitur conclusions, circular reasoning, logical fallacies).
• Identify writing problems (ambiguity, unclear structure, weak transitions, grammar/punctuation errors, wordiness).

How to respond:

Overview (≤ 150 words) – Briefly summarize the report’s purpose and main argument.

Logical Critique – For each flaw, list in a numbered format:
• Locator tag in square brackets: either (a) an excerpt of the line to change (b) the line range if line numbers are visible—e.g., [L34-L37], or (c) the paragraph number you count—e.g., [¶5].
• Excerpt – quote the first 6–10 words so it’s searchable (truncate with “…” if longer).
• Issue – explain why it’s faulty.
• Fix – suggest a concrete correction or evidence needed.

Writing & Clarity Critique – Same structure as #2 (locator tag → short excerpt → issue → revision advice).

Strengths – Note at least two things the report does well.

Priority Fix List – Rank the top three issues (logic or writing) that will yield the biggest improvement if addressed first.

Formatting rules:
• Put each numbered issue on its own line for skimmability.
• Use the locator tags exactly as shown so I can search my document (e.g., Ctrl + F “[¶5]” or the quoted words).
• Keep the tone professional, candid, and constructive. Do not rewrite the whole report—focus on diagnostics and actionable feedback.


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