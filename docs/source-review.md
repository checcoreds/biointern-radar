# Official-source collection review

The catalogue is **Europe-only**. Records are programme/route snapshots, not a claim that every programme has a place available. Primary sources and field-level evidence are stored with each record in `src/data/realOpportunities.ts`. Missing data remains missing. No pages are scraped into the application and no automated verification runs. See [status updates](status-updates.md) for the refresh procedure.

## Review log

- **28 October 2026:** first manual collection (11 records, including OIST Japan and NUS Singapore).
- **29 October 2026:** rechecked DAAD RISE eligibility only.
- **10 November 2026:**
  - Narrowed the catalogue to Europe: removed OIST and NUS Amgen Scholars Asia.
  - Rechecked status and deadline for EPFL, DAAD, EMBL and IMP, and the deadline for UNIL. Other fields keep their 28/29 October dates.
  - Rewrote VBC (the 2027 cycle is now named), ETH (open since 1 November) and LMU (open, and the application page moved to `/apply_active/`).
  - Replaced the closed Karolinska 2026 archive with the 2027 cycle.
  - Added Institut Pasteur and Cambridge Amgen Scholars 2027, Biozentrum Basel Research Summer 2027, the MPIIB Berlin international internship 2027, and CRG and Champalimaud year-round lab-enquiry routes.

## Current collection (15 records)

| Record                               | Status on 10 Nov 2026                     | Deadline                      | Official source                                                                                                                                      |
| ------------------------------------ | ----------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| EPFL Life Sciences SRP 2027          | Open                                      | 15 Nov 2026, 23:59 CET        | [Call](https://www.epfl.ch/schools/sv/education/summer-research-program/)                                                                            |
| UNIL SUR 2027                        | Open (status from 28 Oct check)           | 15 Nov 2026, midnight CET     | [Programme](https://courses.unil.ch/fbm/cours/4247)                                                                                                  |
| MPIIB-ISI 2027, Berlin               | Open (2027 application form live)         | 27 Nov 2026                   | [Call](https://www.mpiib-berlin.mpg.de/mpiib-isi)                                                                                                    |
| DAAD RISE Germany 2027               | Open (database open 15 Oct–30 Nov)        | 30 Nov 2026, 23:59 CET        | [Applicant guide](https://www.daad.de/rise/en/rise-germany/find-an-internship/what-applicants-need-to-know/)                                         |
| Vienna BioCenter Summer School 2027  | Upcoming (opens 15 Nov 2026)              | 11 Jan 2027, time not stated  | [How to apply](https://training.vbc.ac.at/how-to-apply/)                                                                                             |
| ETH Zurich Amgen Scholars 2027       | Open since 1 Nov 2026                     | 1 Feb 2027, noon (CET vs GMT) | [Call](https://ethz.ch/en/studies/non-degree-courses/summer-offers/summer-projects/amgen-scholars.html)                                              |
| LMU Munich Amgen Scholars 2027       | Open                                      | 1 Feb 2027, 12:00 CET         | [Apply](https://www.amgenscholars.mcn.lmu.de/apply_active/index.html)                                                                                |
| Karolinska Amgen Scholars 2027       | Open (per Amgen Scholars site)            | 1 Feb 2027                    | [Amgen host page](https://amgenscholars.com/university/karolinska-institutet-sweden/)                                                                |
| Institut Pasteur Amgen Scholars 2027 | Open since 1 Nov 2026                     | 1 Feb 2027, time not stated   | [Programme](https://www.pasteur.fr/en/about-us/our-missions/education/training-programs/internships-and-research-immersion/amgen-scholars-program-0) |
| Cambridge Amgen Scholars 2027        | Open                                      | 1 Feb 2027, 23:59 GMT         | [Guide to applying](https://amgenscholars.bio.cam.ac.uk/cambridge-programme/guide-applying)                                                          |
| Biozentrum Research Summer 2027      | Upcoming (opens 4 Jan 2027)               | 28 Feb 2027, 12:00 CET        | [Programme](https://www.biozentrum.unibas.ch/summer-schools/biozentrum-research-summer)                                                              |
| EMBL undergraduate placements        | No advertised vacancy (general enquiries) | None                          | [Undergraduates at EMBL](https://www.embl.org/about/info/undergraduates/)                                                                            |
| IMP master/research internships      | No advertised vacancy (general enquiries) | None                          | [Master internships](https://www.imp.ac.at/career/master-internships)                                                                                |
| CRG internships                      | No advertised vacancy (year-round route)  | None                          | [Undergraduates and masters](https://www.crg.eu/en/content/training/undergraduates-and-masters)                                                      |
| Champalimaud Research internships    | No advertised vacancy (year-round form)   | None                          | [Education](https://fchampalimaud.org/champalimaud-research/education)                                                                               |

## Deliberate uncertainties

- **ETH:** the main page says 12.00 noon CET; an October news post said noon GMT. The date is stored without an exact timestamp.
- **Karolinska:** KI's own Amgen page returned “page not found” on 10 November. The record uses the official Amgen Scholars site; the stipend and KI's portal are unconfirmed.
- **VBC:** the 2027 support terms (stipend, housing) were checked on 28 October; the programme page returned an error on 10 November.
- **MPIIB:** the deadline has no stated time; the FAQ mentions the portal closes “after midnight CET” without naming the date.
- **Biozentrum:** the headline says “from across Europe”, but eligibility is limited to Swiss/EU citizens and Swiss C-permit holders.
- **Pasteur vs Cambridge:** the two pages give the symposium end as 3 and 4 September respectively.
- **UNIL:** the page gives the deadline but no explicit open/closed wording; the stored “Open” status dates from the 28 October check.
- **DAAD RISE** is located in Germany but is only for students at universities in the US, Canada, UK or Ireland.
- Fields marked **Not yet checked** have not been researched; **Not stated by the source** refers only to the page actually checked. Neither means that a requirement or cost is absent.

## Not added (watch list)

- **CNIO Summer Training Programme (Madrid):** the page lists cycles up to 2026; no 2027 call yet.
- **ISTA ISTernship (Austria):** reported as paused; 2027 not confirmed.
- **CRG Summer Internship Programme:** has not run since 2022 (CRG's year-round route is included instead).
- **Gulbenkian (now GIMM) Undergraduate Summer School:** the old page now shows a merger notice; the current programme page was not found.
- **IRB Barcelona “A Future in Biomedicine”:** limited to students at local universities.

The separate fictional fixtures are for UI exploration and regressions. Real and demo records use separate collection controls and visible badges, including in saved opportunities. Do not present demo assertions as factual claims.
