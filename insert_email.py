import sys

filepath = 'C:/Users/baenb/projects/project _cameron/aicomplydocs/src/app/api/send-documents/route.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_email = (
    '  "virginia-cdpa": {\n'
    '    title: "Your Virginia CDPA AI Profiling Compliance Package",\n'
    '    statute: "Va. Code \u00a7\u00a7 59.1-575 through 59.1-584",\n'
    '    description:\n'
    '      "AI profiling compliance documentation templates, aligned with Virginia Consumer Data Protection Act (Va. Code \u00a7\u00a7 59.1-575 through 59.1-584) requirements. Review each document with your legal team before deployment.",\n'
    '    steps: [\n'
    '      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Virginia CDPA, including targeted advertising and data sales disclosures (\u00a7 59.1-578(D)).",\n'
    '      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00a7 59.1-580(A)(3)).",\n'
    '      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00a7 59.1-578(B)).",\n'
    '      "<strong>File everything.</strong> The Virginia AG enforces the CDPA and may request Data Protection Assessments (\u00a7 59.1-580(B)). These documents demonstrate compliance.",\n'
    '    ],\n'
    '    reminder:\n'
    '      "The Virginia Consumer Data Protection Act (Va. Code \u00a7\u00a7 59.1-575 through 59.1-584) has been in effect since January 1, 2023. The Virginia Attorney General has exclusive enforcement authority (\u00a7 59.1-584(A)); there is no private right of action. The AG must provide a 30-day cure period before seeking civil penalties of up to $7,500 per violation (\u00a7 59.1-584(C)).",\n'
    '  },\n'
    '  "connecticut-ctdpa": {\n'
    '    title: "Your Connecticut CTDPA AI Profiling Compliance Package",\n'
    '    statute: "Conn. Gen. Stat. \u00a7\u00a7 42-515 through 42-525",\n'
    '    description:\n'
    '      "AI profiling compliance documentation templates, aligned with Connecticut Data Privacy Act (Conn. Gen. Stat. \u00a7\u00a7 42-515 through 42-525, PA 22-15) requirements. Review each document with your legal team before deployment.",\n'
    '    steps: [\n'
    '      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Connecticut CTDPA (\u00a7 42-520).",\n'
    '      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00a7 42-522(a)(3)).",\n'
    '      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00a7 42-519(b)).",\n'
    '      "<strong>File everything.</strong> The Connecticut AG enforces the CTDPA and may request Data Protection Assessments (\u00a7 42-522(c)). These documents demonstrate compliance.",\n'
    '    ],\n'
    '    reminder:\n'
    '      "The Connecticut Data Privacy Act (PA 22-15, Conn. Gen. Stat. \u00a7\u00a7 42-515 through 42-525) has been in effect since July 1, 2023. The Connecticut Attorney General has exclusive enforcement authority (\u00a7 42-525(a)); there is no private right of action. The mandatory 60-day cure period expired December 31, 2024 \u2014 the AG now has enforcement discretion. Penalties: up to $5,000 per violation under CUTPA (\u00a7 42-110o).",\n'
    '  },\n'
    '  "oregon-cpa": {\n'
    '    title: "Your Oregon CPA AI Profiling Compliance Package",\n'
    '    statute: "ORS \u00a7\u00a7 646A.570 through 646A.604",\n'
    '    description:\n'
    '      "AI profiling compliance documentation templates, aligned with Oregon Consumer Privacy Act (ORS \u00a7\u00a7 646A.570 through 646A.604) requirements. Review each document with your legal team before deployment.",\n'
    '    steps: [\n'
    '      "<strong>Update your Privacy Notice</strong> to include consumer rights, opt-out disclosures, and your children\u2019s data consent practices for consumers aged 13\u201315 (\u00a7 646A.578).",\n'
    '      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00a7 646A.586(1)(a)).",\n'
    '      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00a7 646A.576(2)(b)).",\n'
    '      "<strong>Implement consent collection</strong> for consumers aged 13\u201315 before processing their data for targeted advertising or data sales (\u00a7 646A.576(1)(c)).",\n'
    '    ],\n'
    '    reminder:\n'
    '      "The Oregon Consumer Privacy Act (ORS \u00a7\u00a7 646A.570 through 646A.604) has been in effect since July 1, 2024. The Oregon Attorney General has enforcement authority (\u00a7 646A.604); there is no private right of action. A 30-day cure period applies until January 1, 2026 (\u00a7 646A.604(2)). Penalties: up to $7,500 per violation under UTPA (ORS \u00a7 646.642).",\n'
    '  },\n'
)

target = '  "minnesota-mcdpa": {'
if target in content:
    content = content.replace(target, new_email + target, 1)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: inserted 3 email entries before minnesota-mcdpa')
else:
    print('ERROR: target not found')
    sys.exit(1)
