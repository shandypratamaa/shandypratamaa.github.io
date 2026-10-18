import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { achievements, categoryLabels, type Achievement, type AchievementCategory } from './content/achievements'

const nav = [
  ['About', 'about'], ['Achievements', 'achievements'], ['Projects', 'projects'],
  ['Research', 'research'], ['Interests', 'interests'], ['Contact', 'contact'],
] as const
type NavigationHistory = { goBack: (fallback: string) => void }
const NavigationHistoryContext = createContext<NavigationHistory>({ goBack: () => {} })
const interests = [
  { title: 'Automotive', path: '/automotive', index: '01', note: 'An interest in automotive.' },
  { title: 'Aviation', path: '/aviation', index: '02', note: 'An interest in aviation.' },
  { title: 'Badminton', path: '/badminton', index: '03', note: 'Playing and verified results.' },
  { title: 'Technology', path: '/technology', index: '04', note: 'A subject of interest.' },
  { title: 'Travel', path: '/travel', index: '05', note: 'Five destinations, more to come.' },
  { title: 'LEGO Collection', path: '/lego', index: '06', note: 'A collection of builds and favorite sets.' },
  { title: 'Pets', path: '/pets', index: '07', note: 'Meet the cats and Patou.' },
]
type Pet = { name: string; kind: 'Cat' | 'Dog'; src?: string; alt: string; description?: string }
const pets: Pet[] = [
  { name: 'Mengi', kind: 'Cat', src: '/images/pets/mengi.jpg', alt: 'Mengi sitting in the sunshine beneath a leafy plant.', description: "On a rainy day in 2016, my mom came home and found Mengi, a half-grown kitten, sitting in front of our house. She fed her and tried to keep her warm. Luckily, Mengi survived that day and eventually decided to make our house her home.\n\nOver the years, Mengi became the mother of two generations of cats in our household and lived a long life with us. Despite being part of our family for so long, she had a rather aggressive personality. Even when we approached her calmly, she rarely allowed us to touch or pet her. Interestingly, my mom was the only exception. Mengi would let her pet her without getting angry, making their bond quite special.\n\nMengi passed away on April 10, 2026, at the age of ten. Although she is no longer with us, she remains an important part of our family's story, having started two generations of cats in our home." },
  { name: 'Kuber', kind: 'Cat', src: '/images/pets/kuber.jpg', alt: 'Kuber sitting among green plants, wearing a red collar.', description: "Kuber was Mengi's first son and belonged to the first generation of cats in our household. He became the fattest cat in our family, reaching an impressive weight of 7.5 kilograms.\n\nWhat makes Kuber special is his unusually calm attitude toward other cats. Even when unfamiliar cats approach our house, he rarely gets angry or aggressive. He generally tolerates them unless he feels intimidated or threatened. His relaxed personality makes him one of the more easygoing cats in our household.\n\nTo this day, Kuber still enjoys his favourite food: chicken. Although he is visibly getting older, he continues to enjoy the simple things he has always loved. Watching him grow older reminds me of how much time has passed since the first generation of cats arrived in our home." },
  { name: 'Kuman', kind: 'Cat', src: '/images/pets/kuman.jpg', alt: 'Kuman resting on a chair.', description: "Kuman got her name when my dad jokingly called her a leopard, or (macan tutul), because of the distinctive spots and colours of her fur when she was a kitten. Born into the second generation of cats in our household, she stood out because of her unique appearance.\n\nDespite her wildcat-inspired name, Kuman has a calm and gentle personality. She rarely gets angry and is generally one of the more relaxed cats in our home.\n\nKuman once became a mother herself, giving birth to several kittens. Unfortunately, none of them survived, as she was not ready to take on the responsibilities of motherhood at the time. Despite this difficult experience, Kuman remains part of the growing story of our family's cats, each with their own personality and experiences." },
  { name: 'Andin', kind: 'Cat', src: '/images/pets/andin.png', alt: 'Andin, a calico cat, sitting on the floor.', description: "Andin is a calico cat born into the second generation of cats in our household. Her name came about unexpectedly when one of our housemaids suddenly started calling her Andin, and the name eventually stuck.\n\nOne of Andin's most noticeable habits is her love of sitting down. She often settles into a comfortable position and stays there, making sitting one of the behaviours that best characterises her.\n\nAlthough her name came from an unexpected moment, it has become a familiar part of our family's everyday life. Andin is another example of how each cat in our household develops their own identity, even when their names and personalities emerge from ordinary, memorable moments." },
  { name: 'Kuber Jr.', kind: 'Cat', src: '/images/pets/kuber-jr.png', alt: 'Kuber Junior lying on his back with his belly exposed.', description: "Kuber Junior, affectionately known as Kuju by our family, was born into the second generation of cats in our household. Although he shares part of his name with Kuber, he has his own distinctive personality and habits.\n\nOne of Kuju's funniest habits is rolling onto his back and lying down with his belly exposed, just like in this photograph. He often does this when he wants attention or belly rubs, making it difficult to resist giving him some affection.\n\nHis relaxed poses and playful behaviour give him a recognisable place in our household. Whenever Kuju lies on his back, it feels as though he is inviting everyone around him to stop for a moment and give him some attention." },
  { name: 'Kiki', kind: 'Cat', src: '/images/pets/kiki.png', alt: 'Kiki sitting beside a door.', description: "Kiki is not part of Mengi's family, but she became a member of our household after my mom found her injured in our front yard. Her jaw had been displaced, and she had severe cuts around her neck.\n\nMy mom decided to rescue her by taking her to a veterinarian, where Kiki underwent surgery to treat her injuries. Fortunately, she made a full recovery and eventually settled into our home.\n\nDespite everything she went through, Kiki developed quite a fiery personality. She can be easily angered and is one of the more temperamental cats in our household. Her personality is a reminder that every cat is different, and Kiki certainly has a character of her own.\n\nWhat makes her story especially meaningful is how she became part of our family after being found injured outside. Thanks to my mom's decision to help her, Kiki recovered and found a place where she could stay." },
  { name: 'Valentino', kind: 'Cat', src: '/images/pets/valentino.png', alt: 'Valentino relaxing on a sofa.', description: "Valentino is not part of Mengi's family. We adopted him from someone we knew and named him Valentino because of his impressive speed and his habit of hunting cockroaches.\n\nBorn in January 2026, Valentino is still one of the youngest cats in our household. His energetic personality often makes him stand out, especially when he starts running around or chasing things.\n\nOne of his most unusual habits is joining us in the car. Whenever we are about to park, he sometimes jumps inside and tries to come along for the ride. This quirky behaviour has become one of the things that makes Valentino memorable to our family.\n\nAs he grows older, it will be interesting to see how his personality develops. For now, he remains a young, energetic cat who always seems ready to explore his surroundings." },
  { name: 'Kinong (Putih)', kind: 'Cat', src: '/images/pets/kinong-putih.png', alt: 'Kinong and his brother Valentino resting together.', description: 'Kinong, often called Putih, meaning "white" in Indonesian, is Valentino\'s younger brother. Interestingly, the two were born only five minutes apart, making them almost the same age.\n\nDespite their incredibly small age difference, Kinong has a personality that contrasts with Valentino\'s energetic nature. While Valentino enjoys chasing things and running around, Kinong tends to be much calmer.\n\nRather than actively chasing something, Kinong prefers to wait until it comes close to him before making his move. His approach is almost the opposite of Valentino\'s: instead of pursuing everything that catches his attention, he lets things come to him.\n\nThis difference makes the two brothers an interesting pair. Even though they were born just minutes apart, their contrasting personalities show how different two cats can be despite sharing such a close beginning.' },
  { name: 'Patou', kind: 'Dog', src: '/images/interests/netherlands-02.webp', alt: 'Patou sitting near a church in the Netherlands.' },
]
const petPlaceholder = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#1a2924"/><stop offset="1" stop-color="#101615"/></linearGradient></defs><rect width="640" height="480" fill="url(#g)"/><circle cx="320" cy="232" r="142" fill="#263b33"/><path d="M220 150 188 54q-5-15 11-9l104 59m118 46 32-96q5-15-11-9l-104 59" fill="#9ad7cc"/><path d="M212 194a108 108 0 0 1 216 0v57a108 108 0 0 1-216 0z" fill="#9ad7cc"/><ellipse cx="278" cy="208" rx="10" ry="15" fill="#101615"/><ellipse cx="362" cy="208" rx="10" ry="15" fill="#101615"/><path d="m310 235 10-7 10 7-10 10z" fill="#101615"/><path d="M320 245q-17 24-36 0m36 0q17 24 36 0" fill="none" stroke="#101615" stroke-width="6" stroke-linecap="round"/><path d="M238 233 176 222m64 31-68 12m230-32 62-11m-64 31 68 12" stroke="#9ad7cc" stroke-width="5" stroke-linecap="round"/><text x="320" y="420" fill="#a7b8af" font-family="Arial,sans-serif" font-size="19" letter-spacing="4" text-anchor="middle">PHOTO COMING SOON</text></svg>')}`
const travelStops = [
  { number: '01', title: 'Bali', photos: [
    { src: '/images/interests/bali-01.webp', title: 'Mertasari Beach', description: 'A view of Mertasari Beach in Sanur, Bali.', alt: 'A quiet Bali shoreline at Mertasari Beach in Sanur.' },
    { src: '/images/interests/bali-02.webp', title: 'Uluwatu', description: 'A coastal view near Uluwatu Temple.', alt: 'The cliffs and sea along Bali’s Uluwatu coast.' },
    { src: '/images/interests/bali-03.webp', title: 'Jatiluwih waterfall', description: 'A waterfall in Jatiluwih, Bali.', alt: 'Water cascading into a shaded pool in Jatiluwih.' },
    { src: '/images/interests/bali-04.webp', title: 'Sanur from above', description: 'An aerial view of Sanur, photographed with my DJI Neo 2 drone.', alt: 'A drone view along the Sanur shoreline at sunset.' },
    { src: '/images/interests/bali-05.webp', title: 'Mount Batur', description: 'Mount Batur in Kintamani, partly covered by clouds.', alt: 'Mount Batur rising through clouds above the Kintamani landscape.' },
  ] },
  { number: '02', title: 'Lombok', photos: [] },
  { number: '03', title: 'The Netherlands', photos: [
    { src: '/images/interests/netherlands-01.webp', title: 'Along the canal', description: 'A canal-side view from my two-week stay in the Netherlands before returning to Jakarta.', alt: 'Historic Dutch buildings beside a city canal.' },
    { src: '/images/interests/netherlands-02.webp', title: 'Patou and the church', description: 'A church near our home, explored with my dog, Patou.', alt: 'My dog Patou sitting near a church in the Netherlands.' },
  ] },
  { number: '04', title: 'Barcelona & Madrid', photos: [
    { src: '/images/interests/barcelona-01.webp', title: 'Sagrada Família', description: 'I visited Antoni Gaudí’s unfinished basilica while attending the 2025 STEM Olympiad.', alt: 'Looking up at the sculpted towers of the Sagrada Família in Barcelona.' },
    { src: '/images/interests/barcelona-02.webp', title: 'Santiago Bernabéu', description: 'After the STEM Olympiad in Barcelona, I stayed in Madrid and visited Real Madrid’s iconic stadium.', alt: 'The pitch and stands inside the Santiago Bernabéu in Madrid.' },
  ] },
  { number: '05', title: 'Singapore', photos: [
    { src: '/images/interests/singapore-01.webp', title: 'National University of Singapore', description: 'A visit to NUS during the GLS 2026 event.', alt: 'The entrance to the National University of Singapore.' },
    { src: '/images/interests/singapore-02.webp', title: 'Aerospace engineering', description: 'I photographed NTU’s School of Mechanical and Aerospace Engineering, a place connected to my dream major.', alt: 'Shandy standing beside the School of Mechanical and Aerospace Engineering sign at NTU.' },
    { src: '/images/interests/singapore-03.webp', title: 'NTU eVTOL demonstrator', description: 'I saw this full-scale electric vertical take-off and landing aircraft demonstrator while visiting NTU.', alt: 'A full-scale electric vertical take-off and landing aircraft demonstrator at NTU.' },
  ] },
]
type InterestPhoto = { src?: string; title: string; description: string; alt: string }
const automotivePhotos: InterestPhoto[] = [
  { src: '/images/interests/lbwk-car-01.webp', title: 'LB-Silhouette WORKS Ferrari 458 GT', description: 'One of my favorite cars since I was a kid.', alt: 'A black Liberty Walk Ferrari 458 GT with a wide-body kit.' },
  { src: '/images/interests/lbwk-car-02.webp', title: 'LB-WORKS Toyota GR86', description: 'A newer body kit for the Toyota GR86 and Subaru BRZ: clean, precise, and beautifully finished.', alt: 'A white Liberty Walk Toyota GR86 displayed at a car event.' },
  { src: '/images/interests/pandem-car-01.webp', title: 'Pandem GT86', description: 'One of Pandem’s most iconic cars. I have loved Pandem designs since I was a kid.', alt: 'The front of a white Pandem wide-body Toyota GT86.' },
  { src: '/images/interests/pandem-car-02.webp', title: 'Pandem GT86, rear view', description: 'The rear of the GT86 I saw at IMX 2026.', alt: 'Rear view of a white Pandem Toyota GT86 at IMX 2026.' },
  { src: '/images/interests/kei-miura-meeting.webp', title: 'Meeting Kei Miura', description: 'I met Kei Miura at IMX 2026, where he signed my Pandem GT86 Hot Wheels car.', alt: 'Shandy with Kei Miura in front of a white Pandem GT86 at IMX 2026.' },
]
const aviationAircraft: InterestPhoto[] = [
  { title: 'Airbus A350', description: "I've been fascinated by the Airbus A350 since childhood. Its sleek design, distinctive wingtips, and impressive engineering have always caught my attention. Beyond its appearance, I'm intrigued by how its aerodynamics, composite materials, and Trent XWB engines work together to make it such a remarkable aircraft.", src: '/images/interests/airbus-a350.webp', alt: 'An Airbus A350 airliner climbing into a bright sky.' },
  { title: 'Boeing 777', description: "The Boeing 777 is another aircraft I've admired since childhood. I find its powerful presence, long-range capabilities, and twin-engine design particularly fascinating. I'm especially interested in how its engineering combines performance, efficiency, and the ability to connect distant parts of the world. It's one of the aircraft that helped spark my broader interest in aviation.", alt: 'Boeing 777 photo to be added.' },
  { title: 'Lockheed Martin F-22 Raptor', description: "The F-22 Raptor fascinates me because of its distinctive design and advanced aerospace engineering. Its sleek shape, twin-engine configuration, and combination of stealth and manoeuvrability make it an aircraft I find particularly interesting. I admire how engineering, aerodynamics, and advanced technology come together in such a sophisticated aircraft.", alt: 'Lockheed Martin F-22 Raptor photo to be added.' },
  { title: 'Boeing 747-400', description: "The Boeing 747-400 holds a special place in my aviation interests because I've actually flown on this aircraft when travelling to Bali. Experiencing a journey aboard such an iconic aircraft made it more than something I admired from a distance. I'm fascinated by its distinctive hump-shaped upper deck, enormous size, and the engineering behind its four-engine design. Known as one of the most recognisable generations of the legendary 747 family, the 747-400 represents a memorable connection between my childhood fascination with aviation and my own travel experiences.", alt: 'Boeing 747-400 photo to be added.' },
  { title: 'Lockheed Martin F-35B Lightning II', description: "What fascinates me most about the F-35B Lightning II is its short take-off and vertical landing (STOVL) capability. The ability to transition between conventional flight and vertical landing is an incredible example of aerospace engineering. I'm particularly interested in how its propulsion and flight-control systems work together to make this possible. The technology behind its vertical landing capability is what makes the F-35B stand out to me.", alt: 'Lockheed Martin F-35B Lightning II photo to be added.' },
  { title: 'Sukhoi Su-57 Felon', description: "The Sukhoi Su-57 fascinates me because of its distinctive design and unconventional-looking aerodynamic surfaces. As Russia's fifth-generation stealth fighter, it combines aerodynamic manoeuvrability with advanced avionics and a design intended to reduce radar visibility. I'm particularly interested in how its shape balances stealth characteristics with the aerodynamic performance needed for highly manoeuvrable flight. Compared with the F-22 Raptor and F-35B Lightning II, the Su-57 offers another fascinating perspective on how different aerospace engineering approaches shape modern fighter aircraft.", alt: 'Sukhoi Su-57 Felon photo to be added.' },
]
type LegoSet = { name: string; number: string; age: string; pieces: string; description: string; image: string; alt: string }
const legoSets: LegoSet[] = [
  { name: 'Ferrari Daytona SP3', number: '42143', age: '18+', pieces: '3,778 pieces', description: 'A 1:8 scale supercar in classic Ferrari red, with an 8-speed sequential gearbox and paddle shifters, opening butterfly doors, and a V12 engine with moving pistons.', image: 'https://www.lego.com/cdn/cs/set/assets/bltb862bc546852bd71/42143.png?dpr=1&fit=bounds&format=jpg&height=1500&quality=80&width=1500', alt: 'LEGO Technic Ferrari Daytona SP3, set 42143, in red.' },
  { name: 'Lamborghini Sián FKP 37', number: '42115', age: '18+', pieces: '3,696 pieces', description: 'An intricate 1:8 scale model in lime green with golden rims, functional scissor doors, a V12 engine, front and rear suspension, and a working 8-speed transmission.', image: 'https://www.lego.com/cdn/cs/set/assets/bltee88e5e65f00bd00/42115.jpg?dpr=1&fit=bounds&format=jpg&height=1500&quality=80&width=1500', alt: 'LEGO Technic Lamborghini Sián FKP 37, set 42115, in lime green.' },
  { name: 'Porsche GT4 e-Performance Race Car', number: '42176', age: '10+', pieces: '834 pieces', description: 'An interactive motorized race car that connects to the LEGO CONTROL+ app, with remote-control steering, working headlights, and live driving telemetry.', image: 'https://www.lego.com/cdn/cs/set/assets/blt18f5c5a692b50842/42176.png?dpr=1&fit=bounds&format=jpg&height=1500&quality=80&width=1500', alt: 'LEGO Technic Porsche GT4 e-Performance Race Car, set 42176.' },
  { name: 'Bugatti Bolide', number: '42151', age: '9+', pieces: '905 pieces', description: 'A display model in a striking yellow and black color scheme, with working scissor doors, a steering mechanism, and a detailed W16 engine replica.', image: 'https://www.lego.com/cdn/cs/set/assets/bltf73564a058fa0425/42151.png?dpr=1&fit=bounds&format=jpg&height=1500&quality=80&width=1500', alt: 'LEGO Technic Bugatti Bolide, set 42151, in yellow and black.' },
]
const badmintonPhotos: InterestPhoto[] = [
  { src: '/images/interests/badminton-podium.webp', title: 'A tournament podium', description: 'In Grade 10, I earned second place in men’s singles and first place in men’s doubles.', alt: 'Shandy receiving a badminton tournament award on stage.' },
  { src: '/images/interests/badminton-trophies.webp', title: 'Trophy collection', description: 'One moment from a series of tournaments. I kept competing and added more results afterward.', alt: 'Badminton trophies from a school competition.' },
]
type ProjectImage = { src?: string; alt?: string; label: string; className?: string }
type ProjectItem = { id: string; name: string; icon: string; summary: string; description: string[]; images: ProjectImage[] }
const projects: ProjectItem[] = [
  {
    id: 'spendly', name: 'Spendly', icon: '👛',
    summary: 'A personal finance and savings management app built with Swift and SwiftUI.',
    description: [
      'Spendly is a personal finance and savings management application built using Swift, SwiftUI, and Mac Catalyst. Designed for personal use, it helps users track their money, manage expenses, set budgets, and stay motivated to save without connecting to real bank accounts.',
      'The application includes eight main sections: Home, Calendar, History, Charts, Wishlists, Savings, Accounts, and Settings. Users can record income and expenses, manage multiple accounts, monitor monthly budgets, create savings plans, and link savings goals to wishlist items. Savings plans support daily contribution targets, custom top-ups, progress tracking, and estimated completion times.',
      'Spendly uses a local-first architecture, with SpendlyStore managing application data and UserDefaults storing JSON-encoded records. SwiftUI updates the interface when published data changes. The app also supports currency conversion, exchange-rate updates, CSV exports, reminders, and widget integration.',
      'Its interface is organized into multiple Swift files for easier maintenance. The theme system is being developed to support light, dark, system, and gradient appearances across all pages.',
      'The main goal of Spendly is to provide a simple, personalized financial dashboard that makes tracking money and achieving savings goals easier and more motivating.',
    ],
    images: [
      { src: '/images/projects/spendly/home-dashboard.png', alt: 'Spendly Home dashboard showing accounts, income and expenses, budget, wishlist, and savings summary.', label: 'Home dashboard · accounts, budget & savings', className: 'spendly-screen-crop' },
      { src: '/images/projects/spendly/wishlists.png', alt: 'Spendly Wishlists screen showing a savings goal and its progress toward the target.', label: 'Wishlists · savings goals', className: 'spendly-screen-crop' },
      { src: '/images/projects/spendly/savings.png', alt: 'Spendly Savings screen showing a daily contribution plan, target, saved amount, and progress.', label: 'Savings · contribution plan', className: 'spendly-screen-crop' },
      { src: '/images/projects/spendly/history.png', alt: 'Spendly History screen listing recorded transactions and their amounts.', label: 'History · recorded transactions', className: 'spendly-screen-crop' },
    ],
  },
  {
    id: 'scorly', name: 'Scorly', icon: '📈',
    summary: 'An SAT practice tracker for recording questions, reviewing mistakes, and measuring progress.',
    description: [
      'Scorly is an SAT practice tracking platform designed to help students record questions, analyze performance, review mistakes, and monitor improvement over time. It organizes individual SAT questions by topic, subtopic, difficulty, time spent, and answer accuracy, allowing students to identify weaknesses and focus their revision effectively. The platform also connects students directly with their parents or guardians, allowing them to view real-time progress dashboards, analyze strengths and weaknesses, and stay actively involved in the preparation journey.',
      'Scorly is built using React, TypeScript, and TanStack Start, with Tailwind CSS for styling. Its backend uses PostgreSQL through Supabase for persistent data storage, Supabase Auth for authentication, and private cloud storage for uploaded screenshots. Row-Level Security (RLS) restricts access to authorized records, while database triggers protect recorded difficulty and time-spent measurements from modification.',
      'The platform’s main features include screenshot-based question logging, interactive practice, performance statistics, a student dashboard, and a guardian dashboard. Currently, screenshot analysis uses the Lovable AI Gateway to extract question text, answer choices, the student’s answer, the correct answer, difficulty, elapsed time, and SAT topic classifications. The extracted information populates the logging form and is saved to the database.',
      'The review system uses stored question data and JavaScript to check answers, allowing students to retry questions without additional AI requests. Statistics summarize performance across topics, difficulty levels, and time spent. Guardians can monitor connected students through a read-only dashboard.',
      'Scorly’s future development aims to establish an independent infrastructure using GitHub for source control, Vercel for hosting, and a personally managed Supabase project for the backend. The screenshot reader could also be replaced with traditional optical character recognition (OCR), image processing, and rule-based parsing to eliminate generative AI API costs. This approach would require accuracy testing and manual confirmation for uncertain results.',
      'The ultimate goal is to provide a reliable, secure, and accessible SAT preparation platform that combines detailed performance tracking with interactive revision and progress monitoring.',
    ],
    images: [
      { src: '/images/projects/scorly/dashboard.webp', alt: 'Scorly student dashboard with practice progress, accuracy, streak, topic performance, and activity chart.', label: 'Student dashboard' },
      { src: '/images/projects/scorly/review-collection.webp', alt: 'Scorly review collection showing saved SAT practice questions and review controls.', label: 'Review collection' },
      { src: '/images/projects/scorly/question-logger.webp', alt: 'Scorly question logger with screenshot upload and question history.', label: 'Question logger' },
    ],
  },
]

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Shandy Putra`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.append(meta) }
    meta.setAttribute('content', description)
    const og = document.querySelector('meta[property="og:title"]')
    og?.setAttribute('content', `${title} — Shandy Putra`)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [title, description])
}

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  useEffect(() => {
    const routeKey = location.key
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const restoreScrollY = navigationType === 'POP' ? scrollPositions.get(routeKey) : undefined

    if (typeof restoreScrollY === 'number') {
      // Restore the exact history entry after its page has rendered.
      requestAnimationFrame(() => {
        window.scrollTo({ top: restoreScrollY, behavior: 'auto' })
        scrollPositions.set(routeKey, window.scrollY)
      })
    } else {
      const sectionId = location.hash.slice(1)
      const target = sectionId ? document.getElementById(sectionId) : null
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
      else window.scrollTo(0, 0)
    }

    const saveScrollPosition = () => scrollPositions.set(routeKey, window.scrollY)
    if (typeof restoreScrollY !== 'number') saveScrollPosition()
    window.addEventListener('scroll', saveScrollPosition, { passive: true })
    return () => {
      saveScrollPosition()
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, [location.pathname, location.search, location.hash, location.key, navigationType])
  return null
}

const scrollPositions = new Map<string, number>()

function ScrollReveals() {
  const { pathname } = useLocation()
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('has-scroll-reveal')
      return
    }

    document.documentElement.classList.add('has-scroll-reveal')
    const sections = document.querySelectorAll<HTMLElement>('main > section, main > section .travel-stop, main > section .record-row, main > section .interest-card, main > section .highlight-row, main > section .photo-card, main > section .pet-card')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { threshold: 0.08, rootMargin: '-4% 0px -8% 0px' })

    sections.forEach((section) => {
      section.classList.add('scroll-reveal')
      section.classList.remove('is-visible')
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [pathname])
  return null
}

let handledRefreshTimeOrigin: number | null = null

function RefreshHomeRedirect() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (pathname === '/' && !hash) return
    const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (navigation?.type !== 'reload' || handledRefreshTimeOrigin === performance.timeOrigin) return

    const marker = 'portfolio-refresh-home-time-origin'
    try {
      if (sessionStorage.getItem(marker) === String(performance.timeOrigin)) return
      sessionStorage.setItem(marker, String(performance.timeOrigin))
    } catch {
      // Storage can be disabled; the in-memory guard still prevents duplicate redirects.
    }
    handledRefreshTimeOrigin = performance.timeOrigin
    navigate('/', { replace: true })
  // Refresh navigation metadata remains "reload" for the whole SPA session. Check
  // it only on the initial mount so later in-app links are never redirected home.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return <header className="site-header">
    <Link className="wordmark" to="/" aria-label="Shandy Putra, home"><span>SP</span><span className="wordmark-name">SHANDY PUTRA PRATAMA</span></Link>
    <button className="menu-toggle" ref={trigger} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
      <span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true">{open ? '−' : '+'}</i>
    </button>
    <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Homepage sections">
      {nav.map(([label, section]) => {
        const isInterestRoute = section === 'interests' && ['/automotive', '/aviation', '/badminton', '/travel', '/technology', '/lego', '/pets'].includes(location.pathname)
        const active = location.pathname === '/' ? location.hash === `#${section}` : location.pathname === `/${section}` || isInterestRoute
        return <Link key={section} to={`/#${section}`} className={`nav-link ${active ? 'active' : ''}`} aria-current={active ? 'location' : undefined} onClick={(event) => {
          if (location.pathname === '/' && location.hash === `#${section}`) {
            event.preventDefault()
            document.getElementById(section)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
          }
        }}>{label}</Link>
      })}
    </nav>
  </header>
}

