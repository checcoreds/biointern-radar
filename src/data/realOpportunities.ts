import { defineRealOpportunity } from '../lib/defineRealOpportunity'
import {
  checked,
  notApplicable,
  notChecked,
  notStated,
  summaryNote,
  unclear,
} from '../lib/evidenceHelpers'
import type { Opportunity } from '../types/opportunity'

// Actual check dates. Pass them explicitly to each evidence entry; there is
// no default date.
const OCT_28 = '2026-10-28'
const NOV_10 = '2026-11-10'

const amgenEuropeNote =
  'Europe-wide Amgen Scholars rule published on the official Amgen Scholars site; the host may add requirements.'

const AMGEN_HOME = 'https://amgenscholars.com/'
const AMGEN_EUROPE = 'https://amgenscholars.com/europe-programme/'
const AMGEN_KI =
  'https://amgenscholars.com/university/karolinska-institutet-sweden/'
const VBC_APPLY = 'https://training.vbc.ac.at/how-to-apply/'
const VBC_PROGRAMME = 'https://training.vbc.ac.at/summer-school/'
const VBC_FAQ = 'https://training.vbc.ac.at/summer-school/application-faqs/'
const ETH_MAIN =
  'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html'
const ETH_APPLY =
  'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/apply.html'
const ETH_NEWS =
  'https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars/news/2026/10/the-research-groups-for-summer-2027-are-now-online.html'
const LMU_APPLY = 'https://www.amgenscholars.mcn.lmu.de/apply_active/index.html'
const LMU_ABOUT =
  'https://www.amgenscholars.mcn.lmu.de/about_amgen/about_program/index.html'
const LMU_FAQ =
  'https://www.amgenscholars.mcn.lmu.de/apply_active/faq/index.html'
const PASTEUR =
  'https://www.pasteur.fr/en/about-us/our-missions/education/training-programs/internships-and-research-immersion/amgen-scholars-program-0'
const CAM_PROGRAMME = 'https://amgenscholars.bio.cam.ac.uk/cambridge-programme'
const CAM_ELIGIBILITY =
  'https://amgenscholars.bio.cam.ac.uk/cambridge-programme/eligibility'
const CAM_GUIDE =
  'https://amgenscholars.bio.cam.ac.uk/cambridge-programme/guide-applying'
const CAM_INCLUDED =
  'https://amgenscholars.bio.cam.ac.uk/cambridge-programme/whats-included'
const BIOZENTRUM =
  'https://www.biozentrum.unibas.ch/summer-schools/biozentrum-research-summer'
const MPIIB = 'https://www.mpiib-berlin.mpg.de/mpiib-isi'
const MPIIB_FAQ = 'https://www.mpiib-berlin.mpg.de/2158129/mpiib-isi-faq'
const MPIIB_GUIDE =
  'https://www.mpiib-berlin.mpg.de/2158142/mpiib-isi-application-guide'
const MPIIB_PORTAL =
  'https://jobs.mpiib-berlin.mpg.de/en/jobposting/604f37087895d872e50101dcf2dfa9afb0cb1e464/apply'
