import { defineRealOpportunity } from '../lib/defineRealOpportunity'
import type { Opportunity } from '../types/opportunity'

// Official-source snapshots. Each field explicitly records its own evidence and
// actual check date. Never infer verification from a populated value.
export const realOpportunities: readonly Opportunity[] = [
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement:
      'At least two undergraduate years completed; up to first-year master’s by the programme start.',
    gpaRequirement:
      'Equivalent to 3.75/4.0 or top 5% of the class; see the FAQ for borderline cases.',
    requiredDocuments: [
      'Academic transcript(s)',
      'Short personal and scientific essays',
      'Referee details and one recommendation',
    ],
    funding: 'Funded',
    fundingDetails:
      'CHF 3,600 for two months; housing is deducted. Travel reimbursement has distance-based caps.',
    duration: '8 weeks',
    period: 'Summer',
    deadline: '2026-11-15',
    applicationStatus: 'Open',
    applicationRoute:
      'Use the official online form. Prepare materials first: the form must be finished in one sitting.',
    verificationStatus: 'Source checked',
    location: 'Lausanne; some host labs in Geneva',
    eligibilityDetails:
      'Relevant life-sciences degree; remain enrolled throughout. Read the official rules for transitional bachelor-to-master cases.',
    dates: '5 July–27 August 2027',
    costs:
      'Housing is paid from the stipend, not added to it. Check travel reimbursement limits before booking.',
    id: 'epfl-srp-2027',
    slug: 'epfl-life-sciences-summer-2027',
    title: 'Life Sciences Summer Research Program 2027',
    institution: 'EPFL',
    country: 'Switzerland',
    scientificTopics: [
      'Genomics',
      'Molecular biology',
      'Bioinformatics',
      'Neuroscience',
    ],
    cycleLabel: 'Summer 2027',
    description:
      'Join a life-sciences laboratory for supervised research, scientific workshops and a final presentation. Full attendance is required.',
    deadlineAt: '2026-11-15T23:59:00+01:00',
    sourceUrl:
      'https://www.epfl.ch/schools/sv/education/summer-research-program/',
    sources: [
      {
        title: '2027 call and dates',
        url: 'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Eligibility and application',
        url: 'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Programme and funding',
        url: 'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Application FAQ',
        url: 'https://www.epfl.ch/schools/sv/education/summer-research-program/faqs/',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/program-description/',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/how-to-apply/',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      '2 undergraduate years completed; up to first-year master’s. GPA 3.75/4 or top 5%.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'Two bachelor’s years completed; enrolled in year three during the programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'Programme questionnaire',
      'Academic transcript with translation if needed',
      'Two recommendation letters',
    ],
    funding: 'Funded',
    fundingDetails:
      'Scholarship covers travel from the university’s country, accommodation and food.',
    duration: '8 weeks',
    period: 'Summer',
    deadline: '2026-11-15',
    applicationStatus: 'Open',
    applicationRoute:
      'Submit the online application and choose two lab heads. References share the 15 November deadline.',
    verificationStatus: 'Source checked',
    location: 'Lausanne',
    eligibilityDetails:
      'Biology, medicine or closely related biological studies. The source lists excluded disciplines; prior research is not a selection criterion.',
    dates: 'Starts 5 July 2027; eight-week programme',
    costs: null,
    id: 'unil-sur-2027',
    slug: 'unil-summer-undergraduate-research-2027',
    title: 'Summer Undergraduate Research Programme 2027',
    institution: 'University of Lausanne',
    country: 'Switzerland',
    scientificTopics: ['Life sciences', 'Biomedicine'],
    cycleLabel: 'Summer 2027',
    description:
      'Carry out a laboratory project in the Faculty of Biology and Medicine, then present a poster and written report.',
    sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
        note: 'The source says midnight CET on 15 November; confirm the exact cut-off rather than assuming a minute.',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'Third-year bachelor’s during the programme; biology, medicine or related studies.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At least two undergraduate years completed before the placement; retain undergraduate status afterward.',
    gpaRequirement: null,
    requiredDocuments: [
      'Project motivation letter(s)',
      'CV',
      'Course list',
      'Transcript',
      'Enrolment certificate',
      'Academic reference',
    ],
    funding: 'Funded',
    fundingDetails:
      'DAAD or Mitacs support depends on the student’s university country; includes financial and insurance support.',
    duration: '10 weeks to 90 days',
    period: 'Summer',
    deadline: '2026-11-30',
    applicationStatus: 'Open',
    applicationRoute:
      'Apply through the RISE internship database. Academic references are due 15 December 2026.',
    verificationStatus: 'Source checked',
    location: 'Project-dependent locations across Germany',
    eligibilityDetails:
      'Enrolled at a university in the US, Canada, UK or Ireland. International students need over 12 months’ study there by the deadline; additional rules apply to German citizens.',
    dates: 'Start between 15 May and 15 July 2027',
    costs: null,
    id: 'daad-rise-2027',
    slug: 'daad-rise-germany-2027',
    title: 'RISE Germany Research Internships 2027',
    institution: 'DAAD · participating German universities and institutes',
    country: 'Germany',
    scientificTopics: ['Life sciences', 'Biology', 'Bioinformatics'],
    cycleLabel: 'Summer 2027',
    description:
      'Apply to research projects at German institutions. Select biology or related projects that match your studies.',
    deadlineAt: '2026-11-30T23:59:00+01:00',
    sourceUrl:
      'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Eligibility requirements rechecked',
        url: 'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-29',
        note: 'Only eligibility was rechecked; other field dates remain unchanged.',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-29',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-29',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-29',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-10-29',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'University in the US, Canada, UK or Ireland; 2 undergraduate years completed; remain an undergraduate afterward.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement:
      'At least two university years; detailed degree-year rules and exclusions apply.',
    gpaRequirement: null,
    requiredDocuments: [
      'Enrolment evidence for current and following academic year',
      'Academic transcript',
    ],
    funding: 'Funded',
    fundingDetails:
      'Accommodation, medical insurance and a €1,400 after-tax stipend for the nine-week stay.',
    duration: '9 weeks',
    period: 'Summer',
    deadline: null,
    applicationStatus: 'Unknown',
    applicationRoute:
      'Official online application; start by 8 January, submit by 11 January, 23:59 CET. The page gives an annual timetable without a cycle year.',
    verificationStatus: 'Needs review',
    location: 'Vienna',
    eligibilityDetails:
      'Life-sciences study with molecular/cellular lab training, three months’ research experience, and continuing enrolment. Check the detailed degree list.',
    dates: 'July–August pattern; exact cycle dates not stated',
    costs: 'No application fee.',
    id: 'vbc-summer-school',
    slug: 'vienna-biocenter-summer-school',
    title: 'Vienna BioCenter Summer School',
    institution: 'Vienna BioCenter',
    country: 'Austria',
    scientificTopics: ['Molecular biology', 'Cell biology'],
    cycleLabel: 'Annual call · cycle year not specified',
    description:
      'Work with a research group on experiments and data analysis, with lab meetings and a scientific programme.',
    sourceUrl: 'https://training.vbc.ac.at/summer-school/',
    reviewNote:
      'The official site says the call opens 15 November, but does not name the cycle year. No year-specific deadline has been inferred.',
    sources: [
      {
        title: 'Programme and support',
        url: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Detailed eligibility and annual timetable',
        url: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Documents and fees',
        url: 'https://training.vbc.ac.at/summer-school/application-faqs/',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/application-faqs/',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/application-faqs/',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/summer-school/',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'not-stated',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
        note: '11 January is listed as an annual deadline; the applicable year is not specified.',
      },
      applicationStatus: {
        state: 'unclear',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
        note: 'Annual opening timetable is stated, but the next cycle year is not named.',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl: 'https://training.vbc.ac.at/how-to-apply/',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      '2 university years, molecular/cellular lab training and 3 months’ research experience; continuing enrolment.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement:
      'Final two bachelor’s years by the placement start, or any master’s year; graduates may also be eligible.',
    gpaRequirement: null,
    requiredDocuments: [
      'Transcript and enrolment certificate or diploma',
      'Statement of purpose',
      'CV',
      'One to three recommendations',
      'Passport or government ID',
      'ID photograph',
    ],
    funding: 'Funded',
    fundingDetails:
      'JPY 2,400 per working day, funded accommodation, direct round-trip flight and shuttle pass.',
    duration: '4–6 months',
    period: 'Academic year',
    deadline: '2026-10-15',
    applicationStatus: 'Closed',
    applicationRoute:
      'Official OIST application portal. This round is closed; a later round is separately listed on the source.',
    verificationStatus: 'Source checked',
    location: 'Okinawa',
    eligibilityDetails:
      'Current students need home-institution approval. Current or former PhD students are excluded.',
    dates: 'Placement within 1 April–30 September 2027',
    costs:
      'JPY 5,000 non-refundable application fee; personal financial fee waivers are not offered.',
    id: 'oist-spring-2027',
    slug: 'oist-research-internship-spring-2027',
    title: 'Research Internship · Spring 2027 round',
    institution: 'Okinawa Institute of Science and Technology',
    country: 'Japan',
    scientificTopics: ['Neuroscience', 'Molecular biology', 'Ecology'],
    cycleLabel: 'Spring 2027 · applications closed',
    description:
      'Join an OIST research unit for a supervised project. Placement depends on academic fit, funding and host capacity.',
    deadlineAt: '2026-10-15T23:59:00+09:00',
    sourceUrl:
      'https://www.oist.jp/admissions/research-internship/apply-research-internship',
    sources: [
      {
        title: 'Round, eligibility, documents and fee',
        url: 'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Programme and support',
        url: 'https://www.oist.jp/admissions/research-internship/program-description',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/program-description',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/program-description',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://www.oist.jp/admissions/research-internship/apply-research-internship',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'Final 2 bachelor’s years or master’s; graduates may qualify. Current/former PhD students excluded.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement: null,
    gpaRequirement: null,
    requiredDocuments: null,
    funding: 'Unknown',
    fundingDetails: null,
    duration: '1 July–4 September including symposium',
    period: 'Summer',
    deadline: '2027-02-01',
    applicationStatus: 'Upcoming',
    applicationRoute:
      'Online portal opens 1 November 2026. Rank two research groups; do not contact supervisors for approval.',
    verificationStatus: 'Needs review',
    location: 'Zurich; symposium in Cambridge, UK',
    eligibilityDetails:
      'Undergraduate students enrolled at universities across Europe. Full year-of-study requirements still need checking.',
    dates: 'Research: 1 July–27 August 2027; programme ends 4 September',
    costs: null,
    id: 'eth-amgen-2027',
    slug: 'eth-zurich-amgen-scholars-2027',
    title: 'ETH Zurich Amgen Scholars Programme 2027',
    institution: 'ETH Zurich',
    country: 'Switzerland',
    scientificTopics: ['Biology', 'Biotechnology'],
    cycleLabel: 'Summer 2027',
    description:
      'Conduct a summer laboratory project at ETH and attend the European symposium in Cambridge.',
    sourceUrl:
      'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
    reviewNote:
      'The deadline date agrees across sources, but ETH’s dates page says noon CET while a news post says noon GMT. Confirm the exact cut-off time with ETH.',
    sources: [
      {
        title: '2027 call',
        url: 'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Dates and deadline',
        url: 'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/dates.html',
        checkedAt: '2026-10-28',
      },
      {
        title: 'How to apply',
        url: 'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/apply.html',
        checkedAt: '2026-10-28',
      },
      {
        title: 'Subjects and general eligibility',
        url: 'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/faqs.html',
        checkedAt: '2026-10-28',
      },
      {
        title: 'News post with different deadline time zone',
        url: 'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/news/2026/10/the-research-groups-for-summer-2027-are-now-online.html',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/faqs.html',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      gpaRequirement: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      requiredDocuments: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      funding: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      fundingDetails: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      costs: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/dates.html',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/dates.html',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/dates.html',
        checkedAt: '2026-10-28',
        note: 'Date confirmed; source pages disagree on the deadline time zone.',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/apply.html',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/faqs.html',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'Enrolled at a university in Europe; year-of-study rules still need checking.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'CV',
      'Academic transcript',
      'Motivation form',
      'Two recommendation forms',
    ],
    funding: 'Unknown',
    fundingDetails: null,
    duration: '2 July–4 September including symposium',
    period: 'Summer',
    deadline: '2027-02-01',
    applicationStatus: 'Upcoming',
    applicationRoute:
      'Apply via the official online form from 1 November 2026; choose two preferred projects. Do not contact faculty directly.',
    verificationStatus: 'Source checked',
    location: 'Munich; symposium in Cambridge, UK',
    eligibilityDetails:
      'University in the European Higher Education Area, strong academic performance and interest in a PhD. Medical applicants must not have begun clinical training.',
    dates: '2 July–4 September 2027',
    costs: null,
    id: 'lmu-amgen-2027',
    slug: 'lmu-amgen-scholars-2027',
    title: 'LMU Munich Amgen Scholars Programme 2027',
    institution: 'LMU Munich',
    country: 'Germany',
    scientificTopics: ['Life sciences', 'Biomedicine'],
    cycleLabel: 'Summer 2027',
    description:
      'Undertake a laboratory project through the Munich Amgen programme and attend the European symposium.',
    sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'not-stated',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'not-stated',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl: 'https://www.amgenscholars.mcn.lmu.de/apply/index.html',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'University in the European Higher Education Area; specific degree-year and pre-clinical rules apply.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'Apply in first/second undergraduate year; specific pre-clinical rules apply to medical students.',
    gpaRequirement: null,
    requiredDocuments: null,
    funding: 'Funded',
    fundingDetails:
      'Published 2026 support: SEK 11,000/month, housing and round-trip travel including the symposium.',
    duration: '8 weeks plus symposium',
    period: 'Summer',
    deadline: '2026-02-01',
    applicationStatus: 'Closed',
    applicationRoute:
      '2026 applications used PRISMA. The source does not announce a 2027 call.',
    verificationStatus: 'Source checked',
    location: 'Stockholm',
    eligibilityDetails:
      'Enrolled at a European Bologna-process university; degree must not finish before the September symposium. Strong academic record and PhD interest.',
    dates: '22 June–14 August 2026; symposium 2–5 September',
    costs: null,
    id: 'ki-amgen-2026',
    slug: 'karolinska-amgen-scholars-2026',
    title: 'Karolinska Institutet Amgen Scholars Programme 2026',
    institution: 'Karolinska Institutet',
    country: 'Sweden',
    scientificTopics: ['Cell biology', 'Immunology', 'Neuroscience'],
    cycleLabel: '2026 archive · closed',
    description:
      'Biomedical laboratory research with scientific discussion and oral/poster presentations. This entry describes the published 2026 cycle.',
    deadlineAt: '2026-02-01T12:00:00+01:00',
    sourceUrl:
      'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
    reviewNote:
      'Historical cycle, not a current opening. Do not reuse its dates or support amounts for 2027.',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'not-checked',
        sourceUrl: null,
        checkedAt: null,
      },
      funding: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://education.ki.se/amgen-scholars-program-at-karolinska-institutet',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'European Bologna-process university; apply in year 1 or 2 and remain enrolled through the symposium.',
  }),
  defineRealOpportunity({
    category: 'Speculative lab outreach',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement: null,
    gpaRequirement: null,
    requiredDocuments: null,
    funding: 'Unknown',
    fundingDetails: null,
    duration: null,
    period: 'Unknown',
    deadline: null,
    applicationStatus: 'No advertised vacancy',
    applicationRoute:
      'Contact the chosen group leader using the research directory linked on the official page.',
    verificationStatus: 'Source checked',
    location: 'Heidelberg, Hamburg, Grenoble, Hinxton, Rome or Barcelona',
    eligibilityDetails:
      'Natural sciences and related disciplines; placements normally support a degree thesis, with other arrangements also considered.',
    dates: null,
    costs: null,
    id: 'embl-undergraduate-outreach',
    slug: 'embl-undergraduate-research-outreach',
    title: 'Undergraduate research placements · lab enquiry',
    institution: 'European Molecular Biology Laboratory',
    country: 'Multiple countries',
    countries: ['Germany', 'France', 'United Kingdom', 'Italy', 'Spain'],
    scientificTopics: ['Molecular biology', 'Bioinformatics'],
    cycleLabel: 'General hosting route · no vacancy confirmed',
    description:
      'Enquire with an EMBL group about a thesis project or research placement. A hosting route does not establish an available position.',
    sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'not-stated',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'not-applicable',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
        note: 'No programme-wide application deadline for this individual lab-enquiry route.',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'Natural sciences or related studies; usually a degree-thesis placement. No vacancy confirmed.',
  }),
  defineRealOpportunity({
    category: 'Speculative lab outreach',
    eligibleDegrees: ['Master’s'],
    yearOfStudyRequirement: null,
    gpaRequirement: null,
    requiredDocuments: null,
    funding: 'Unknown',
    fundingDetails: null,
    duration: null,
    period: 'Unknown',
    deadline: null,
    applicationStatus: 'No advertised vacancy',
    applicationRoute:
      'Contact the relevant group leader. Separately advertised positions are linked from the source.',
    verificationStatus: 'Source checked',
    location: 'Vienna',
    eligibilityDetails:
      'The source describes placements for master’s research and asks applicants to explain their interest in a group’s work.',
    dates: null,
    costs: null,
    id: 'imp-master-outreach',
    slug: 'imp-master-research-internship-enquiry',
    title: 'Master’s research internships · lab enquiry',
    institution: 'Research Institute of Molecular Pathology',
    country: 'Austria',
    scientificTopics: ['Molecular biology', 'Cell biology'],
    cycleLabel: 'General hosting route · no vacancy confirmed',
    description:
      'Contact an IMP group to discuss a master’s thesis or research internship. Hosting depends on the group; no specific vacancy is confirmed here.',
    sourceUrl: 'https://www.imp.ac.at/career/master-internships',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'not-stated',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'not-applicable',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
        note: 'Individual enquiry, not a dated programme call.',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'For master’s research or a thesis; no vacancy confirmed.',
  }),
  defineRealOpportunity({
    category: 'Structured programme',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'First year completed; at least one undergraduate semester or quarter remaining after the programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'Academic transcript',
      'Two faculty references',
      'English evidence when applicable; full list in the official checklist',
    ],
    funding: 'Funded',
    fundingDetails:
      'SGD 6,000 stipend and arranged accommodation; travel support has limits.',
    duration: 'About 8 weeks of research plus symposium',
    period: 'Summer',
    deadline: '2027-02-01',
    applicationStatus: 'Unknown',
    applicationRoute:
      'Use NUS’s official application route; confirm the opening date.',
    verificationStatus: 'Needs review',
    location: 'Singapore; symposium in Japan',
    eligibilityDetails:
      'Relevant undergraduate degree at an Asian university; English proficiency and full attendance required.',
    dates: 'Research: 31 May–30 July 2027; symposium 3–5 August',
    costs:
      'Participants must arrange their own private health and travel insurance.',
    id: 'nus-amgen-2027',
    slug: 'nus-amgen-scholars-2027',
    title: 'NUS Amgen Scholars Asia Programme 2027',
    institution: 'National University of Singapore',
    country: 'Singapore',
    scientificTopics: ['Biology', 'Biotechnology'],
    cycleLabel: 'Summer 2027 · status needs clarification',
    description:
      'Supervised biomedical or biotechnology research with scientific activities and an Asian symposium.',
    deadlineAt: '2027-02-01T18:00:00+08:00',
    sourceUrl: 'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
    reviewNote:
      'Timeline: 1 November 2026. Another paragraph: 1 November 2027. Opening status remains unconfirmed.',
    sources: [
      {
        title: 'Official programme information',
        url: 'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
    ],
    evidence: {
      country: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      location: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      eligibleDegrees: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      eligibilityDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      yearOfStudyRequirement: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      gpaRequirement: {
        state: 'not-stated',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      requiredDocuments: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      funding: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      fundingDetails: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      costs: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      duration: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      period: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      dates: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      deadline: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      applicationStatus: {
        state: 'unclear',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
        note: 'Conflicting opening dates on the official page.',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
      },
      eligibilitySummary: {
        state: 'source-checked',
        sourceUrl:
          'https://www.dbs.nus.edu.sg/outreach/amgen-scholars-program/',
        checkedAt: '2026-10-28',
        note: 'Browsing summary of eligibility; read the full official requirements before applying.',
      },
    },
    eligibilitySummary:
      'Asian university; first year completed and an undergraduate semester/quarter remaining afterward.',
  }),
]