function Footer() { return <footer className="site-footer"><Link to="/" className="footer-mark">SP</Link><span>Shandy Putra (2026)</span><a href="#top" className="back-top">Back to top ↑</a></footer> }
function PageFrame({ children }: { children: React.ReactNode }) { return <><Header/><main id="main-content" tabIndex={-1}>{children}</main><Footer/></> }
function useAnimatedDismiss() {
  const [closing, setClosing] = useState(false)
  const timeout = useRef<number | null>(null)
  const closingRef = useRef(false)
  useEffect(() => () => { if (timeout.current !== null) window.clearTimeout(timeout.current) }, [])
  const dismiss = (onDismiss: () => void) => {
    if (closingRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDismiss(); return }
    closingRef.current = true
    setClosing(true)
    timeout.current = window.setTimeout(() => { closingRef.current = false; setClosing(false); onDismiss() }, 180)
  }
  return { closing, dismiss }
}
function BackButton({ fallback }: { fallback?: string }) {
  const { goBack } = useContext(NavigationHistoryContext)
  const location = useLocation()
  const defaultFallbacks: Record<string, string> = {
    '/about': '/#about', '/achievements': '/#achievements', '/projects': '/#projects', '/research': '/#research', '/contact': '/#contact',
    '/automotive': '/#interests', '/aviation': '/#interests', '/badminton': '/#interests', '/technology': '/#interests', '/travel': '/#interests', '/lego': '/#interests', '/pets': '/#interests',
  }
  const destination = fallback ?? defaultFallbacks[location.pathname] ?? '/'
  const { closing, dismiss } = useAnimatedDismiss()
  if (`${location.pathname}${location.search}${location.hash}` === destination) return null
  const destinations: Record<string, string> = { '/#about': 'About', '/#achievements': 'Achievements', '/#projects': 'Projects', '/#research': 'Research', '/#interests': 'Interests', '/#contact': 'Contact', '/': 'home' }
  const accessibleLabel = `Go back to ${destinations[destination] ?? 'the main page'}`
  return <button className={`page-back-button ${closing ? 'is-leaving' : ''}`} type="button" disabled={closing} aria-label={accessibleLabel} onClick={() => dismiss(() => goBack(destination))}><span aria-hidden="true">←</span><span>Back</span></button>
}
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span className="eyebrow-line"/>{children}</p> }
function SectionTitle({ kicker, children, aside }: { kicker: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return <div className="section-heading"><div><Eyebrow>{kicker}</Eyebrow><h2>{children}</h2></div>{aside}</div>
}
function EmptyState({ label, detail }: { label: string; detail: string }) { return <div className="empty-state"><span className="empty-icon" aria-hidden="true">↗</span><div><h3>{label}</h3><p>{detail}</p></div></div> }
function ArtPanel({ variant = 'orbital', label }: { variant?: string; label: string }) { return <div className={`art-panel art-${variant}`} role="img" aria-label={label}><div className="art-index">SP / 2026</div><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-glow"/><span className="art-caption">{label}</span></div> }

function PhotoGallery({ photos, className = '' }: { photos: InterestPhoto[]; className?: string }) {
  const [selected, setSelected] = useState<InterestPhoto | null>(null)
  const { closing, dismiss } = useAnimatedDismiss()
  const closeButton = useRef<HTMLButtonElement>(null)
  const triggerButton = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      triggerButton.current?.focus()
    }
  }, [selected])

  return <>
    <div className={`photo-gallery ${className}`}>
      {photos.map((photo) => <figure className="photo-card" key={photo.src ?? photo.title}>
        <button className="project-image-preview-trigger photo-preview-trigger" type="button" aria-haspopup="dialog" aria-label={`Preview ${photo.title}`} onClick={(event) => { triggerButton.current = event.currentTarget; setSelected(photo) }}>
          {photo.src ? <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async"/> : <span className="photo-card-placeholder" aria-hidden="true"><span>{photo.title}</span><span>PHOTO TO COME</span></span>}
          <span className="project-image-zoom" aria-hidden="true">↗</span>
        </button>
        <figcaption><h3>{photo.title}</h3><p>{photo.description}</p></figcaption>
      </figure>)}
    </div>
    {selected && createPortal(<div className={`image-preview-backdrop ${closing ? 'is-closing' : ''}`} onClick={() => dismiss(() => setSelected(null))} onKeyDown={(event) => { if (event.key === 'Escape') dismiss(() => setSelected(null)); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus() } }}>
      <section className="image-preview-dialog" role="dialog" aria-modal="true" aria-label={`${selected.title} image preview`}>
        <button ref={closeButton} className="image-preview-close" type="button" onClick={() => dismiss(() => setSelected(null))} aria-label="Close image preview">×</button>
        {selected.src ? <img src={selected.src} alt={selected.alt}/> : <div className="image-preview-placeholder" role="img" aria-label={selected.alt}><span>{selected.title}</span><span>PHOTO TO COME</span></div>}
        <p>{selected.title}</p>
        <div className="image-preview-description">{selected.description}</div>
      </section>
    </div>, document.body)}
  </>
}

