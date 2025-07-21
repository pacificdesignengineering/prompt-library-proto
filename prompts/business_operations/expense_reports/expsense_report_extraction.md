---
name: "Expense Report Extraction"
category: "business_operations/expense_reports"
description: "Extracts and processes expense data from PDF invoices and credit card statements for entry into the PDE expense report template."
version: 1.0
author: "Mathieu Schneider"
compatible_llms: [claude, chatgpt]
compatible_interfaces: [ui, cli]
inputs: [pdf_invoices, credit_card_statements]
outputs: [tab_separated_expense_report]
chaining_compatible: false
---

### Objective
Extract expense data from PDF invoices and credit card statements, converting them into a fully formatted expense report for PDE.

### Process
1. Parse PDF invoices for: date, vendor, description, job number, base amount, GST/PST, and total.
2. Verify each invoice against the credit card CSV.
3. Apply currency conversion for USD invoices using credit card exchange rates.
4. Handle AWS and TELUS special processing protocols.
5. Output as a tab-separated format ready for Google Sheets import.

### Output
- Expense report data table
- AWS allocation breakdown
- TELUS individual line item expenses
- Currency conversion notes