const CRG = 'https://www.crg.eu/en/content/training/undergraduates-and-masters'
const CHAMPALIMAUD = 'https://fchampalimaud.org/champalimaud-research/education'

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
      {
        title: 'Status and deadline recheck',
        url: 'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-11-10',
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
        checkedAt: '2026-11-10',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://www.epfl.ch/schools/sv/education/summer-research-program/',
        checkedAt: '2026-11-10',
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
      {
        title: 'Deadline recheck',
        url: 'https://courses.unil.ch/fbm/cours/4247',
        checkedAt: '2026-11-10',
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
        checkedAt: '2026-11-10',
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
      {
        title: 'Status and deadline recheck',
        url: 'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-11-10',
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
        checkedAt: '2026-11-10',
      },
      applicationStatus: {
        state: 'source-checked',
        sourceUrl:
          'https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/',
        checkedAt: '2026-11-10',
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
      {
        title: 'Enquiry route recheck',
        url: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-11-10',
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
        checkedAt: '2026-11-10',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://www.embl.org/about/info/undergraduates/',
        checkedAt: '2026-11-10',
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
      {
        title: 'Enquiry route recheck',
        url: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-11-10',
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
        checkedAt: '2026-11-10',
      },
      applicationRoute: {
        state: 'source-checked',
        sourceUrl: 'https://www.imp.ac.at/career/master-internships',
        checkedAt: '2026-11-10',
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
  // ---------------------------------------------------------------------------
  // Records researched or rewritten on 10 November 2026 (Europe-only review).
  // ---------------------------------------------------------------------------
  defineRealOpportunity({
    id: 'vbc-summer-school-2027',
    slug: 'vienna-biocenter-summer-school-2027',
    title: 'Vienna BioCenter Summer School 2027',
    institution: 'Vienna BioCenter',
    country: 'Austria',
    location: 'Vienna',
    category: 'Structured programme',
    scientificTopics: ['Molecular biology', 'Cell biology'],
    cycleLabel: 'Summer 2027',
    description:
      'Work with a research group on experiments and data analysis, with lab meetings and a scientific programme.',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement:
      'At least two full years of university study completed before 30 June 2027; still enrolled when the programme starts.',
    gpaRequirement: null,
    requiredDocuments: [
      'Online application form',
      'PDF form completed offline and uploaded before the deadline',
      'Enrolment certificate',
      'Academic transcript',
      'Proof of enrolment for the next academic year',
    ],
    funding: 'Funded',
    fundingDetails:
      'Accommodation, medical insurance and a €1,400 after-tax stipend for the nine-week stay.',
    costs: 'No application fee.',
    duration: '9 weeks',
    period: 'Summer',
    dates: 'Open Program: 1 July–31 August 2027',
    deadline: '2027-01-11',
    applicationStatus: 'Upcoming',
    applicationRoute:
      'Two-part application: an online form plus a PDF completed offline and uploaded before the deadline. Rank up to three group leaders. Decisions by 1 March 2027.',
    eligibilityDetails:
      'Life-science or related degree, at least three months of lab or research experience and continuing enrolment. Medicine (year 4+) and computing/AI students are eligible under conditions. A separate Talents for Future track serves students from listed regions.',
    eligibilitySummary:
      '2 full university years by 30 June 2027; 3 months’ research experience; still enrolled.',
    verificationStatus: 'Source checked',
    sourceUrl: VBC_APPLY,
    sources: [
      {
        title: '2027 timetable, eligibility and documents',
        url: VBC_APPLY,
        checkedAt: NOV_10,
      },
      { title: 'Programme and support', url: VBC_PROGRAMME, checkedAt: OCT_28 },
      { title: 'Fees FAQ', url: VBC_FAQ, checkedAt: OCT_28 },
    ],
    evidence: {
      country: checked(VBC_PROGRAMME, OCT_28),
      location: checked(VBC_PROGRAMME, OCT_28),
      eligibleDegrees: checked(VBC_PROGRAMME, OCT_28),
      eligibilityDetails: checked(VBC_APPLY, NOV_10),
      eligibilitySummary: checked(VBC_APPLY, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(VBC_APPLY, NOV_10),
      gpaRequirement: notStated(VBC_PROGRAMME, OCT_28),
      requiredDocuments: checked(VBC_APPLY, NOV_10),
      funding: checked(VBC_PROGRAMME, OCT_28),
      fundingDetails: checked(
        VBC_PROGRAMME,
        OCT_28,
        'Support terms were checked on 28 October. The programme page returned an error on 10 November, so confirm them for 2027.',
      ),
      costs: checked(VBC_FAQ, OCT_28),
      duration: checked(VBC_PROGRAMME, OCT_28),
      period: checked(VBC_APPLY, NOV_10),
      dates: checked(VBC_APPLY, NOV_10),
      deadline: checked(
        VBC_APPLY,
        NOV_10,
        'The 2027 timetable gives 11 January 2027 without a time of day. Confirm the exact cut-off.',
      ),
      applicationStatus: checked(
        VBC_APPLY,
        NOV_10,
        'Applications open on 15 November 2026; the application links say they will be available then.',
      ),
      applicationRoute: checked(VBC_APPLY, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'eth-amgen-2027',
    slug: 'eth-zurich-amgen-scholars-2027',
    title: 'ETH Zurich Amgen Scholars Programme 2027',
    institution: 'ETH Zurich',
    country: 'Switzerland',
    location: 'Zurich; symposium in Cambridge, UK',
    category: 'Structured programme',
    scientificTopics: ['Biology', 'Biotechnology'],
    cycleLabel: 'Summer 2027',
    description:
      'Conduct a summer laboratory project at ETH and attend the European symposium in Cambridge.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'Official transcript',
      'Letter of recommendation',
      'Personal statement or essay',
    ],
    funding: 'Unknown',
    fundingDetails: null,
    costs: null,
    duration: '8–10 weeks full time',
    period: 'Summer',
    dates: '2 July–4 September 2027, ending with the symposium in Cambridge',
    deadline: '2027-02-01',
    applicationStatus: 'Open',
    applicationRoute:
      'Online portal. Rank two research groups; do not contact supervisors for approval.',
    eligibilityDetails:
      'Enrolled at a university in a European Higher Education Area (Bologna Process) country, with a strong academic record and interest in a PhD. No citizenship requirement.',
    eligibilitySummary:
      'University in Europe (EHEA); year 2 of a 3-year bachelor’s at application.',
    verificationStatus: 'Needs review',
    reviewNote:
      'ETH’s main page gives 1 February 2027, 12.00 noon CET. An October news post said noon GMT. Confirm the exact cut-off with ETH.',
    sourceUrl: ETH_MAIN,
    sources: [
      {
        title: '2027 call, opening and deadline',
        url: ETH_MAIN,
        checkedAt: NOV_10,
      },
      {
        title: 'Amgen Scholars Europe: dates and eligibility',
        url: AMGEN_EUROPE,
        checkedAt: NOV_10,
      },
      { title: 'How to apply', url: ETH_APPLY, checkedAt: OCT_28 },
      {
        title: 'News post with different deadline time zone',
        url: ETH_NEWS,
        checkedAt: OCT_28,
      },
    ],
    evidence: {
      country: checked(ETH_MAIN, NOV_10),
      location: checked(ETH_MAIN, NOV_10),
      eligibleDegrees: checked(ETH_MAIN, NOV_10),
      eligibilityDetails: checked(AMGEN_EUROPE, NOV_10, amgenEuropeNote),
      eligibilitySummary: checked(AMGEN_EUROPE, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(AMGEN_EUROPE, NOV_10, amgenEuropeNote),
      gpaRequirement: notStated(
        AMGEN_EUROPE,
        NOV_10,
        'Only “a strong record of academic performance” is stated.',
      ),
      requiredDocuments: checked(
        AMGEN_EUROPE,
        NOV_10,
        'The minimum common to all European hosts. Check ETH’s portal for its full list.',
      ),
      funding: notStated(
        ETH_MAIN,
        NOV_10,
        'ETH’s main page states no stipend. Amgen says support details vary by host.',
      ),
      fundingDetails: notStated(ETH_MAIN, NOV_10),
      costs: notChecked(),
      duration: checked(AMGEN_EUROPE, NOV_10),
      period: checked(AMGEN_EUROPE, NOV_10),
      dates: checked(AMGEN_EUROPE, NOV_10),
      deadline: unclear(
        ETH_MAIN,
        NOV_10,
        'Main page: 1 February 2027, 12.00 noon (CET). A news post checked on 28 October said noon GMT.',
      ),
      applicationStatus: checked(
        ETH_MAIN,
        NOV_10,
        'The main page lists “Open: 1 November 2026”.',
      ),
      applicationRoute: checked(ETH_APPLY, OCT_28),
    },
  }),
  defineRealOpportunity({
    id: 'lmu-amgen-2027',
    slug: 'lmu-amgen-scholars-2027',
    title: 'LMU Munich Amgen Scholars Programme 2027',
    institution: 'LMU Munich',
    country: 'Germany',
    location: 'Munich; symposium in Cambridge, UK',
    category: 'Structured programme',
    scientificTopics: [
      'Molecular biology',
      'Neuroscience',
      'Biomedicine',
      'Immunology',
    ],
    cycleLabel: 'Summer 2027',
    description:
      'A nine-week laboratory project at LMU and partner institutes in Munich, followed by the European symposium.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'CV listing lab skills',
      'Official academic transcript (can take up to a month to obtain)',
      'Statement of motivation on the mandatory form',
      'Two referee forms',
    ],
    funding: 'Funded',
    fundingDetails:
      '€1,700 stipend, free single room in a student dormitory, city transport pass, health/accident/liability insurance and up to €350 travel for non-local scholars.',
    costs:
      'Visa costs are covered at least partly, as budget allows. Meals beyond a €40 cafeteria credit are not covered.',
    duration: '9 weeks',
    period: 'Summer',
    dates: '2 July–4 September 2027, including the Cambridge symposium',
    deadline: '2027-02-01',
    deadlineAt: '2027-02-01T12:00:00+01:00',
    applicationStatus: 'Open',
    applicationRoute:
      'Online form only during the application window. Referees complete forms that you upload. Do not contact faculty directly.',
    eligibilityDetails:
      'Enrolled at a university in the European Higher Education Area, intending to graduate there. Strong academic record, interest in a PhD and good English (B2). Medical students must not have begun clinical training. No citizenship requirement.',
    eligibilitySummary:
      'University in Europe (EHEA); year 2 of a 3-year bachelor’s at application.',
    verificationStatus: 'Source checked',
    sourceUrl: LMU_APPLY,
    sources: [
      { title: '2027 application page', url: LMU_APPLY, checkedAt: NOV_10 },
      { title: 'Programme support', url: LMU_ABOUT, checkedAt: NOV_10 },
      { title: 'Application FAQ', url: LMU_FAQ, checkedAt: NOV_10 },
    ],
    evidence: {
      country: checked(LMU_ABOUT, NOV_10),
      location: checked(LMU_APPLY, NOV_10),
      eligibleDegrees: checked(LMU_APPLY, NOV_10),
      eligibilityDetails: checked(LMU_APPLY, NOV_10),
      eligibilitySummary: checked(LMU_APPLY, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(LMU_APPLY, NOV_10),
      gpaRequirement: notStated(
        LMU_APPLY,
        NOV_10,
        'Only “a strong record of academic performance” is stated.',
      ),
      requiredDocuments: checked(LMU_APPLY, NOV_10),
      funding: checked(LMU_ABOUT, NOV_10),
      fundingDetails: checked(LMU_ABOUT, NOV_10),
      costs: checked(LMU_ABOUT, NOV_10),
      duration: checked(LMU_ABOUT, NOV_10),
      period: checked(LMU_ABOUT, NOV_10),
      dates: checked(LMU_ABOUT, NOV_10),
      deadline: checked(
        LMU_APPLY,
        NOV_10,
        'Applies to applications and reference letters: 1 February 2027, 12:00 noon CET.',
      ),
      applicationStatus: checked(
        LMU_APPLY,
        NOV_10,
        '“The application period for the LMU Amgen Scholars Programme 2027 is now open.”',
      ),
      applicationRoute: checked(LMU_APPLY, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'ki-amgen-2027',
    slug: 'karolinska-amgen-scholars-2027',
    title: 'Karolinska Institutet Amgen Scholars Programme 2027',
    institution: 'Karolinska Institutet',
    country: 'Sweden',
    location: 'Stockholm; symposium in Cambridge, UK',
    category: 'Structured programme',
    scientificTopics: ['Biomedicine', 'Neuroscience', 'Immunology'],
    cycleLabel: 'Summer 2027',
    description:
      'Eight weeks of pre-clinical research in a KI group, with training in scientific writing and poster presentation, ending with the European symposium.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme.',
    gpaRequirement: null,
    requiredDocuments: [
      'Official transcript',
      'Letter of recommendation',
      'Personal statement or essay',
    ],
    funding: 'Unknown',
    fundingDetails:
      'Housing in Stockholm is provided. A 2027 stipend amount was not found on official sources.',
    costs: null,
    duration: '8 weeks plus symposium',
    period: 'Summer',
    dates: '21 June–13 August 2027; Europe Symposium 1–4 September',
    deadline: '2027-02-01',
    applicationStatus: 'Open',
    applicationRoute:
      'Karolinska Institutet runs its own application; each Amgen host needs a separate application.',
    eligibilityDetails:
      'Enrolled at a university in a European Higher Education Area (Bologna Process) country, with a strong academic record and interest in a PhD. No citizenship requirement.',
    eligibilitySummary:
      'University in Europe (EHEA); year 2 of a 3-year bachelor’s at application.',
    verificationStatus: 'Needs review',
    reviewNote:
      'Karolinska’s own Amgen page returned “page not found” on 10 November 2026. These facts come from the official Amgen Scholars site. Confirm KI’s application portal and support before applying.',
    sourceUrl: AMGEN_KI,
    sources: [
      {
        title: 'Amgen Scholars: Karolinska Institutet',
        url: AMGEN_KI,
        checkedAt: NOV_10,
      },
      {
        title: 'Amgen Scholars Europe: eligibility and FAQ',
        url: AMGEN_EUROPE,
        checkedAt: NOV_10,
      },
      {
        title: 'Amgen Scholars: 2027 applications open',
        url: AMGEN_HOME,
        checkedAt: NOV_10,
      },
    ],
    evidence: {
      country: checked(AMGEN_KI, NOV_10),
      location: checked(AMGEN_KI, NOV_10),
      eligibleDegrees: checked(AMGEN_EUROPE, NOV_10),
      eligibilityDetails: checked(AMGEN_EUROPE, NOV_10, amgenEuropeNote),
      eligibilitySummary: checked(AMGEN_EUROPE, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(AMGEN_EUROPE, NOV_10, amgenEuropeNote),
      gpaRequirement: notStated(
        AMGEN_EUROPE,
        NOV_10,
        'Only “a strong record of academic performance” is stated.',
      ),
      requiredDocuments: checked(
        AMGEN_EUROPE,
        NOV_10,
        'The minimum common to all European hosts. KI may ask for more.',
      ),
      funding: notStated(
        AMGEN_KI,
        NOV_10,
        'Amgen says support varies by host; KI’s 2027 terms were not available.',
      ),
      fundingDetails: checked(AMGEN_KI, NOV_10),
      costs: notChecked(),
      duration: checked(AMGEN_KI, NOV_10),
      period: checked(AMGEN_KI, NOV_10),
      dates: checked(AMGEN_KI, NOV_10),
      deadline: checked(AMGEN_KI, NOV_10, 'No time of day is stated.'),
      applicationStatus: checked(
        AMGEN_HOME,
        NOV_10,
        'The Amgen Scholars site says Summer 2027 applications for Europe are now open. KI’s own portal was not checked.',
      ),
      applicationRoute: checked(AMGEN_EUROPE, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'pasteur-amgen-2027',
    slug: 'institut-pasteur-amgen-scholars-2027',
    title: 'Institut Pasteur Amgen Scholars Programme 2027',
    institution: 'Institut Pasteur',
    country: 'France',
    location: 'Paris; symposium in Cambridge, UK',
    category: 'Structured programme',
    scientificTopics: [
      'Microbiology',
      'Immunology',
      'Genomics',
      'Bioinformatics',
      'Neuroscience',
      'Structural biology',
    ],
    cycleLabel: 'Summer 2027',
    description:
      'An eight-week research project in one of Institut Pasteur’s laboratories, with seminars, followed by the European symposium.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme. First-year students are not eligible; medical students must be in year 3 or 4.',
    gpaRequirement: null,
    requiredDocuments: [
      'Cover letter naming one research topic',
      'One-page CV',
      'University grade records (one file)',
      '2026/2027 enrolment certificate',
      'One signed recommendation letter',
      'Passport or national ID copy',
    ],
    funding: 'Funded',
    fundingDetails:
      '€1,400 total stipend, a private room in a Paris student residence, up to €450 travel reimbursement for non-local scholars and subsidised weekday lunches.',
    costs:
      'Health insurance is mandatory and not provided (European Health Insurance Card for EEA/Swiss students; private insurance for others). Visas are your responsibility.',
    duration: '8 weeks',
    period: 'Summer',
    dates:
      '1 July–3 September 2027, including the Cambridge symposium (1–3 September)',
    deadline: '2027-02-01',
    applicationStatus: 'Open',
    applicationRoute:
      'Online portal: create an account, complete the questionnaire and give your referee’s details. One application per candidate; do not contact faculty directly.',
    eligibilityDetails:
      'Enrolled at a university in a Bologna Process country; no citizenship requirement. Students able to start a PhD in autumn 2027 are not eligible. Good English and interest in a PhD.',
    eligibilitySummary:
      'University in a Bologna country; year 2 of a 3-year bachelor’s at application. Not first-year.',
    verificationStatus: 'Source checked',
    sourceUrl: PASTEUR,
    sources: [
      {
        title: '2027 programme, eligibility and application',
        url: PASTEUR,
        checkedAt: NOV_10,
      },
    ],
    evidence: {
      country: checked(PASTEUR, NOV_10),
      location: checked(PASTEUR, NOV_10),
      eligibleDegrees: checked(PASTEUR, NOV_10),
      eligibilityDetails: checked(PASTEUR, NOV_10),
      eligibilitySummary: checked(PASTEUR, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(PASTEUR, NOV_10),
      gpaRequirement: notStated(
        PASTEUR,
        NOV_10,
        'Only “a strong record of academic performance” is stated.',
      ),
      requiredDocuments: checked(PASTEUR, NOV_10),
      funding: checked(PASTEUR, NOV_10),
      fundingDetails: checked(PASTEUR, NOV_10),
      costs: checked(PASTEUR, NOV_10),
      duration: checked(PASTEUR, NOV_10),
      period: checked(PASTEUR, NOV_10),
      dates: checked(
        PASTEUR,
        NOV_10,
        'The page’s FAQ still shows some 2026 dates; these 2027 dates come from its key application steps. Cambridge gives the symposium as 1–4 September.',
      ),
      deadline: checked(PASTEUR, NOV_10, 'No time of day is stated.'),
      applicationStatus: checked(
        PASTEUR,
        NOV_10,
        'Application site opened 1 November 2026 and closes 1 February 2027.',
      ),
      applicationRoute: checked(PASTEUR, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'cambridge-amgen-2027',
    slug: 'cambridge-amgen-scholars-2027',
    title: 'University of Cambridge Amgen Scholars Programme 2027',
    institution: 'University of Cambridge',
    country: 'United Kingdom',
    location: 'Cambridge',
    category: 'Structured programme',
    scientificTopics: ['Life sciences', 'Biomedicine'],
    cycleLabel: 'Summer 2027',
    description:
      'An eight-week project in a Cambridge laboratory with a skills programme, then the European symposium hosted in Cambridge.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'At application: year two of a three-year bachelor’s, or year two/three of a four-year integrated programme. Not in your first or final year. Medical students who have not finished year 4 are considered.',
    gpaRequirement: null,
    requiredDocuments: [
      'Online application form',
      'Personal statement (500 words)',
      'One-page CV',
      'Academic transcript (translated if not in English)',
      'Referee form (due 5 February 2027)',
      'Project Supervisor form (due 5 February 2027)',
    ],
    funding: 'Funded',
    fundingDetails:
      'Stipend in line with UK national minimum wage, free college accommodation, up to £300 travel for scholars not normally resident in the UK, £500 lab expenses and standard visa fee reimbursed.',
    costs: null,
    duration: '8 weeks',
    period: 'Summer',
    dates: '5 July–27 August 2027 (arrive 4 July); symposium 1–4 September',
    deadline: '2027-02-01',
    deadlineAt: '2027-02-01T23:59:00Z',
    applicationStatus: 'Open',
    applicationRoute:
      'First find a Project Supervisor through the programme’s portal and secure their agreement, then submit the online form. Applications without supervisor agreement are invalid.',
    eligibilityDetails:
      'Enrolled at a university in a Bologna Process country, without a completed bachelor’s degree. Interest in a PhD and good working English; must attend the whole programme including the symposium.',
    eligibilitySummary:
      'University in a Bologna country; not first or final year; a supervisor must agree before you apply.',
    verificationStatus: 'Source checked',
    sourceUrl: CAM_GUIDE,
    sources: [
      { title: 'Guide to applying', url: CAM_GUIDE, checkedAt: NOV_10 },
      { title: 'Eligibility', url: CAM_ELIGIBILITY, checkedAt: NOV_10 },
      {
        title: 'Cambridge programme and dates',
        url: CAM_PROGRAMME,
        checkedAt: NOV_10,
      },
      { title: 'What’s included', url: CAM_INCLUDED, checkedAt: NOV_10 },
    ],
    evidence: {
      country: checked(CAM_PROGRAMME, NOV_10),
      location: checked(CAM_PROGRAMME, NOV_10),
      eligibleDegrees: checked(CAM_ELIGIBILITY, NOV_10),
      eligibilityDetails: checked(CAM_ELIGIBILITY, NOV_10),
      eligibilitySummary: checked(CAM_ELIGIBILITY, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(CAM_ELIGIBILITY, NOV_10),
      gpaRequirement: notStated(
        CAM_ELIGIBILITY,
        NOV_10,
        'Only “a strong record of academic performance” is stated.',
      ),
      requiredDocuments: checked(CAM_GUIDE, NOV_10),
      funding: checked(CAM_INCLUDED, NOV_10),
      fundingDetails: checked(
        CAM_INCLUDED,
        NOV_10,
        'No stipend amount is given, only “in line with the national minimum wage requirements”.',
      ),
      costs: notStated(
        CAM_INCLUDED,
        NOV_10,
        'No fees are stated. The Immigration Health Surcharge is not paid, so there is no automatic NHS access.',
      ),
      duration: checked(CAM_PROGRAMME, NOV_10),
      period: checked(CAM_PROGRAMME, NOV_10),
      dates: checked(CAM_PROGRAMME, NOV_10),
      deadline: checked(CAM_GUIDE, NOV_10, '01 February 2027, 23:59 GMT.'),
      applicationStatus: checked(
        CAM_GUIDE,
        NOV_10,
        '“Applications for the 2027 cohort are now open.”',
      ),
      applicationRoute: checked(CAM_GUIDE, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'biozentrum-research-summer-2027',
    slug: 'biozentrum-basel-research-summer-2027',
    title: 'Biozentrum Research Summer 2027',
    institution: 'Biozentrum, University of Basel',
    country: 'Switzerland',
    location: 'Biozentrum, University of Basel',
    category: 'Structured programme',
    scientificTopics: [
      'Cell biology',
      'Structural biology',
      'Computational biology',
      'Microbiology',
      'Neuroscience',
    ],
    cycleLabel: 'Summer 2027',
    description:
      'Seven to nine weeks of full-time research in a Biozentrum group, ending with a written report.',
    eligibleDegrees: ['Bachelor’s'],
    yearOfStudyRequirement:
      'Currently enrolled in a bachelor’s degree; ideally suited to students at the end of their second year.',
    gpaRequirement: null,
    requiredDocuments: [
      'Application form',
      'Motivation letter (max. 1 page)',
      'CV',
      'Transcripts of all university courses with grades',
    ],
    funding: 'Funded',
    fundingDetails: 'Time-proportional stipend of CHF 1,736 per month (gross).',
    costs: null,
    duration: '7–9 weeks, full time',
    period: 'Summer',
    dates: 'Mid-July to mid-September 2027 (weeks 28–36)',
    deadline: '2027-02-28',
    deadlineAt: '2027-02-28T12:00:00+01:00',
    applicationStatus: 'Upcoming',
    applicationRoute:
      'Online application platform, available only during the application window. Choose at least six potential labs.',
    eligibilityDetails:
      'Bachelor’s students in biology, nanosciences, chemistry, physics, computational sciences and related fields. Only Swiss or EU citizens and Swiss C-permit holders; other European residence permits do not qualify. No prior research experience required.',
    eligibilitySummary:
      'Swiss or EU citizens (or Swiss C-permit) only; current bachelor’s students.',
    verificationStatus: 'Source checked',
    sourceUrl: BIOZENTRUM,
    sources: [
      {
        title: 'Biozentrum Research Summer',
        url: BIOZENTRUM,
        checkedAt: NOV_10,
      },
    ],
    evidence: {
      country: checked(BIOZENTRUM, NOV_10),
      location: checked(BIOZENTRUM, NOV_10),
      eligibleDegrees: checked(BIOZENTRUM, NOV_10),
      eligibilityDetails: checked(
        BIOZENTRUM,
        NOV_10,
        'The page headline mentions students “from across Europe”, but the eligibility rule limits applicants by citizenship.',
      ),
      eligibilitySummary: checked(BIOZENTRUM, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(BIOZENTRUM, NOV_10),
      gpaRequirement: notStated(
        BIOZENTRUM,
        NOV_10,
        'Selection uses grades, CV and motivation letter; no minimum is stated.',
      ),
      requiredDocuments: checked(BIOZENTRUM, NOV_10),
      funding: checked(BIOZENTRUM, NOV_10),
      fundingDetails: checked(BIOZENTRUM, NOV_10),
      costs: notStated(
        BIOZENTRUM,
        NOV_10,
        'Housing, travel and meals are not mentioned.',
      ),
      duration: checked(BIOZENTRUM, NOV_10),
      period: checked(BIOZENTRUM, NOV_10),
      dates: checked(BIOZENTRUM, NOV_10),
      deadline: checked(
        BIOZENTRUM,
        NOV_10,
        '28 February 2027, 12.00 noon CET.',
      ),
      applicationStatus: checked(
        BIOZENTRUM,
        NOV_10,
        'Applications can be submitted from 4 January 2027.',
      ),
      applicationRoute: checked(BIOZENTRUM, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'mpiib-isi-2027',
    slug: 'max-planck-infection-biology-internship-2027',
    title: 'International Summer Internship 2027 (MPIIB-ISI)',
    institution: 'Max Planck Institute for Infection Biology',
    country: 'Germany',
    location: 'Berlin',
    category: 'Structured programme',
    scientificTopics: ['Infection biology', 'Immunology', 'Microbiology'],
    cycleLabel: 'September–November 2027',
    description:
      'A three-month research internship in one of the institute’s groups in Berlin. No virtual internships.',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement:
      'Bachelor’s students must have completed at least 4 semesters (2 years) when applying. You must be enrolled for the whole internship.',
    gpaRequirement: null,
    requiredDocuments: [
      'CV (max. 2 pages, no photo)',
      'Motivation letter on the institute’s template (four sections)',
      'Reference letter from a professor or postdoc',
      'Transcripts of all records, translated into English',
      'Diploma, if your bachelor’s is complete',
    ],
    funding: 'Funded',
    fundingDetails:
      'About €1,400 per month stipend, travel to and from Berlin covered, and accommodation close to the institute.',
    costs:
      'Visa fees are not covered. The cost of housing to the student is not stated.',
    duration: '3 months',
    period: 'Autumn',
    dates: '1 September–30 November 2027',
    deadline: '2026-11-27',
    applicationStatus: 'Open',
    applicationRoute:
      'Online application portal only; emailed applications are not reviewed. You cannot change or add documents after submitting.',
    eligibilityDetails:
      'Relevant field (for example biology, medicine, biochemistry, epidemiology), good English and a voluntary internship (no credit points). Priority goes to students whose access to first-class higher education is constrained; applicants from low- and middle-income countries are strongly encouraged.',
    eligibilitySummary:
      '2 years of study completed; priority for students with limited access to top research education.',
    verificationStatus: 'Source checked',
    sourceUrl: MPIIB,
    sources: [
      { title: 'MPIIB-ISI call and timeline', url: MPIIB, checkedAt: NOV_10 },
      { title: 'MPIIB-ISI FAQ', url: MPIIB_FAQ, checkedAt: NOV_10 },
      { title: 'Application guide', url: MPIIB_GUIDE, checkedAt: NOV_10 },
      {
        title: '2027 application portal',
        url: MPIIB_PORTAL,
        checkedAt: NOV_10,
      },
    ],
    evidence: {
      country: checked(MPIIB, NOV_10),
      location: checked(MPIIB_FAQ, NOV_10),
      eligibleDegrees: checked(MPIIB, NOV_10),
      eligibilityDetails: checked(MPIIB, NOV_10),
      eligibilitySummary: checked(MPIIB, NOV_10, summaryNote),
      yearOfStudyRequirement: checked(MPIIB, NOV_10),
      gpaRequirement: notStated(
        MPIIB,
        NOV_10,
        '“A strong academic record” is required; no minimum is stated.',
      ),
      requiredDocuments: checked(MPIIB_GUIDE, NOV_10),
      funding: checked(MPIIB, NOV_10),
      fundingDetails: checked(MPIIB_FAQ, NOV_10),
      costs: checked(MPIIB_FAQ, NOV_10),
      duration: checked(MPIIB, NOV_10),
      period: checked(MPIIB, NOV_10),
      dates: checked(MPIIB, NOV_10),
      deadline: checked(
        MPIIB,
        NOV_10,
        'No time is given with the date. The FAQ says the portal closes automatically “after midnight CET”; confirm the exact cut-off.',
      ),
      applicationStatus: checked(
        MPIIB_PORTAL,
        NOV_10,
        'The 2027 application form was live on 10 November 2026.',
      ),
      applicationRoute: checked(MPIIB_GUIDE, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'crg-internship-outreach',
    slug: 'crg-barcelona-internships-lab-enquiry',
    title: 'Undergraduate and master’s internships · lab enquiry',
    institution: 'Centre for Genomic Regulation (CRG)',
    country: 'Spain',
    location: 'Barcelona',
    category: 'Speculative lab outreach',
    scientificTopics: ['Genomics', 'Bioinformatics'],
    cycleLabel: 'General hosting route · no vacancy confirmed',
    description:
      'CRG accepts internship applications throughout the year from enrolled students whose university signs a learning agreement.',
    eligibleDegrees: ['Bachelor’s', 'Master’s'],
    yearOfStudyRequirement: null,
    gpaRequirement: null,
    requiredDocuments: [
      'Motivation letter',
      'CV',
      'Reference letter',
      'University transcripts',
    ],
    funding: 'Unknown',
    fundingDetails: null,
    costs: null,
    duration: null,
    period: 'Flexible',
    dates: null,
    deadline: null,
    applicationStatus: 'No advertised vacancy',
    applicationRoute:
      'Year-round applications for internships with a university learning agreement. Contact the host group; general questions go to the CRG training office.',
    eligibilityDetails:
      'Must be enrolled in an official undergraduate or MSc programme, and a university–CRG agreement must be signed.',
    eligibilitySummary:
      'Enrolled bachelor’s or master’s student; needs a learning agreement with your university.',
    verificationStatus: 'Source checked',
    sourceUrl: CRG,
    sources: [
      { title: 'Undergraduates and masters', url: CRG, checkedAt: NOV_10 },
    ],
    evidence: {
      country: checked(CRG, NOV_10),
      location: checked(CRG, NOV_10),
      eligibleDegrees: checked(CRG, NOV_10),
      eligibilityDetails: checked(CRG, NOV_10),
      eligibilitySummary: checked(CRG, NOV_10, summaryNote),
      yearOfStudyRequirement: notStated(CRG, NOV_10),
      gpaRequirement: notStated(CRG, NOV_10),
      requiredDocuments: checked(CRG, NOV_10),
      funding: notStated(
        CRG,
        NOV_10,
        'General internships state no funding. Separately advertised 2026/2027 project fellowships list €700/month (gross) for up to 4 months plus travel; check the page for current projects.',
      ),
      fundingDetails: notStated(CRG, NOV_10),
      costs: notStated(CRG, NOV_10),
      duration: notStated(CRG, NOV_10),
      period: checked(CRG, NOV_10),
      dates: notApplicable(
        CRG,
        NOV_10,
        'Year-round route; timing is agreed with the host group.',
      ),
      deadline: notApplicable(
        CRG,
        NOV_10,
        'Applications are accepted throughout the year.',
      ),
      applicationStatus: checked(
        CRG,
        NOV_10,
        'General route with no specific vacancy. The 2022 summer internship programme has not run since.',
      ),
      applicationRoute: checked(CRG, NOV_10),
    },
  }),
  defineRealOpportunity({
    id: 'champalimaud-internship-outreach',
    slug: 'champalimaud-research-internships-lab-enquiry',
    title: 'Research internships · lab enquiry',
    institution: 'Champalimaud Research',
    country: 'Portugal',
    location: null,
    category: 'Speculative lab outreach',
    scientificTopics: ['Neuroscience', 'Cancer research'],
    cycleLabel: 'General hosting route · no vacancy confirmed',
    description:
      'Apply through a year-round form to up to five labs; if accepted, you design your own project with the group leader.',
    eligibleDegrees: null,
    yearOfStudyRequirement: null,
    gpaRequirement: null,
    requiredDocuments: null,
    funding: 'Unknown',
    fundingDetails: null,
    costs: null,
    duration: 'Up to 6 months',
    period: 'Flexible',
    dates: null,
    deadline: null,
    applicationStatus: 'No advertised vacancy',
    applicationRoute:
      'Year-round internship form: choose up to five labs. For stays longer than six months, contact research groups directly.',
    eligibilityDetails: null,
    eligibilitySummary:
      'Applicants are usually undergraduates; stays of up to 6 months.',
    verificationStatus: 'Source checked',
    sourceUrl: CHAMPALIMAUD,
    sources: [
      {
        title: 'Champalimaud Research education',
        url: CHAMPALIMAUD,
        checkedAt: NOV_10,
      },
    ],
    evidence: {
      country: checked(CHAMPALIMAUD, NOV_10),
      location: notChecked(),
      eligibleDegrees: notStated(
        CHAMPALIMAUD,
        NOV_10,
        'Applicants are “usually undergraduates”; no formal degree rule is stated.',
      ),
      eligibilityDetails: notStated(CHAMPALIMAUD, NOV_10),
      eligibilitySummary: checked(CHAMPALIMAUD, NOV_10, summaryNote),
      yearOfStudyRequirement: notStated(CHAMPALIMAUD, NOV_10),
      gpaRequirement: notStated(CHAMPALIMAUD, NOV_10),
      requiredDocuments: notChecked(),
      funding: notStated(CHAMPALIMAUD, NOV_10),
      fundingDetails: notStated(CHAMPALIMAUD, NOV_10),
      costs: notStated(CHAMPALIMAUD, NOV_10),
      duration: checked(CHAMPALIMAUD, NOV_10),
      period: checked(CHAMPALIMAUD, NOV_10),
      dates: notApplicable(
        CHAMPALIMAUD,
        NOV_10,
        'Year-round route; timing is agreed with the lab.',
      ),
      deadline: notApplicable(
        CHAMPALIMAUD,
        NOV_10,
        'Applications are accepted throughout the year.',
      ),
      applicationStatus: checked(CHAMPALIMAUD, NOV_10),
      applicationRoute: checked(CHAMPALIMAUD, NOV_10),
    },
  }),
]