function PetGallery() {
  const [selected, setSelected] = useState<Pet | null>(null)
  const { closing, dismiss } = useAnimatedDismiss()
  const closeButton = useRef<HTMLButtonElement>(null)
  const triggerButton = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      triggerButton.current?.focus()
    }
  }, [selected])
  const photo = (pet: Pet) => pet.src ?? petPlaceholder
  return <>
    <div className="pet-grid">
      {pets.map((pet) => <button className="pet-card" key={pet.name} type="button" aria-haspopup="dialog" aria-label={`View ${pet.name}, ${pet.kind.toLowerCase()}`} onClick={(event) => { triggerButton.current = event.currentTarget; setSelected(pet) }}>
        <span className={`pet-card-photo ${pet.src ? '' : 'is-placeholder'}`}><img src={photo(pet)} alt={pet.alt} loading="lazy" decoding="async"/><span className="pet-card-zoom" aria-hidden="true">↗</span></span>
        <span className="pet-card-copy"><span className="pet-kind">{pet.kind}</span><span className="pet-name">{pet.name}</span></span>
      </button>)}
    </div>
    {selected && createPortal(<div className={`pet-modal-backdrop ${closing ? 'is-closing' : ''}`} onClick={(event) => { if (event.target === event.currentTarget) dismiss(() => setSelected(null)) }} onKeyDown={(event) => { if (event.key === 'Escape') dismiss(() => setSelected(null)); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus() } }}>
      <section className="pet-modal" role="dialog" aria-modal="true" aria-labelledby="pet-modal-title" aria-describedby="pet-modal-description">
        <button ref={closeButton} className="pet-modal-close" type="button" onClick={() => dismiss(() => setSelected(null))} aria-label="Close pet details">×</button>
        <div className={`pet-modal-photo ${selected.src ? '' : 'is-placeholder'}`}><img src={photo(selected)} alt={selected.alt}/>{!selected.src && <span>PHOTO COMING SOON</span>}</div>
        <div className="pet-modal-copy"><Eyebrow>MY {selected.kind.toUpperCase()}</Eyebrow><h2 id="pet-modal-title">{selected.name}</h2>{selected.description && <div id="pet-modal-description" className="pet-modal-description">{selected.description.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}</div>
      </section>
    </div>, document.body)}
  </>
}

