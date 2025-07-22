---
name: "Expense Report Extraction"
category: "business_operations/expense_reports"
description: "Extract and process expense data from PDF invoices and credit card statements to generate a complete digital expense report in Google Sheets, with special handling for AWS and TELUS invoices."
version: 1.1
author: "Mathieu Schneider"
compatible_llms: [claude]
compatible_interfaces: [ui, cli]
inputs: [pdf_invoices, credit_card_statements]
outputs: [tab_separated_expense_report]
chaining_compatible: false
---

## prompt 

## Project Overview
Extract expense data from PDF invoices and credit card statements to complete a digital expense report in Google Sheets. Use credit card statements to verify actual amounts paid in CAD, with special handling for AWS multi-account invoices and TELUS family plans.

## Files Needed
- **PDF Invoices**: Includes date, vendor, description, job number, base amount, GST/PST, total, and AWS-specific allocations.
- **Credit Card Statements (CSV)**: Provides CAD amounts, transaction dates, and foreign exchange rates.
- **PDE Expense Report Template**: Excel template recreated in Google Sheets.

## Step-by-Step Process
### Step 1: Google Sheet Setup
- Recreate the template with columns:
  - DATE, PURCHASED FROM, Description, JOB#, Base amount, GST?, PST?, AMOUNT (+PST), GST, TOTAL, Notes.

### Step 2: Credit Card Statement Processing
- Parse credit card CSV.
- Match transactions to vendors.
- Extract exchange rates for USD transactions.
- Document pending transactions.
- Prioritize CC amount over invoice amount when available.

### Step 3: Invoice Data Extraction & Conversion
- Extract invoice details: date, vendor, description, base amount, GST/PST status.
- Apply conversion:
  - **CAD Invoices**: Use as is.
  - **USD with CC Match**: Use CC CAD amount.
  - **Pending CC**: Estimate conversion using invoice rate.
  - **US SaaS (No Taxes)**: Convert full USD amount to CAD.

### Step 4: Special Handling
- **AWS Invoices**: Split by job code (IFD, PDE, RD Scan).
- **TELUS Family Plan**: Only expense Mathieu Schneider's portion.

### Step 5: Tax Handling
| Vendor Type | GST (5%) | PST (7%) | Notes |
|-------------|----------|----------|-------|
| Canadian Companies | ✓ | ✓ | Standard BC rates |
| US SaaS (Most) | ✗ | ✗ | No Canadian registration |
| Google Workspace | ✗ | ✓ | Simplified GST regime |
| AWS Canada | ✓ | ✓ | Canadian subsidiary |
| OpenAI | ✓ | ✓ | Registered in Canada |
| TELUS Canada | ✓ | ✓ | Individual portion only |

### Step 6: Validation & Quality Control
- Ensure all invoices are accounted for.
- Validate currency accuracy.
- Confirm AWS allocations sum to original total.
- Verify TELUS portion is accurate.
- Track pending transactions.

### Step 7: Final Report
- Chronologically sort entries.
- Calculate summary totals.
- Include notes on conversions and allocations.
- Format as **tab-separated values** for Google Sheets.

## Special Workflows
- **AWS Splitting**: Group accounts by job code, convert USD to CAD.
- **TELUS Plan**: Extract individual charges for Mathieu Schneider.
- **Pending Transactions**: Document pending and preauth discrepancies.

## Output Example
```
Date	Vendor	Description	Job Number	Base Amount	GST?	PST?	Amount (+PST)	GST	TOTAL	Notes
2025-07-15	AWS	Cloud hosting	IFD	290.06	TRUE	TRUE	310.36	14.50	324.86	Converted from USD @1.4249
2025-07-16	TELUS	Phone plan	PDE	50.00	TRUE	TRUE	53.50	2.50	56.00	Mathieu's portion only
```

## Quality Metrics
- All invoices processed and matched.
- Currency conversions documented.
- AWS allocations properly split.
- TELUS family plan correctly parsed.
- Accurate tax calculations.
- Proper pending transaction tracking.
- Output formatted for direct Google Sheets use.

## Summary Validation Checklist
- [ ] All invoices processed and categorized.
- [ ] Currency conversions documented.
- [ ] AWS allocations split by job code.
- [ ] TELUS family plan parsed for individual portion.
- [ ] Tax calculations verified.
- [ ] Pending transactions noted.
- [ ] Preauth discrepancies documented.
- [ ] Final totals verified.
- [ ] Output formatted as TSV.
- [ ] Ready for accounting submission.

<!-- END PROMPT -->