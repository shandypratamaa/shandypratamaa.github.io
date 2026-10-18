export type AchievementCategory = 'international' | 'national' | 'olympiad' | 'research' | 'academic' | 'badminton' | 'community' | 'other'

export type Achievement = {
  title: string
  category: AchievementCategory
  year?: string
  detail?: string
  certificates?: { src: string; label: string }[]
}

export const categoryLabels: Record<AchievementCategory | 'all', string> = {
  all: 'All records',
  international: 'International',
  national: 'National',
  olympiad: 'Olympiads',
  research: 'Research',
  academic: 'Academic & certifications',
  badminton: 'Badminton',
  community: 'Community',
  other: 'Other awards',
}

// Transcribed from the supplied portfolio specification. The duplicated 2024 IRCYS
// Bronze Medal line in its source is intentionally represented once.
export const achievements: Achievement[] = [
  { year: '2026', category: 'international', title: 'Grok Academy Australia Python Competition (Beginners) — Perfect Score' },
  { year: '2026', category: 'olympiad', title: 'STEM Olympiad Final International Round — Gold Medal', detail: 'Science · Online · Top 33/373 in Grade Level', certificates: [{ src: '/images/certificates/stem-science-2026-feb-digital-gold.webp', label: 'International STEM Olympiad 2026 Science Digital Gold Medal' }] },
  { year: '2026', category: 'olympiad', title: 'STEM Olympiad Final International Round — Gold Medal', detail: 'Technology & Engineering · Online · Top 12/183 in Grade Level', certificates: [{ src: '/images/certificates/stem-tech-2026-feb-digital-gold.webp', label: 'International STEM Olympiad 2026 Technology & Engineering Digital Gold Medal' }] },
  { year: '2026', category: 'olympiad', title: 'FISO International Round — Gold Award', detail: 'Science · Online' },
  { year: '2026', category: 'olympiad', title: 'FISO International Round — Gold Award', detail: 'Digital Technology · Online' },
  { year: '2026', category: 'olympiad', title: 'STEM Olympiad Best of the Bests Round — Score: 95/100', detail: 'Top 24/373 in Grade Level' },
  { year: '2026', category: 'international', title: 'Grok Academy Australia Python Competition (Intermediate) — Perfect Score', certificates: [{ src: '/images/certificates/grok-python-intermediate-perfect-score-2026.webp', label: 'Grok Academy Python Competition (Intermediate), Perfect Score' }] },
  { year: '2025', category: 'research', title: 'IRPrO — Gold Medal', detail: 'Research · Offline · Bandung, Indonesia' },
  { year: '2025', category: 'olympiad', title: 'Grand Final STEM Olympiad — Silver Medal', detail: 'Coding · Offline · Barcelona, Spain', certificates: [{ src: '/images/certificates/stem-gf-coding-silver.webp', label: 'Grand Final STEM Olympiad, Coding Silver Medal' }] },
  { year: '2025', category: 'olympiad', title: 'Grand Final STEM Olympiad — Bronze Medal', detail: 'Science · Offline · Barcelona, Spain', certificates: [{ src: '/images/certificates/stem-gf-science-bronze.webp', label: 'Grand Final STEM Olympiad, Science Bronze Medal' }] },
  { year: '2025', category: 'olympiad', title: 'STEM Olympiad — Gold Medal', detail: 'Tech & Engineering · Online', certificates: [{ src: '/images/certificates/stem-tech-2025-feb-gold-achievement.webp', label: 'International STEM Olympiad, Technology & Engineering Gold Medal' }, { src: '/images/certificates/stem-tech-2025-feb-gold-digital-medal.webp', label: 'Digital Gold Medal Certificate' }] },
  { year: '2025', category: 'olympiad', title: 'STEM Olympiad — Bronze Medal', detail: 'Coding · Online', certificates: [{ src: '/images/certificates/stem-coding-2025-bronze-achievement.webp', label: 'International STEM Olympiad, Coding Bronze Medal' }, { src: '/images/certificates/stem-coding-2025-bronze-digital-medal.webp', label: 'Digital Bronze Medal Certificate' }] },
  { year: '2025', category: 'research', title: 'IRCYS — Most Sustainable Award', detail: 'Research · Offline · Bali, Indonesia' },
  { year: '2025', category: 'olympiad', title: 'Copernicus Olympiad — Absolute Winner Top #1 (Gold Medal)', detail: 'Natural Science · International · Online' },
  { year: '2025', category: 'olympiad', title: 'FISO BISO National Round — Gold Medal', detail: 'Science · Category 7', certificates: [{ src: '/images/certificates/fiso-biso-science-2025-result-list.webp', label: 'FISO BISO 2025 Science National Round gold award results list' }] },
  { year: '2025', category: 'olympiad', title: 'ISOCSEA National Round — Gold Award', detail: 'Science · Online', certificates: [{ src: '/images/certificates/isocsea-2025-gold.webp', label: 'ISOCSEA National Round Gold Award' }] },
  { year: '2025', category: 'olympiad', title: 'FISO National Round — Gold Award', detail: 'Science · Online', certificates: [{ src: '/images/certificates/fiso-2025-national-science-gold.webp', label: 'FISO National Round Science Gold Award' }] },
  { year: '2025', category: 'olympiad', title: 'FISO National Round — Gold Award', detail: 'Digital Technology · Online', certificates: [{ src: '/images/certificates/fiso-2025-national-digital-technology-gold.webp', label: 'FISO National Round Digital Technology Gold Award' }] },
  { year: '2024', category: 'olympiad', title: 'Grand Final STEM Olympiad — Honorable Mention', detail: 'Coding · Offline · The Hague, Netherlands', certificates: [{ src: '/images/certificates/stem-coding-2024-feb-honorable-mention.webp', label: 'International STEM Olympiad 2024 Coding Honorable Mention' }, { src: '/images/certificates/stem-coding-2024-feb-digital-medal.webp', label: 'Digital Honorable Mention Certificate' }] },
  { year: '2024', category: 'olympiad', title: 'Grand Final STEM Olympiad — Honorable Mention', detail: 'Science · Offline · The Hague, Netherlands' },
  { year: '2024', category: 'research', title: 'IRCYS — Bronze Medal', detail: 'Research · Offline · Bali, Indonesia' },
  { year: '2024', category: 'olympiad', title: 'FISO BISO — Silver Medal', detail: 'Digital Technology · Online' },
  { year: '2024', category: 'olympiad', title: 'Olimpiade Sains Sigma — Gold Award, Province Level; Silver Award, National Level', detail: 'English' },
  { year: '2024', category: 'olympiad', title: 'Olimpiade Sains Sigma — 1st Place, Province Level', detail: 'Science' },
  { year: '2025', category: 'olympiad', title: '7th Copernicus Olympiad Local Round — Gold Medal', detail: 'Natural Science · Preliminary Round', certificates: [{ src: '/images/certificates/copernicus-natural-science-2025-gold.webp', label: '7th Copernicus Olympiad Natural Science Gold Medal' }] },
  { year: '2025', category: 'national', title: 'Eduversal Mathematics Competition Season 7 — Qualified for National Level', detail: 'Mathematics · Grade 11 · Semifinalist at Provincial Level', certificates: [{ src: '/images/certificates/emc-2025-national-qualification.webp', label: 'Eduversal Mathematics Competition 2025 National Level qualification' }, { src: '/images/certificates/emc-2025-provincial-semifinalist.webp', label: 'Eduversal Mathematics Competition 2025 Provincial Level semifinalist' }] },
  { year: '2025', category: 'olympiad', title: 'International STEM Olympiad Qualification Exam — Coding Participation', detail: '8 February 2025', certificates: [{ src: '/images/certificates/stem-coding-2025-feb-participation.webp', label: 'International STEM Olympiad Coding participation certificate, 8 February 2025' }] },
  { year: '2024', category: 'olympiad', title: 'International STEM Olympiad 2nd Qualification Exam — Qualified for Coding Final', detail: '28 January 2024 · 34/100 · Invited to the final round', certificates: [{ src: '/images/certificates/stem-coding-2024-jan-participation-idl.webp', label: 'International STEM Olympiad Coding participation certificate, 28 January 2024' }, { src: '/images/certificates/stem-coding-2024-jan-participation-ids.webp', label: 'International STEM Olympiad Coding participation certificate, 28 January 2024 (second issue)' }, { src: '/images/certificates/stem-coding-2024-jan-result.webp', label: 'International STEM Olympiad Coding qualification exam report' }] },
  { year: '2024', category: 'olympiad', title: 'International STEM Olympiad Qualification Exam — Technology & Engineering Participation', detail: '1 December 2024', certificates: [{ src: '/images/certificates/stem-tech-2024-dec-participation.webp', label: 'International STEM Olympiad Technology & Engineering participation certificate, 1 December 2024' }] },
  { year: '2026', category: 'academic', title: 'Python for Beginners — Certificate of Mastery', detail: 'Projects Development Center', certificates: [{ src: '/images/certificates/python-for-beginners-mastery.webp', label: 'Python for Beginners Certificate of Mastery' }] },
  { year: '2025', category: 'research', title: 'ISPO — Honorable Mention', detail: 'Research · Online Presentation' },
  { year: '2025', category: 'olympiad', title: 'IMSO — Second Place', detail: 'Science · Online' },
  { year: '2020–2021', category: 'academic', title: 'Academic Super Honor Roll', detail: 'Outstanding academic performance · 6th grade, Elementary School. Received a scholarship covering development fees for Secondary School.' },
  { year: '2019–2020', category: 'academic', title: 'Academic Honor Roll', detail: 'Outstanding academic performance · 5th grade, Elementary School' },
  { year: '2018–2019', category: 'academic', title: 'Academic Honor Roll', detail: 'Outstanding academic performance · 4th grade, Elementary School' },
  { year: '2023', category: 'academic', title: 'Cambridge Check Point High-Achievers', detail: 'Math and Science · 8th grade, Secondary School' },
  { year: '2017', category: 'other', title: 'Winner in Recycled Craft Contest' },
  { year: '2025', category: 'badminton', title: 'Glarisa CUP Vol. VIII — First Place', detail: "Men's Singles Badminton" },
  { year: '2017', category: 'academic', title: 'Cambridge Young Learners English (YLE), Starters', detail: 'Four shields for Reading and Writing; five shields for Listening and Speaking' },
  { year: '2018', category: 'academic', title: 'Cambridge Young Learners English (YLE), Movers', detail: 'Five shields for Reading and Writing, Listening, and Speaking' },
  { year: '2017', category: 'academic', title: 'Certified in Robotic Program, Level 1', detail: 'Techno Club Indonesia' },
  { year: '2018', category: 'academic', title: 'Certified in Robotic Program, Level 2', detail: 'Techno Club Indonesia' },
  { year: '2019', category: 'academic', title: 'Certified in Robotic Program, Level 3', detail: 'Techno Club Indonesia' },
  { year: '2019', category: 'academic', title: 'The 7 Habits of Highly Effective Kids', detail: 'FranklinCovey' },
  { year: '2020', category: 'academic', title: 'Holiday Academy Public Speaking Program', detail: 'English First' },
  { year: '2019–2024', category: 'academic', title: 'Frontrunner English Program, A and B Level', detail: 'CEFR (Common European Framework of Reference for Languages) standard · English First' },
  { year: '2021–2023', category: 'academic', title: 'Computer Programming', detail: 'C++, Python, Javascript, HTML · BrightChamps' },
  { year: '2024', category: 'academic', title: 'Computer Programming (Python), Basic Level', detail: 'Projects Development Center' },
  { year: '2024', category: 'academic', title: 'Computer Programming (Python), Intermediate Level', detail: 'Projects Development Center' },
  { year: '2024', category: 'academic', title: 'Computer Programming (Python), Advance Level', detail: 'Projects Development Center' },
  { year: '2023', category: 'badminton', title: "RCS CUP XIV — Third Place, Men's Doubles", detail: 'Raffles Cultural School Jakarta' },
  { year: '2024', category: 'badminton', title: "RCS CUP XV — First Place, Men's Doubles", detail: 'Raffles Cultural School Jakarta' },
  { year: '2024', category: 'badminton', title: "RCS CUP XV — Second Place, Men's Singles", detail: 'Raffles Cultural School Jakarta' },
  { year: '2025', category: 'badminton', title: "RCS CUP XVI — Third Place, Men's Singles", detail: 'Raffles Cultural School Jakarta' },
  { year: '2025', category: 'badminton', title: 'PB Sena Home Tournament (Ramadhan CUP) — First Place Teams', detail: 'Gor Kukusan' },
  { year: '2026', category: 'badminton', title: 'PB Sena Home Tournament (Ramadhan CUP) — First Place Teams', detail: 'Gor Kukusan' },
  { year: '2025', category: 'community', title: 'Involunteer — “Zootastic Adventures”', detail: 'January 12 · South Jakarta, Indonesia' },
  { year: '2025', category: 'community', title: 'School Council Volunteering — “Kharisma Bangsa Berbagi”', detail: 'March 14–22 · 24 hours', certificates: [{ src: '/images/certificates/school-council-volunteering-2025.webp', label: 'Certificate of School Volunteer Excellence' }] },
]