function HeroPhotoPreview() {
  const [open, setOpen] = useState(false)
  const { closing, dismiss } = useAnimatedDismiss()
  const closeButton = useRef<HTMLButtonElement>(null)
  const triggerButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      triggerButton.current?.focus()
    }
  }, [open])
  return <>
    <button ref={triggerButton} className="hero-photo-preview" type="button" aria-haspopup="dialog" aria-label="Preview portrait at the Robotics Research Centre" onClick={() => setOpen(true)}>
      <img src="/images/hero/portfolio-hero.webp" alt="Shandy Putra at the Robotics Research Centre" width="1350" height="1800" fetchPriority="high" decoding="async"/>
      <span className="hero-photo-zoom" aria-hidden="true">↗</span>
    </button>
    {open && createPortal(<div className={`image-preview-backdrop ${closing ? 'is-closing' : ''}`} onClick={() => dismiss(() => setOpen(false))} onKeyDown={(event) => { if (event.key === 'Escape') dismiss(() => setOpen(false)); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus() } }}>
      <section className="image-preview-dialog" role="dialog" aria-modal="true" aria-label="Portrait image preview">
        <button ref={closeButton} className="image-preview-close" type="button" onClick={() => dismiss(() => setOpen(false))} aria-label="Close image preview">×</button>
        <img src="/images/hero/portfolio-hero.webp" alt="Shandy Putra at the Robotics Research Centre"/>
        <p>Shandy Putra at the Robotics Research Centre</p>
      </section>
    </div>, document.body)}
  </>
}

