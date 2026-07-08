window.HUB_DATA = {
  colors: {
    centerstoneBlue: '#347f8f', teal: '#6ab4aa', yellow: '#f2c35e', orange: '#dd9345', darkGray: '#3f3f3f', lightBlue: '#a6d8da', red: '#bf5a36', purple: '#6f385d'
  },
  checklists: {
    daily: [
      'Prioritize client care before administrative tasks. Save routine administrative work for the end of the day when possible.',
      'Complete clinical documentation collaboratively in session using Eleos as a note-taker whenever appropriate.',
      'Review tomorrow\'s schedule and adjust for school changes, absences, or transportation barriers.',
      'Close the workday with a brief transition ritual so you can remove the therapist hat.'
    ],
    weekly: [
      'Review your schedule with your Team Lead and check whether you have enough sessions to meet your target.',
      'Check in with school contacts about referrals, schedule barriers, and emerging school needs.',
      'Attend clinical supervision and bring cases, questions, or documentation concerns.',
      'Attend team meeting and use it to stay connected, oriented, and supported.',
      'Submit time in Workday by noon Friday.'
    ],
    monthly: [
      'Update school contacts with caseload information, referral status, anticipated time off, and relevant program updates.',
      'Review inactive or hard-to-reach cases and document outreach clearly.',
      'Submit caseload count by school and telehealth to your Team Lead.',
      'Review Relias due dates and complete required trainings on time.'
    ]
  },
  first30Days: [
    { group: 'Before / First Day', items: ['Confirm laptop, login, Outlook, Teams, Zoom, Avatar, and Eleos access.', 'Save your Team Lead, mentor, supervisor, and crisis contact information.', 'Review shadowing expectations and know where to report.'] },
    { group: 'Week 1', items: ['Review the Field Guide and complete the first reflection pages.', 'Shadow school-based therapists with attention to workflow, not just interventions.', 'Learn school sign-in, office location, emergency procedures, and key school contacts.'] },
    { group: 'Week 2', items: ['Begin building a draft recurring schedule around school hours, supervision, team meeting, and admin blocks.', 'Practice Avatar workflows in UAT before using live records.', 'Meet with your mentor and bring real questions from your first school days.'] },
    { group: 'Week 3', items: ['Begin using Eleos and collaborative documentation habits.', 'Review parent engagement and referral communication expectations.', 'Practice one assessment or form workflow each day.'] },
    { group: 'Week 4', items: ['Review your schedule with your Team Lead and adjust for sustainability.', 'Identify one confidence area and one growth area to bring to supervision.', 'Make sure documentation, outreach, and required trainings are caught up before month two.'] }
  ],
  calendars: [
    { label: 'Metro Nashville Public Schools', file: 'assets/calendars/metro-nashville-public-schools.pdf' },
    { label: 'Murfreesboro City Schools', file: 'assets/calendars/murfreesboro-city-schools.pdf' },
    { label: 'Rutherford County Schools', file: 'assets/calendars/rutherford-county-schools.pdf' },
    { label: 'Lebanon Special School District', file: 'assets/calendars/lebanon-special-school-district.pdf' },
    { label: 'Wilson County Schools', file: 'assets/calendars/wilson-county-schools.pdf' }
  ],
  onboarding: [
    { title: 'Field Guide to the School-Based Ecosystem', summary: 'A first-year companion that orients therapists to role clarity, school culture, scheduling, productivity, energy, boundaries, and sustainable practice.', resources: ['A therapist field guide to the school-based ecosystem'] },
    { title: 'Shadowing', summary: 'Minimum three days of peer shadowing focused on school navigation, workflow, documentation habits, communication, and intake progression.', resources: ['School-Based Therapist Shadowing: What to Expect'] },
    { title: 'Mentorship', summary: 'A 60-day peer mentorship structure with weekly check-ins, practical support, confidence-building, and clear mentor boundaries.', resources: ['60-Day Mentorship: What to Expect'] }
  ],
  trainings: [
    { id: 'avatar', title: 'Avatar: Basic Navigation', trainer: 'Anna Tukivakala-Holly, LPC-MHSP and Tiffany Lester, LCSW', purpose: 'Opening a new client chart, understanding required forms, and managing cancellations correctly.', objectives: ['Use the Admission Bundle correctly', 'Identify required client forms and update timing', 'Complete all three cancellation types', 'Navigate Live vs UAT safely', 'Schedule an intake and apply Eleos from the first session'], resources: ['Avatar Basic Navigation', 'School-Based Fillable Forms'] },
    { id: 'scheduling', title: 'Scheduling for Success', trainer: 'Topher Fuqua, LMFT', purpose: 'Budget, balance, time management, and a practical schedule simulator for school-based work.', objectives: ['Understand how budget connects to mission', 'Prioritize work tasks while protecting balance', 'Use strategies that support target achievement', 'Build a recurring practice week'], resources: ['Scheduling for Success', 'District Calendars'], tool: 'scheduler' },
    { id: 'relationship', title: 'Relationship Building', trainer: 'Erin Edwards-Garrett, LMSW', purpose: 'Strengthening relationships with schools, families, and teams so clinical work has room to happen.', objectives: ['Recognize relationship building as a clinical skill', 'Strengthen school, caregiver, and teammate relationships', 'Practice perspective-taking and relational decisions', 'Use service flyers to introduce the therapist role'], resources: ['Relationship Building', 'Service Flyer Option 1', 'Service Flyer Option 2', 'Service Flyer Option 3'] },
    { id: 'telehealth', title: 'Telehealth 101', trainer: 'Gabriella-Natasha Byers, LPC-MHSP', purpose: 'Ethical, effective, and engaging telehealth service delivery.', objectives: ['Apply telehealth policy and consent standards', 'Document telehealth sessions accurately', 'Navigate Zoom and technology smoothly', 'Use telehealth-specific therapeutic activities'], resources: ['Telehealth 101', 'Telehealth Procedures', 'Telehealth Toybox'] },
    { id: 'diagnosing', title: 'Diagnosing with Confidence', trainer: 'Karen Hasselman, LCSW', purpose: 'Diagnostic reasoning in a school-based setting using DSM-5-TR, assessments, Z-codes, and Episodes of Care.', objectives: ['Access DSM-5-TR resources', 'Use diagnostic reasoning with confidence', 'Use assessments to support diagnosis', 'Understand Z-codes and EOC requirements'], resources: ['Diagnosing with Confidence', 'DSM-5-TR Simplified', 'Episodes of Care FAQ', 'DSM-5-TR Guess Who Rulebook', 'Printable Game Kit', 'Symptom Cluster Quick Reference'] },
    { id: 'prevention', title: 'Prevention Pathway Overview', trainer: 'Topher Fuqua, LMFT', purpose: 'Suicide prevention, violence risk, assessment, intervention, enrollment, and disenrollment decisions.', objectives: ['Identify the three clinical pathways', 'Administer and interpret PHQ-A, C-SSRS, INQ, and RROVS', 'Apply enrollment and disenrollment criteria', 'Use Stanley-Brown Safety Plan, Safety Sweep, CALM, and RELATE'], resources: ['Prevention Pathway Overview', 'C-SSRS Lifetime/Recent', 'C-SSRS Child Screener', 'INQ-15', 'RROVS', 'Stanley-Brown Safety Plan', 'Safety Sweep Checklist'] },
    { id: 'eleos', title: 'Eleos: Putting It Into Practice', trainer: 'Kenya Dabney, LPC-MHSP', purpose: 'Using Eleos as a note-taker so documentation becomes part of the session instead of work that follows you home.', objectives: ['Explain what Eleos captures and what it does not', 'Confirm Eleos access in Avatar Live', 'Set up Eleos Mobile', 'Start and stop Eleos smoothly', 'Map Eleos outputs to the note template'], resources: ['Eleos: Putting It Into Practice', 'Using Eleos + Collaborative Documentation'] },
    { id: 'groups', title: 'Starting School-Based Group Therapy', trainer: 'Topher Fuqua, LMFT', purpose: 'Moving from planning to practice with group design, consent, care plans, Avatar workflows, and facilitation.', objectives: ['Explain why group therapy works', 'Design a group appropriate for the school setting', 'Create a month-one implementation plan', 'Complete consent, care plan, and Avatar requirements', 'Launch with confidence'], resources: ['Starting School-Based Group Therapy'] },
    { id: 'cohort', title: 'New Hire Group', trainer: 'Tiffany Lester, LCSW', purpose: 'Eight-week cohort support focused on autonomy, problem-solving, reflection, and confidence development.', objectives: ['Connect with cohort peers', 'Build sustainable habits', 'Strengthen workflow and parent engagement', 'Practice crisis and school protocol reasoning', 'Exchange interventions and assess confidence'], resources: ['New Hire Cohort Workbook', 'New Hire Group Weekly Rotatable Deck'] }
  ],
  sessionTypes: [
    { id: 'individual20', label: 'Individual 16–37 min', category: 'billable', duration: 20, credit: 0.63 },
    { id: 'individual40', label: 'Individual 38–52 min', category: 'billable', duration: 40, credit: 0.82 },
    { id: 'individual55', label: 'Individual 53+ min', category: 'billable', duration: 55, credit: 1.0 },
    { id: 'family26', label: 'Family 26+ min', category: 'billable', duration: 30, credit: 0.75 },
    { id: 'group30', label: 'Group 30 min', category: 'billable', duration: 30, credit: 0.32, requiresParticipants: true },
    { id: 'intake60', label: 'Intake', category: 'billable', duration: 60, credit: 1.15 },
    { id: 'admin30', label: 'Admin 30 min', category: 'nonbillable', duration: 30, credit: 0, requiresAdminTask: true },
    { id: 'admin60', label: 'Admin 60 min', category: 'nonbillable', duration: 60, credit: 0, requiresAdminTask: true }
  ],
  adminTasks: ['Finalizing documentation', 'School collaboration', 'Team meeting', 'Clinical supervision', 'Follow-up communications', 'Drive time', 'Session prep', 'Other']
};
