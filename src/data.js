window.HUB_DATA = {
  colors: {
    centerstoneBlue: '#347f8f', teal: '#6ab4aa', yellow: '#f2c35e', orange: '#dd9345', darkGray: '#3f3f3f', lightBlue: '#a6d8da', red: '#bf5a36', purple: '#6f385d'
  },
  checklists: {
    daily: [
      'Always PRIORITIZE PROVIDING CLIENTS CARE before any administrative task. Save administrative work for the end of the day.',
      'Complete 90-100% of clinical documentation (progress notes and care plans) collaboratively in session using Eleos as a note-taker. Confirm active PCP ROI is on file, then update the PCP Communication form the same time as the care plan update.',
      'Review your schedule for the upcoming day and adjust as needed.',
      'Remove your therapist hat at the end of the 8 hour workday.'
    ],
    weekly: [
      'Review your schedule to ensure high-risk and high-acuity clients are included and that you have enough sessions to meet your daily target. Share your schedule with your team lead during your weekly meeting.',
      'Check in with school contacts to assess school needs.',
      'Complete any assigned intakes in 45-60 minutes.',
      'Attend clinical supervision once weekly and update status in Avatar.',
      'Attend team meeting (aka administrative supervision) weekly and update status in Avatar.',
      'Submit time in Workday for Team Lead approval by noon every Friday.'
    ],
    monthly: [
      'Update school contact with pertinent information including referral communication, caseload list, any upcoming anticipated time off, and any appropriate additional information requested by the school.',
      'Collaborate with the navigator as needed for referral updates, expired paperwork, or difficult-to-reach families.',
      'Submit caseload count (per school, and telehealth — anyone not a student at one of your schools) to Team Lead in the first team meeting of the month.',
      'Complete all Relias trainings on or before due date.'
    ]
  },
  calendars: [
    { label: 'Metro Nashville Public Schools', url: 'https://resources.finalsite.net/images/v1772556285/mnpsorg/mnpsorg/evnn2p4puxpvncbtojm5/MNPSDistrictCalendar2026-2027_English_updated02092026.pdf' },
    { label: 'Murfreesboro City Schools', url: 'https://resources.finalsite.net/images/v1775835497/cityschoolsnet/iomdoih1pjalvwrt6ln7/2026-27-MCS-School-Calendar.pdf' },
    { label: 'Rutherford County Schools', url: 'https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/5892/Rcs/9bb22603-fc72-4ccb-84d9-c323a8730a22/2026-2027-RCSAcademicCalendar-v02.docx?disposition=inline' },
    { label: 'Lebanon Special School District', url: 'https://4.files.edl.io/aadb/11/22/24/201347-18f45683-53e6-46d5-bc34-9005b02841ad.pdf' },
    { label: 'Wilson County Schools', url: 'https://www.wcschools.com/calendar/#docaccess-31b3ad362aa71877e59dbb04698fe2fa' }
  ],
  sessionTypes: [
    { id: 'individual20', label: 'Individual 16–37 min', category: 'billable', duration: 20, credit: 0.63, color: 'teal' },
    { id: 'individual40', label: 'Individual 38–53 min', category: 'billable', duration: 40, credit: 0.82, color: 'teal' },
    { id: 'individual55', label: 'Individual 54–60 min', category: 'billable', duration: 55, credit: 1.0, color: 'teal' },
    { id: 'family30', label: 'Family 26+ min', category: 'billable', duration: 30, credit: 0.75, color: 'teal' },
    { id: 'intake60', label: 'Intake', category: 'billable', duration: 60, credit: 1.15, color: 'teal' },
    { id: 'group30', label: 'Group 30 min', category: 'billable', duration: 45, credit: 0.32, color: 'teal', requiresParticipants: true, note: '30 min group + 15 min transition' },
    { id: 'admin30', label: 'Admin 30 min', category: 'nonbillable', duration: 30, credit: 0, color: 'orange', requiresAdminTask: true },
    { id: 'admin60', label: 'Admin 60 min', category: 'nonbillable', duration: 60, credit: 0, color: 'orange', requiresAdminTask: true },
    { id: 'supervision60', label: 'Clinical Supervision 60 min', category: 'nonbillable', duration: 60, credit: 0, color: 'orange' },
    { id: 'pto4', label: 'PTO 4 Hour', category: 'pto', duration: 240, credit: 0, color: 'orange', ptoFactor: 0.5 },
    { id: 'pto8', label: 'PTO 8 Hour', category: 'pto', duration: 480, credit: 0, color: 'orange', ptoFactor: 1 }
  ],
  adminTasks: ['Finalizing daily documentation', 'School collaboration', 'Team meeting', 'Follow up communications', 'Drive time', 'Session prep', 'Other']
};