function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null)
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
  const projectDismiss = useAnimatedDismiss()
  const imageDismiss = useAnimatedDismiss()
  const closeButton = useRef<HTMLButtonElement>(null)
  const triggerButton = useRef<HTMLButtonElement | null>(null)
  const previewCloseButton = useRef<HTMLButtonElement>(null)
  const previewTriggerButton = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selectedProject) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      triggerButton.current?.focus()
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    previewCloseButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previewTriggerButton.current?.focus()
    }
  }, [selectedImage])

  const openProject = (project: typeof projects[number], event: React.MouseEvent<HTMLButtonElement>) => {
    triggerButton.current = event.currentTarget
    setSelectedProject(project)
  }

  const openImagePreview = (image: ProjectImage, event: React.MouseEvent<HTMLButtonElement>) => {
    previewTriggerButton.current = event.currentTarget
    setSelectedImage(image)
  }

  return <>
    <div className="project-grid">{projects.map((project) => <button className="project-card" key={project.id} onClick={(event) => openProject(project, event)} aria-haspopup="dialog">
      <span className="project-card-icon" aria-hidden="true">{project.icon}</span>
      <span className="project-card-content"><span className="project-card-kicker">PROJECT / {project.id.toUpperCase()}</span><span className="project-card-title">{project.name}</span><span className="project-card-summary">{project.summary}</span></span>
      <span className="project-card-arrow" aria-hidden="true">↗</span>
    </button>)}</div>
    {selectedProject && createPortal(<div className={`project-modal-backdrop ${projectDismiss.closing ? 'is-closing' : ''}`} onClick={(event) => { if (event.target === event.currentTarget) projectDismiss.dismiss(() => setSelectedProject(null)) }} onKeyDown={(event) => { if (event.key === 'Escape') projectDismiss.dismiss(() => setSelectedProject(null)) }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-summary">
        <div className="project-modal-heading"><div><p className="eyebrow"><span className="eyebrow-line"/>PROJECT / {selectedProject.id.toUpperCase()}</p><h2 id="project-modal-title"><span aria-hidden="true">{selectedProject.icon}</span> {selectedProject.name}</h2><p id="project-modal-summary" className="project-modal-summary">{selectedProject.summary}</p></div><button ref={closeButton} className="project-modal-close" onClick={() => projectDismiss.dismiss(() => setSelectedProject(null))} aria-label="Close project details">×</button></div>
        <div className="project-modal-description">{selectedProject.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <div className="project-modal-gallery"><div className="project-gallery-heading"><div><p className="eyebrow"><span className="eyebrow-line"/>GALLERY</p><h3>Inside {selectedProject.name}.</h3></div><span>{selectedProject.images.length ? `${selectedProject.images.filter((image) => image.src).length} screenshots` : 'Screenshots to come'}</span></div><div className="project-image-slots" aria-label={`${selectedProject.name} screenshots`}>{selectedProject.images.length ? selectedProject.images.map((image, index) => image.src && image.alt ? <figure className={`project-image-card ${image.className ?? ''}`} key={image.src}><button className="project-image-preview-trigger" type="button" aria-haspopup="dialog" aria-label={`Preview ${image.label}`} onClick={(event) => openImagePreview(image, event)}><img className={image.className} src={image.src} alt={image.alt} loading="lazy" decoding="async"/><span className="project-image-zoom" aria-hidden="true">↗</span></button><figcaption>{image.label}</figcaption></figure> : <div className="project-image-pending" key={`pending-${index}`}><span aria-hidden="true">＋</span><span>{image.label}</span></div>) : <><div className="project-image-slot"><span aria-hidden="true">＋</span><span>App screenshot</span></div><div className="project-image-slot"><span aria-hidden="true">＋</span><span>Feature preview</span></div><div className="project-image-slot"><span aria-hidden="true">＋</span><span>More images</span></div></>}</div></div>
      </section>
    </div>, document.body)}
    {selectedImage?.src && selectedImage.alt && createPortal(<div className={`image-preview-backdrop ${imageDismiss.closing ? 'is-closing' : ''}`} onClick={() => imageDismiss.dismiss(() => setSelectedImage(null))} onKeyDown={(event) => { if (event.key === 'Escape') imageDismiss.dismiss(() => setSelectedImage(null)); if (event.key === 'Tab') { event.preventDefault(); previewCloseButton.current?.focus() } }}>
      <section className="image-preview-dialog" role="dialog" aria-modal="true" aria-label={`${selectedImage.label} image preview`}>
        <button ref={previewCloseButton} className="image-preview-close" type="button" onClick={() => imageDismiss.dismiss(() => setSelectedImage(null))} aria-label="Close image preview">×</button>
        <img className={selectedImage.className} src={selectedImage.src} alt={selectedImage.alt}/>
        <p>{selectedImage.label}</p>
      </section>
    </div>, document.body)}
  </>
}

function Home() {
  usePageMeta('Portfolio', 'Selected achievements, interests, and work from Shandy Putra.')
  const selected = achievements.filter((item) => ['international', 'olympiad', 'research'].includes(item.category)).slice(0, 3)
  return <PageFrame>
    <section className="hero" id="top">
      <div className="hero-copy"><Eyebrow>PORTFOLIO · 2026</Eyebrow><h1>Shandy<br/><span>Putra</span><sup>01</sup></h1><p className="hero-subtitle">Curious by Nature. Driven to Discover.</p></div>
      <div className="hero-photo-frame"><HeroPhotoPreview/></div>
      <div className="hero-meta"><span>SHANDY PUTRA</span><span>01 — 11 / PORTFOLIO</span></div>
    </section>

    <section className="intro section-pad" id="about">
      <Eyebrow>01 / ABOUT ME</Eyebrow><div className="intro-copy"><h2>About<br/><em>me.</em></h2><div className="about-preview"><div className="about-preview-copy">
        <p>My name is <strong>Shandy Putra</strong>, and I’m a Grade 12 student at Kharisma Bangsa School in <strong>Indonesia</strong>. My curiosity about the world began in childhood, when I enjoyed building with LEGO and exploring how things worked. I was fascinated by airplanes, particularly the <strong>Boeing 777 and Airbus A350</strong>, as well as everyday technology such as computers, smartphones, and air conditioners. What started as childhood curiosity gradually developed into a deeper interest in science, engineering, and technology.</p>
        <p>Today, I’m particularly interested in <strong>artificial intelligence, computer science, and software development.</strong> I enjoy mathematics, physics, and biology, especially when I can apply what I learn through practical projects, experimentation, and research. Participating in national and international competitions has allowed me to challenge myself, explore unfamiliar problems, and earn recognition for my work.</p>
      </div><Link className="text-link about-preview-cta" to="/about">Click to read more <span>↗</span></Link></div></div>
    </section>

    <section className="section-pad work-section" id="projects">
      <SectionTitle kicker="02 / SELECTED WORK">Projects.</SectionTitle>
      <ProjectShowcase/>
      <Link className="text-link work-detail-link" to="/projects">Open the projects page <span>↗</span></Link>
    </section>

    <section className="section-pad work-section" id="research">
      <SectionTitle kicker="03 / SELECTED WORK">Research.</SectionTitle>
      <EmptyState label="Research details pending" detail="This space is reserved for verified research details."/>
      <Link className="text-link work-detail-link" to="/research">Open the research page <span>↗</span></Link>
    </section>

    <section className="section-pad achievements-preview" id="achievements">
      <SectionTitle kicker="04 / SELECTED ACHIEVEMENTS" aside={<Link className="text-link" to="/achievements">View all achievements <span>↗</span></Link>}>Selected moments.</SectionTitle>
      <div className="highlight-list">{selected.map((item, index) => <article className="highlight-row" key={`${item.title}-${index}`}><span className="row-number">0{index + 1}</span><div><h3>{item.title}</h3>{item.detail && <p>{item.detail}</p>}</div><span className="row-year">{item.year}</span></article>)}</div>
    </section>

    <section className="section-pad interest-section" id="interests">
      <SectionTitle kicker="05 / OUTSIDE THE PAGE">Interests, in their own words.</SectionTitle>
      <div className="interest-grid">{interests.map((item) => <Link to={item.path} className={`interest-card ${item.title === 'Pets' ? 'interest-card-pets' : ''}`} key={item.path}><span className="card-number">{item.index} /</span><h3>{item.title}</h3><p>{item.note}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </section>
    <ContactCallout/>
  </PageFrame>
}

function ContactCallout() { return <section className="contact-callout" id="contact"><Eyebrow>06 / KEEP IN TOUCH</Eyebrow><h2>Have something<br/><em>in mind?</em></h2><Link className="button button-outline" to="/contact">Get in touch <span>↗</span></Link></section> }

const achievementFilters: ('all' | AchievementCategory)[] = ['all', 'olympiad', 'research', 'international', 'national', 'academic', 'badminton', 'community', 'other']
function AchievementCertificateViewer({ achievement, onClose, trigger }: { achievement: Achievement; onClose: () => void; trigger: React.RefObject<HTMLButtonElement | null> }) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const { closing, dismiss } = useAnimatedDismiss()
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      trigger.current?.focus()
    }
  }, [trigger])
  return createPortal(<div className={`certificate-backdrop ${closing ? 'is-closing' : ''}`} onClick={() => dismiss(onClose)} onKeyDown={(event) => { if (event.key === 'Escape') dismiss(onClose); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus() } }}>
    <section className="certificate-dialog" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
      <button ref={closeButton} className="certificate-close" type="button" onClick={() => dismiss(onClose)} aria-label="Close certificate viewer">×</button>
      <div className="certificate-heading"><Eyebrow>ACHIEVEMENT / {achievement.year ?? 'CERTIFICATE'}</Eyebrow><h2 id="certificate-title">{achievement.title}</h2>{achievement.detail && <p>{achievement.detail}</p>}</div>
      {achievement.certificates?.length ? <div className="certificate-gallery">{achievement.certificates.map((certificate) => <figure className="certificate-item" key={certificate.src}>
        <div className="certificate-image-frame"><img src={certificate.src} alt={certificate.label}/><div className="certificate-watermark" aria-hidden="true"><span>Shandy</span><span>Shandy</span><span>Shandy</span><span>Shandy</span><span>Shandy</span></div></div>
        <figcaption>{certificate.label}</figcaption>
      </figure>)}</div> : <div className="certificate-empty"><span aria-hidden="true">＋</span><p>No certificate for this achievement was included in the Certificates folder yet.</p></div>}
    </section>
  </div>, document.body)
}
function Achievements() {
  usePageMeta('Achievements', 'Verified competition results, academic achievements, badminton, and community activity.')
  const [filter, setFilter] = useState<'all' | AchievementCategory>('all')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const certificateTrigger = useRef<HTMLButtonElement>(null)
  const filtered = achievements
    .filter((item) => filter === 'all' || item.category === filter)
    .sort((a, b) => Number(b.year?.match(/\d{4}/)?.[0] ?? 0) - Number(a.year?.match(/\d{4}/)?.[0] ?? 0))
  return <PageFrame><PageIntro className="achievements-intro" number="01" eyebrow="THE RECORD" title={<>Earned,<br/><em>over time.</em></>} description="A curated history of my competition results, academic milestones, and key participations."/>
    <section className="section-pad records-section"><div className="filter-bar" role="group" aria-label="Filter achievements by category">{achievementFilters.map((item) => <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{categoryLabels[item]}<span>{item === 'all' ? achievements.length : achievements.filter((entry) => entry.category === item).length}</span></button>)}</div>
      <p className="result-count" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? 'record' : 'records'}</p>
      <div className="record-list">{filtered.map((item, index) => {
        const key = `${item.category}-${item.title}-${item.year}-${index}`
        const hasCertificate = Boolean(item.certificates?.length)
        const contents = <><span className="record-year">{item.year ?? '—'}</span><span className="record-copy"><span className="record-category">{categoryLabels[item.category]}</span><span className="record-title">{item.title}</span>{item.detail && <span className="record-detail">{item.detail}</span>}</span><span className={`record-mark ${hasCertificate ? 'has-certificate' : 'certificate-pending'}`} aria-hidden="true">{hasCertificate ? 'View certificate ↗' : 'Certificate pending'}</span></>
        return <button className="record-row record-row-button" key={key} type="button" aria-haspopup="dialog" aria-label={hasCertificate ? `View certificate for ${item.title}${item.year ? `, ${item.year}` : ''}` : `View ${item.title}; certificate not supplied`} onClick={(event) => { certificateTrigger.current = event.currentTarget; setSelectedAchievement(item) }}>{contents}</button>
      })}</div>
    </section>{selectedAchievement && <AchievementCertificateViewer achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} trigger={certificateTrigger}/>}</PageFrame>
}

