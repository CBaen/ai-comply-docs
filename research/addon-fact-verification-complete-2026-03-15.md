# Add-On Product Fact Verification — COMPLETE — 2026-03-15
## Source: Claude in browser, extracted directly from .gov PDFs via Google Docs viewer
## Status: ALL ITEMS VERIFIED

## Colorado SB 24-205

### §6-1-1702 Developer Disclosure — COMPLETE (13 elements)
Developer must provide to deployers:
(a) General statement of foreseeable uses and known harmful/inappropriate uses
(b) Documentation of:
  (I) Summary of training data types
  (II) Known limitations including algorithmic discrimination risks
  (III) Purpose of the system
  (IV) Intended benefits and uses
  (V) All other info necessary for deployers to comply with §6-1-1703
(c) Documentation describing:
  (I) How system was evaluated for performance and discrimination mitigation
  (II) Data governance measures for training datasets
  (III) Intended outputs
  (IV) Measures to mitigate known/foreseeable discrimination risks
(d) Additional documentation to help deployers understand outputs and monitor for discrimination
§6-1-1702(3): Model cards, dataset cards, or other impact assessments
§6-1-1702(4): Public website statement summarizing high-risk AI systems and risk management approach

### 90-Day AG Notification — KEY DIFFERENCE IDENTIFIED
- **Developer** §6-1-1702(5): "caused or is reasonably likely to have caused" — BROADER trigger
- **Deployer** §6-1-1703(7): "has caused" — NARROWER trigger (requires actual causation)
Both: "without unreasonable delay but no later than ninety days"

## California CCPA ADMT Regulations

### §7123(c) Cybersecurity Audit — ALL 17 AREAS VERIFIED
1. Authentication (MFA, password requirements)
2. Encryption at rest and in transit
3. Account management and access controls (least privilege, privileged accounts, new accounts, physical access)
4. Inventory and management (PI inventories/maps, hardware/software inventories, approval processes)
5. Secure configuration (updates, cloud security, masking, patch management, change management)
6. Vulnerability scans, penetration testing, disclosure programs
7. Audit-log management (centralized storage, retention, monitoring)
8. Network monitoring and defenses (bot detection, IDS/IPS, DLP)
9. Antivirus and antimalware
10. Network segmentation (firewalls, routers, switches)
11. Port, service, and protocol controls
12. Cybersecurity awareness (current knowledge of threats)
13. Cybersecurity education and training
14. Secure development and coding practices
15. Oversight of service providers/contractors/third parties
16. Retention schedules and disposal
17. Incident response management

### §7220 Pre-Use Notice — COMPLETE (5 required content elements)
Must be provided before or at point of PI collection for ADMT use.
Required content per §7220(c):
1. Plain language explanation of specific ADMT purpose (NOT generic like "to make a significant decision")
2. Consumer's right to opt-out + how to submit request (or appeal info if using §7221(b)(1) exception)
3. Consumer's right to access ADMT + how to submit request
4. Statement that business cannot retaliate for exercising CCPA rights
5. Additional information about how ADMT works including:
   (A) How ADMT processes PI to make significant decision, including categories of PI that affect output
   (B) Type of output generated and how used for significant decision
   (C) Alternative process for consumers who opt out
Exclusions: trade secrets, security investigation info, fraud prevention, physical safety

### §7221(b) Opt-Out Exceptions — EXACTLY 3
1. **Human Appeal Exception**: Business provides method to appeal to human reviewer with authority to overturn
2. **Admission/Acceptance/Hiring Exception**: ADMT used solely for assessment of ability to perform, and doesn't discriminate
3. **Work Allocation/Compensation Exception**: ADMT used solely for work allocation/compensation, and doesn't discriminate

## NYC DCWP Implementing Rule

### §5-301 Bias Audit Requirements
**Selection-type AEDTs** must calculate:
- Selection rate for each category
- Impact ratio for each category
- Separate calculations for: (i) Sex, (ii) Race/Ethnicity, (iii) Intersectional sex × race/ethnicity
- Per-group calculations if AEDT classifies into groups
- Unknown category count

**Scoring-type AEDTs** must calculate:
- Median score for full sample
- Scoring rate for each category
- Impact ratio for each category
- Same (i)(ii)(iii) breakdown as selection type
- Unknown category count

**§5-301(d)**: Categories <2% of data may be excluded with justification

### Intersectional Testing — REQUIRED
§5-301(b)(3)(iii) and §5-301(c)(4)(iii) explicitly require "intersectional categories of sex, ethnicity, and race"
Example: "impact ratio for selection of Hispanic or Latino male candidates vs. Not Hispanic or Latino Black or African American female candidates"

### EEO-1 Categories Used
Hispanic or Latino, White, Black or African American, Native Hawaiian or Pacific Islander, Asian, Native American or Alaska Native, Two or More Races — each × Male/Female for intersectional

### §5-303 Published Summary Must Include
1. Date of most recent bias audit
2. Source and explanation of data used
3. Number of individuals in unknown category
4. Number of applicants/candidates
5. Selection or scoring rates for ALL categories
6. Impact ratios for ALL categories
7. Distribution date of the AEDT
- Must be on employment section of website, clear and conspicuous
- Can use hyperlink to separate page
- Must remain posted 6 months after last AEDT use