function PageIntro({ number, eyebrow, title, description, className = '' }: { number: string; eyebrow: string; title: React.ReactNode; description: string; className?: string }) {
  return <section className={`page-intro ${className}`.trim()}><div className="page-intro-main"><BackButton/><Eyebrow>{number} / {eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></div><span className="intro-index">SP<br/>—<br/>2026</span></section>
}

function About() {
  usePageMeta('About', 'A personal introduction and background for Shandy Putra.')
  return <PageFrame><PageIntro number="02" eyebrow="ABOUT ME" title={<>About<br/><em>me.</em></>} description="A personal introduction and background, in my own words."/><section className="section-pad about-essay"><div className="about-essay-heading"><Eyebrow>IN MY OWN WORDS</Eyebrow><h2>The story<br/><em>so far.</em></h2></div><div className="about-essay-copy">
    <p>My name is <strong>Shandy Putra</strong>, and I’m a Grade 12 student at Kharisma Bangsa School in <strong>Indonesia</strong>. My curiosity about the world began in childhood, when I enjoyed building with LEGO and exploring how things worked. I was fascinated by airplanes, particularly the <strong>Boeing 777 and Airbus A350</strong>, as well as everyday technology such as computers, smartphones, and air conditioners. What started as childhood curiosity gradually developed into a deeper interest in science, engineering, and technology.</p>
    <p>Today, I’m particularly interested in <strong>artificial intelligence, computer science, and software development.</strong> I enjoy mathematics, physics, and biology, especially when I can apply what I learn through practical projects, experimentation, and research. Participating in national and international competitions has allowed me to challenge myself, explore unfamiliar problems, and earn recognition for my work.</p>
    <p>However, my journey has never been only about achievements. I believe <strong>failure is one of the most important parts of becoming better.</strong> My first badminton competition ended in a 21–0 loss. Instead of giving up, I trained harder, practised whenever I could, and continued competing. Eventually, I earned multiple podium finishes, including first place in men’s doubles and second place in men’s singles. <strong>That experience taught me that setbacks do not define my abilities; how I respond to them determines how much I can grow.</strong></p>
    <p>I carry the same mindset into academics, research, and programming. Not every idea works on the first attempt, and mistakes are inevitable when exploring something new. I see them as opportunities to identify weaknesses, refine my approach, and improve. <strong>For me, persistence means more than repeatedly trying; it means learning from each attempt and coming back better prepared.</strong></p>
    <p>Beyond academics, I enjoy aviation, modified cars, particularly <strong>Liberty Walk and Pandem designs</strong>, travelling, badminton, and spending time with my eight cats.</p>
    <p>Looking ahead, I want to explore the possibilities of AI and engineering by building useful projects, conducting research, and solving real-world problems. <strong>I’m driven by curiosity, motivated by challenges, and determined to turn every experience, including failure, into an opportunity to grow.</strong></p>
  </div></section><section className="section-pad interest-section"><SectionTitle kicker="INTERESTS">A few directions.</SectionTitle><div className="interest-grid">{interests.filter((item) => item.title !== 'Pets').map((item) => <Link to={item.path} className="interest-card" key={item.path}><span className="card-number">{item.index} /</span><h3>{item.title}</h3><p>{item.note}</p><span className="card-arrow">↗</span></Link>)}</div></section></PageFrame>
}

function ProjectsPage() {
  usePageMeta('Projects', 'Spendly and Scorly, personal projects by Shandy Putra.')
  return <PageFrame><PageIntro number="03" eyebrow="SELECTED WORK" title={<>Made<br/><em>with intent.</em></>} description="A collection of tools I’m building to make everyday tasks and learning easier."/><section className="section-pad projects-page-section"><SectionTitle kicker="PROJECTS">Built with a purpose.</SectionTitle><ProjectShowcase/></section></PageFrame>
}

type FeaturePage = { path: string; title: string; eyebrow: string; description: string; emptyTitle: string; emptyDescription: string; variant?: string; extra?: React.ReactNode; photos?: InterestPhoto[] }
function Feature({ page }: { page: FeaturePage }) {
  usePageMeta(page.title, page.description)
  return <PageFrame><PageIntro number={page.path === '/projects' ? '03' : page.path === '/research' ? '04' : '05'} eyebrow={page.eyebrow} title={<>{page.title === 'Projects' ? <>Made<br/><em>with intent.</em></> : page.title === 'Research' ? <>Questions<br/><em>worth asking.</em></> : <>{page.title}<br/><em>interest.</em></>}</>} description={page.description}/>
    {page.extra}
    {page.photos?.length ? <section className="section-pad interest-photos-section"><SectionTitle kicker="PERSONAL PHOTOGRAPHY">Collected moments.</SectionTitle><PhotoGallery photos={page.photos}/></section> : <section className="feature-body section-pad"><div className="feature-art"><ArtPanel variant={page.variant ?? 'orbital'} label={`${page.title} — visual placeholder; image coming soon.`}/></div><EmptyState label={page.emptyTitle} detail={page.emptyDescription}/></section>}</PageFrame>
}
function InterestFeature({ title, intro, empty, variant }: { title: string; intro: string; empty: string; variant: string }) {
  const photos = title === 'Automotive' ? automotivePhotos : undefined
  const path = title === 'LEGO Collection' ? '/lego' : `/${title.toLowerCase()}`
  const page: FeaturePage = { title, path, eyebrow: 'INTERESTS', description: intro, emptyTitle: empty, emptyDescription: 'No personal photos, notes, or additional verified details have been supplied yet.', variant, photos }
  return <Feature page={{...page, path: `/${title.toLowerCase()}`}}/>
}
function BadmintonFeature() {
  usePageMeta('Badminton', 'Badminton interest and verified competition results.')
  const records = achievements.filter((item) => item.category === 'badminton')
  return <PageFrame><PageIntro number="08" eyebrow="INTERESTS / BADMINTON" title={<>The game<br/><em>continues.</em></>} description="A personal interest with a record of verified competition results."/><section className="section-pad badminton-section"><SectionTitle kicker="ON AND OFF THE COURT">A few winning moments.</SectionTitle><PhotoGallery photos={badmintonPhotos}/><div className="highlight-list badminton-records">{records.map((item, index) => <article className="highlight-row" key={item.title + index}><span className="row-number">0{index + 1}</span><div><h3>{item.title}</h3>{item.detail && <p>{item.detail}</p>}</div><span className="row-year">{item.year}</span></article>)}</div></section></PageFrame>
}
function Contact() {
  usePageMeta('Contact', 'Contact Shandy Putra.')
  return <PageFrame><PageIntro number="11" eyebrow="CONTACT" title={<>Start a<br/><em>conversation.</em></>} description="For admissions, competition, school, or collaboration enquiries."/><section className="section-pad contact-body"><Eyebrow>FIND ME ONLINE</Eyebrow><div className="contact-cards"><a className="contact-card" href="https://www.instagram.com/s_pratama26/" target="_blank" rel="noreferrer" aria-label="Instagram profile @s_pratama26, opens in a new tab"><span className="contact-card-kicker">01 / SOCIAL</span><span className="contact-card-title">Instagram</span><span className="contact-card-detail">@s_pratama26</span><span className="contact-card-arrow" aria-hidden="true">↗</span></a><div className="contact-card contact-card-upcoming"><span className="contact-card-kicker">02 / NETWORK</span><span className="contact-card-title">LinkedIn</span><span className="contact-card-detail">Coming soon</span><span className="contact-card-status">SOON</span></div></div></section></PageFrame>
}
function Aviation() {
  usePageMeta('Aviation', 'A personal journal about the aircraft that have inspired Shandy Putra since childhood.')
  return <PageFrame><PageIntro number="05" eyebrow="INTERESTS" title={<>Aviation<br/><em>fascination.</em></>} description="A lifelong curiosity about the aircraft that connect our world."/><section className="section-pad aviation-section">
    <SectionTitle kicker="AIRCRAFT & AVIATION" aside={<p className="aviation-supporting-text">From commercial airliners I've admired since childhood to advanced aircraft that push the boundaries of engineering, each has something that captures my curiosity.</p>}>Aircraft That Inspire Me.</SectionTitle>
    <PhotoGallery photos={aviationAircraft} className="aviation-photo-gallery"/>
  </section></PageFrame>
}
function Travel() {
  usePageMeta('Travel', 'A travel journal arranged in the order of each destination.')
  return <PageFrame><PageIntro number="09" eyebrow="INTERESTS / TRAVEL" title={<>A few<br/><em>places.</em></>} description="A travel journal arranged in order, with a few moments from each stop."/><section className="section-pad travel-section"><div className="travel-intro"><Eyebrow>THE JOURNAL</Eyebrow><p>Roaming the world, one destination at a time.</p></div><ol className="travel-list">{travelStops.map((stop) => <li className="travel-stop" key={stop.number}><div className="travel-stop-copy"><span className="travel-number">{stop.number} / DESTINATION</span><h2>{stop.title}</h2></div>{stop.photos.length ? <PhotoGallery photos={stop.photos} className="travel-photo-gallery"/> : <div className="travel-photo-slot travel-photo-pending"><span>LOMBOK PHOTOS</span><span className="travel-photo-mark">＋</span><p>Photo Coming Soon.</p></div>}</li>)}</ol></section></PageFrame>
}
function PetsPage() {
  usePageMeta('Pets', 'Meet Shandy Putra’s cats and dog.')
  return <PageFrame><PageIntro number="10" eyebrow="AT HOME / PETS" title={<>Meet my<br/><em>pets.</em></>} description="The cats and dog who make home feel like home."/><section className="section-pad pets-page-section"><SectionTitle kicker="THE WHOLE CREW">My Pets.</SectionTitle><PetGallery/></section></PageFrame>
}
function LegoCollectionPage() {
  usePageMeta('LEGO Collection', 'LEGO Technic sets and details from Shandy Putra’s collection.')
  const [selected, setSelected] = useState<LegoSet | null>(null)
  const { closing, dismiss } = useAnimatedDismiss()
  const closeButton = useRef<HTMLButtonElement>(null)
  const triggerButton = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      triggerButton.current?.focus()
    }
  }, [selected])
  const closePreview = () => dismiss(() => setSelected(null))
  return <PageFrame><PageIntro number="06" eyebrow="INTERESTS / LEGO COLLECTION" title={<>Built with<br/><em>precision.</em></>} description="A closer look at four LEGO Technic supercars in my collection."/><section className="section-pad lego-section"><SectionTitle kicker="THE COLLECTION">Engineering in bricks.</SectionTitle>
    <div className="lego-list">{legoSets.map((set) => <article className="lego-entry" key={set.number}>
      <button className="lego-card" type="button" aria-haspopup="dialog" aria-label={`Open photo gallery for ${set.name}, set ${set.number}`} onClick={(event) => { triggerButton.current = event.currentTarget; setSelected(set) }}>
        <span className="lego-card-image"><img src={set.image} alt={set.alt} loading="lazy" decoding="async"/><span className="lego-card-zoom" aria-hidden="true">↗</span></span>
        <span className="lego-card-title"><span className="lego-card-set">LEGO TECHNIC / {set.number}</span><span className="lego-card-name">{set.name}</span></span>
      </button>
      <div className="lego-copy"><div className="lego-specs"><span><small>AGE</small>{set.age}</span><span><small>PIECES</small>{set.pieces}</span></div><p>{set.description}</p><span className="lego-gallery-hint">OPEN SET GALLERY <span aria-hidden="true">↗</span></span></div>
    </article>)}</div>
  </section>{selected && createPortal(<div className={`lego-modal-backdrop ${closing ? 'is-closing' : ''}`} onClick={closePreview} onKeyDown={(event) => { if (event.key === 'Escape') closePreview(); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus() } }}>
    <section className="lego-modal" role="dialog" aria-modal="true" aria-labelledby="lego-modal-title" aria-describedby="lego-modal-description">
      <button ref={closeButton} className="pet-modal-close" type="button" onClick={closePreview} aria-label="Close LEGO gallery">×</button>
      <img className="lego-modal-image" src={selected.image} alt={selected.alt}/>
      <div className="lego-modal-copy"><Eyebrow>LEGO TECHNIC / SET {selected.number}</Eyebrow><h2 id="lego-modal-title">{selected.name}</h2><div className="lego-specs"><span><small>AGE</small>{selected.age}</span><span><small>PIECES</small>{selected.pieces}</span></div><p id="lego-modal-description">{selected.description}</p><span className="lego-gallery-hint">OFFICIAL PRODUCT IMAGE</span></div>
    </section>
  </div>, document.body)}</PageFrame>
}
function NotFound() { usePageMeta('Page not found', 'This page could not be found.'); return <PageFrame><section className="not-found"><BackButton fallback="/"/><Eyebrow>404 / NOT FOUND</Eyebrow><h1>This page<br/><em>isn’t here.</em></h1><Link className="button button-primary" to="/">Return home <span>↗</span></Link></section></PageFrame> }

const featurePages: Record<string, Omit<FeaturePage, 'path'>> = {
  '/research': { title: 'Research', eyebrow: 'SELECTED WORK', description: 'Research questions and outputs, gathered in one place.', emptyTitle: 'Research details coming later', emptyDescription: 'No research titles, questions, methods, or publication details have been supplied yet.', variant: 'research' },
}
function RoutedSite() {
  const navigate = useNavigate()
  const goBack = (fallback: string) => {
    navigate(fallback, { replace: true })
  }
  const work = (path: string) => <Feature page={{ ...featurePages[path], path } as FeaturePage}/>
  return <NavigationHistoryContext.Provider value={{ goBack }}><ScrollManager/><ScrollReveals/><RefreshHomeRedirect/><Routes>
    <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/achievements" element={<Achievements/>}/>
    <Route path="/projects" element={<ProjectsPage/>}/><Route path="/research" element={work('/research')}/>
    <Route path="/automotive" element={<InterestFeature title="Automotive" intro="An interest in automotive." empty="Automotive notes and images coming later" variant="automotive"/>}/>
    <Route path="/aviation" element={<Aviation/>}/>
    <Route path="/badminton" element={<BadmintonFeature/>}/>
    <Route path="/travel" element={<Travel/>}/><Route path="/pets" element={<PetsPage/>}/>
    <Route path="/technology" element={<InterestFeature title="Technology" intro="An interest in technology." empty="Technology notes coming later" variant="technology"/>}/>
    <Route path="/lego" element={<LegoCollectionPage/>}/>
    <Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></NavigationHistoryContext.Provider>
}

export default function App() { return <BrowserRouter><a href="#main-content" className="skip-link">Skip to content</a><RoutedSite/></BrowserRouter> }
