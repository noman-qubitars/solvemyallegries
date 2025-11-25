import { StaticImageData } from "next/image";
import Card from "../../../public/images/card.svg";
import Card_one from "../../../public/images/card_one.svg";
import Card_two from "../../../public/images/card_two.svg";
import Card_three from "../../../public/images/card_three.svg";
import Quote_top from "../../../public/images/quote_white_top.svg";
import Quote_bottom from "../../../public/images/quote_white_bottom.svg";
import { BsArrowUpRight } from "react-icons/bs";
import Case from "../../../public/images/case.svg";
import Case_one from "../../../public/images/case_one.svg";
import Case_two from "../../../public/images/case_two.svg";
import Quote from "../../../public/images/quote.svg";
import Star from "../../../public/images/star.svg";
import Person from "../../../public/images/test.svg";
import Person_one from "../../../public/images/test_one.svg";
import Person_two from "../../../public/images/test_two.svg";
import Case_study from '../../../public/images/casestudyone.png';
import Case_study_one from "../../../public/images/casestudy.png";
import Case_study_two from '../../../public/images/casestudytwo.png';

export interface Landing {
  id: string;
  image: StaticImageData;
  title: string;
  desp: string;
}

export const appfeatures: Landing[] = [
  {
    id: "1",
    image: Card,
    title: "Contextual Nudges",
    desp: "Mindfulness reminders to enchance daily focus.",
  },
  {
    id: "2",
    image: Card_one,
    title: "Sentiment Analysis Interface",
    desp: "Track daily mood to measure impact.",
  },
  {
    id: "3",
    image: Card_two,
    title: "Dynamic Onboarding Pathways",
    desp: "Personalized yoga plans tailored for you.",
  },
  {
    id: "4",
    image: Card_three,
    title: "Data-Driven Dashboards",
    desp: "Visualize progress through intuitive data charts.",
  },
  {
    id: "5",
    image: Card,
    title: "Contextual Nudges",
    desp: "Mindfulness reminders to enchance daily focus.",
  },
  {
    id: "6",
    image: Card_one,
    title: "Sentiment Analysis Interface",
    desp: "Track daily mood to measure impact.",
  },
  {
    id: "7",
    image: Card_two,
    title: "Dynamic Onboarding Pathways",
    desp: "Personalized yoga plans tailored for you.",
  },
  {
    id: "8",
    image: Card_three,
    title: "Data-Driven Dashboards",
    desp: "Visualize progress through intuitive data charts.",
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  bullets: string[];
  titles: string;
  sessions: { name: string; description: string }[];
  impact: { title: string; description: string };
  outcome: { title: string; description: string };
  review: {
    image: StaticImageData;
    view: string;
    vector: React.FC;
    person: string;
    imageone: StaticImageData;
    quote: string;
    imagetwo: StaticImageData;
  };
}

export const casestudy: CaseStudy[] = [
  {
    id: "1",
    title: "CHALLENGES",
    bullets: [
      "Congestion from pet dander",
      "Constant Sneezing",
      "Watery eyes",
      "Itchy eyes",
      "Sneezing",
      "Coughing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Log daily symptoms and allergens (pet dander).",
      },
      {
        name: "SESSION 1",
        description: "Video-based breathing exercises to reduce congestion.",
      },
      {
        name: "SESSION 2",
        description:
          "Home allergen-proofing techniques, focusing on reducing pet dander exposure.",
      },
      {
        name: "SESSION 3",
        description:
          "Mindfulness sessions for stress management and symptom relief.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Because of pet dander, James experienced reduced productivity and worsened quality of life.",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "He experienced a noticeable reduction in symptoms, allowing him to breathe freely and focus better at work.",
    },
    review: {
      image: Case,
      view: "View detail",
      vector: BsArrowUpRight,
      person: "JAMES'S REVIEW",
      imageone: Quote_top,
      quote:
        "App helped clear my congestion and boosted my productivity at work. Simple exercises and allergen tips made a big difference!",
      imagetwo: Quote_bottom,
    },
  },
  {
    id: "2",
    title: "CHALLENGES",
    bullets: [
      "Dust mites allergy",
      "Fatigue",
      "Throat irritation",
      "Low energy level",
      "Sinus congestion",
      "Sneezing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Guided mindfulness and breathing exercises reduced sinus pressure.",
      },
      {
        name: "SESSION 1",
        description: "Tapping therapy videos helped alleviate fatigue.",
      },
      {
        name: "SESSION 2",
        description:
          "Educational videos on dust-mite-proofing her home improved her environment.",
      },
      {
        name: "SESSION 3",
        description:
          "Advanced modules for sustained lifestyle changes, including nutrition and exercise tips.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Due to dust mites allergy Emily reduced work productivity and difficulty maintaining focus.",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "Emily reported a 70% improvement in energy levels within three weeks.",
    },
    review: {
      image: Case_one,
      view: "View detail",
      vector: BsArrowUpRight,
      person: "Emily's review",
      imageone: Quote_top,
      quote:
        "The app's interactive sessions made symptom management simple and effective. I feel like a new person!",
      imagetwo: Quote_bottom,
    },
  },
  {
    id: "3",
    title: "CHALLENGES",
    bullets: [
      "Severe grass allergies",
      "Sinus issues",
      "Fatigue",
      "Headaches",
      "Itchy eyes",
      "Sneezing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Identify grass pollen triggers and log symptoms.",
      },
      {
        name: "SESSION 1",
        description: "Tapping and mindfulness activities to alleviate headaches.",
      },
      {
        name: "SESSION 2",
        description:
          "Outdoor management tips and reducing pollen exposure (e.g., wearing masks)",
      },
      {
        name: "SESSION 3",
        description:
          "Nutritional advice and hydration techniques to improve symptom resilience.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Due to sever grass allergies she missed outdoor activities, constant discomfort",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "Lisa's headaches were alleviated, and her outdoor activities became more enjoyable without significant symptoms.",
    },
    review: {
      image: Case_two,
      view: "View detail",
      vector: BsArrowUpRight,
      person: "Lisa's review",
      imageone: Quote_top,
      quote:
        "Thanks to SolveMyAllergies, I can enjoy outdoor activities again without the constant headaches. The app's personalized tips have made a huge difference in my life!",
      imagetwo: Quote_bottom,
    },
  },
];

export interface Testimonials {
  id: string;
  image: StaticImageData;
  imagestar: StaticImageData;
  ranking: string;
  rating: string;
  desp: string;
  imageperson: StaticImageData;
  author: string;
}

export const testimonials: Testimonials[] = [
  {
    id: "1",
    image: Quote,
    imagestar: Star,
    ranking: "4.9",
    rating: "Rating",
    desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    imageperson: Person,
    author: "ALFREDO WORKMAN",
  },
  {
    id: "2",
    image: Quote,
    imagestar: Star,
    ranking: "4.9",
    rating: "Rating",
    desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    imageperson: Person_one,
    author: "ANN VACCARO",
  },
  {
    id: "3",
    image: Quote,
    imagestar: Star,
    ranking: "4.9",
    rating: "Rating",
    desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    imageperson: Person_two,
    author: "EMERY GEIDT",
  },
];

export interface FAQ {
  id: string;
  title: string;
  subtitle: string;
  desp: string;
}

export const faq: FAQ[] = [
  {
    id: "1",
    title: "What is the SaveMyAllergies app about?",
    subtitle: "What is a SolveMyAllergies App about?",
    desp: "SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.",
  },
  {
    id: "2",
    title: "How do I start using SaveMyAllergies?",
    subtitle: "How do I start using SaveMyAllergies?",
    desp: "Begin by creating an account, completing the intake form, and uploading any optional lab information. You’ll then receive a personalized healing program within 24-48 hours.",
  },
  {
    id: "3",
    title: "What is included in the personalized healing program?",
    subtitle: "What is included in the personalized healing program?",
    desp: "Your healing program includes tailored supplements, specific healing sessions, and recommendations for additional supportive modules based on your symptoms",
  },
  {
    id: "4",
    title: "Can I directly contact with my practitioner?",
    subtitle: "Can I directly contact with my practitioner?",
    desp: "Yes, you can message your practitioner and receive feedback on your healing progress through the app.",
  },
  {
    id: "5",
    title: "What types of purchases are recommended in the app?",
    subtitle: "What types of purchases are recommended in the app?",
    desp: "SaveMyAllergies may recommend supplements, tools like the acupoint laser, and other modules to support your healing.",
  },
  {
    id: "6",
    title: "How are rewards unlocked in App?",
    subtitle: "How are rewards unlocked in App?",
    desp: "Rewards are unlocked by reaching milestones, such as achieving a reduction in symptom intensity. You can use these rewards for discounts on future purchases.",
  },
  {
    id: "7",
    title: "Are my personal and medical details secure?",
    subtitle: "Are my personal and medical details secure?",
    desp: "Yes, your personal information is securely stored and only accessed by your practitioner as needed for your healing program.",
  },
  {
    id: "8",
    title: "How can I track my progress",
    subtitle: "How can I track my progress?",
    desp: "Use the sessions calendar to log symptoms, track supplements, and review your symptom history. Your practitioner also monitors your progress regularly.",
  },
];

export interface CaseStudyPage {
  id: string;
  maintitle: string;
  title: string;
  bullets: string[];
  titles: string;
  sessions: { name: string; description: string }[];
  impact: { title: string; description: string };
  outcome: { title: string; description: string };
  review: {
    image: StaticImageData;
    view: string;
    person: string;
    imageone: StaticImageData;
    quote: string;
    imagetwo: StaticImageData;
  };
  intro: string;
  introdesp: string;
  problem: string;
  problemdesp: string;
  image: StaticImageData;
  solution: string;
  solutiondesp: string;
  session: string;
  sessiondesp: string;
  result: string;
  resultdesp: string;
}

export const casestudypage: CaseStudyPage[] = [
  {
    id: "1",
    maintitle: "CASE STUDY - Congestion from pet dander",
    title: "CHALLENGES",
    bullets: [
      "Congestion from pet dander",
      "Constant Sneezing",
      "Watery eyes",
      "Itchy eyes",
      "Sneezing",
      "Coughing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Log daily symptoms and allergens (pet dander).",
      },
      {
        name: "SESSION 1",
        description: "Video-based breathing exercises to reduce congestion.",
      },
      {
        name: "SESSION 2",
        description:
          "Home allergen-proofing techniques, focusing on reducing pet dander exposure.",
      },
      {
        name: "SESSION 3",
        description:
          "Mindfulness sessions for stress management and symptom relief.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Because of pet dander, James experienced reduced productivity and worsened quality of life.",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "He experienced a noticeable reduction in symptoms, allowing him to breathe freely and focus better at work.",
    },
    review: {
      image: Case,
      view: "View detail",
      person: "JAMES'S REVIEW",
      imageone: Quote_top,
      quote:
        "App helped clear my congestion and boosted my productivity at work. Simple exercises and allergen tips made a big difference!",
      imagetwo: Quote_bottom,
    },
    intro: "Introduction",
  introdesp:
    "Emily, a 32-year-old marketing professional, often experienced extreme fatigue and sinus congestion, which disrupted her daily activities. Despite consulting doctors and trying medications, she couldn't pinpoint triggers. Emily turned to SolveMyAllergies, hoping for a structured, tech-driven solution.",
  problem: "Problem Statement",
  problemdesp: `Emily's key challenges included:
    - **Main Allergen:** Dust mites.
    - **Symptoms:** Fatigue, sinus pressure, and throat irritation, worsening during seasonal changes.
    - **Impact:** Reduced work productivity and difficulty maintaining focus.`,
  image: Case_study,
  solution: "Solution (Role of SolveMyAllergies)",
  solutiondesp: `Emily leveraged the app's tailored programs and video-based sessions to address her issues:
    1. **Symptom Logging:**
        - Emily logged daily symptoms, including severity and triggers.
        - The app customized her allergy profile based on her responses.
    2. **Video-Based Activities:**
        - **Session 1:** Guided mindfulness and breathing exercises reduced sinus pressure.
        - **Session 2:** Tapping therapy videos helped alleviate fatigue.
        - **Session 3:** Educational videos on dust-mite-proofing her home improved her environment.
    3. **Session Insights:**
        - Personalized adjustments to her daily habits, such as protein-rich breakfasts and dust-mite prevention strategies, were incorporated.`,
  session: "Session Plan Overview",
  sessiondesp: `
      - **Week 1:** Identification and preparation (logging and environment adjustments).
      - **Week 2-4:** Video-based breathing, tapping, and mindfulness activities to reduce symptoms.
      - **Week 5-6:** Advanced modules for sustained lifestyle changes, including nutrition and exercise tips.`,
  result: "Outcome/Results",
  resultdesp: `
      - **Energy Boost:** Emily reported a 70% improvement in energy levels within three weeks.
      - **Symptom Relief:** Reduced sinus congestion and throat irritation, allowing medication-free days.
      - **Lifestyle Change:** Gained confidence in managing her environment and daily routines.`,
  },
  {
    id: "2",
    maintitle: "CASE STUDY - extreme fatigue and sinus congestion",
    title: "CHALLENGES",
    bullets: [
      "Dust mites allergy",
      "Fatigue",
      "Throat irritation",
      "Low energy level",
      "Sinus congestion",
      "Sneezing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Guided mindfulness and breathing exercises reduced sinus pressure.",
      },
      {
        name: "SESSION 1",
        description: "Tapping therapy videos helped alleviate fatigue.",
      },
      {
        name: "SESSION 2",
        description:
          "Educational videos on dust-mite-proofing her home improved her environment.",
      },
      {
        name: "SESSION 3",
        description:
          "Advanced modules for sustained lifestyle changes, including nutrition and exercise tips.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Due to dust mites allergy Emily reduced work productivity and difficulty maintaining focus.",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "Emily reported a 70% improvement in energy levels within three weeks.",
    },
    review: {
      image: Case_one,
      view: "View detail",
      person: "Emily's review",
      imageone: Quote_top,
      quote:
        "The app's interactive sessions made symptom management simple and effective. I feel like a new person!",
      imagetwo: Quote_bottom,
    },
    intro: "Introduction",
    introdesp:
      "Emily, a 32-year-old marketing professional, often experienced extreme fatigue and sinus congestion, which disrupted her daily activities. Despite consulting doctors and trying medications, she couldn't pinpoint triggers. Emily turned to SolveMyAllergies, hoping for a structured, tech-driven solution.",
    problem: "Problem Statement",
    problemdesp: `Emily's key challenges included:
      - **Main Allergen:** Dust mites.
      - **Symptoms:** Fatigue, sinus pressure, and throat irritation, worsening during seasonal changes.
      - **Impact:** Reduced work productivity and difficulty maintaining focus.`,
    image: Case_study_one,
    solution: "Solution (Role of SolveMyAllergies)",
    solutiondesp: `Emily leveraged the app's tailored programs and video-based sessions to address her issues:
      1. **Symptom Logging:**
          - Emily logged daily symptoms, including severity and triggers.
          - The app customized her allergy profile based on her responses.
  
      2. **Video-Based Activities:**
          - **Session 1:** Guided mindfulness and breathing exercises reduced sinus pressure.
          - **Session 2:** Tapping therapy videos helped alleviate fatigue.
          - **Session 3:** Educational videos on dust-mite-proofing her home improved her environment.
  
      3. **Session Insights:**
          - Personalized adjustments to her daily habits, such as protein-rich breakfasts and dust-mite prevention strategies, were incorporated.`,
    session: "Session Plan Overview",
    sessiondesp: `
        - **Week 1:** Identification and preparation (logging and environment adjustments).
        - **Week 2-4:** Video-based breathing, tapping, and mindfulness activities to reduce symptoms.
        - **Week 5-6:** Advanced modules for sustained lifestyle changes, including nutrition and exercise tips.
      `,
    result: "Outcome/Results",
    resultdesp: `
        - **Energy Boost:** Emily reported a 70% improvement in energy levels within three weeks.
        - **Symptom Relief:** Reduced sinus congestion and throat irritation, allowing medication-free days.
        - **Lifestyle Change:** Gained confidence in managing her environment and daily routines.
      `,
  },
  {
    id: "3",
    maintitle: "CASE STUDY - Severe grass allergies",
    title: "CHALLENGES",
    bullets: [
      "Severe grass allergies",
      "Sinus issues",
      "Fatigue",
      "Headaches",
      "Itchy eyes",
      "Sneezing",
    ],
    titles: "Session Plan Overview",
    sessions: [
      {
        name: "WEEK 1",
        description: "Identify grass pollen triggers and log symptoms.",
      },
      {
        name: "SESSION 1",
        description: "Tapping and mindfulness activities to alleviate headaches.",
      },
      {
        name: "SESSION 2",
        description:
          "Outdoor management tips and reducing pollen exposure (e.g., wearing masks)",
      },
      {
        name: "SESSION 3",
        description:
          "Nutritional advice and hydration techniques to improve symptom resilience.",
      },
    ],
    impact: {
      title: "IMPACT",
      description:
        "Due to sever grass allergies she missed outdoor activities, constant discomfort",
    },
    outcome: {
      title: "OUTCOME",
      description:
        "Lisa's headaches were alleviated, and her outdoor activities became more enjoyable without significant symptoms.",
    },
    review: {
      image: Case_two,
      view: "View detail",
      person: "Lisa's review",
      imageone: Quote_top,
      quote:
        "Thanks to SolveMyAllergies, I can enjoy outdoor activities again without the constant headaches. The app's personalized tips have made a huge difference in my life!",
      imagetwo: Quote_bottom,
    },
    intro: "Introduction",
    introdesp:
      "Emily, a 32-year-old marketing professional, often experienced extreme fatigue and sinus congestion, which disrupted her daily activities. Despite consulting doctors and trying medications, she couldn't pinpoint triggers. Emily turned to SolveMyAllergies, hoping for a structured, tech-driven solution.",
    problem: "Problem Statement",
    problemdesp: `Emily's key challenges included:
      - **Main Allergen:** Dust mites.
      - **Symptoms:** Fatigue, sinus pressure, and throat irritation, worsening during seasonal changes.
      - **Impact:** Reduced work productivity and difficulty maintaining focus.`,
    image: Case_study_two,
    solution: "Solution (Role of SolveMyAllergies)",
    solutiondesp: `Emily leveraged the app's tailored programs and video-based sessions to address her issues:
      1. **Symptom Logging:**
          - Emily logged daily symptoms, including severity and triggers.
          - The app customized her allergy profile based on her responses.
  
      2. **Video-Based Activities:**
          - **Session 1:** Guided mindfulness and breathing exercises reduced sinus pressure.
          - **Session 2:** Tapping therapy videos helped alleviate fatigue.
          - **Session 3:** Educational videos on dust-mite-proofing her home improved her environment.
  
      3. **Session Insights:**
          - Personalized adjustments to her daily habits, such as protein-rich breakfasts and dust-mite prevention strategies, were incorporated.`,
    session: "Session Plan Overview",
    sessiondesp: `
        - **Week 1:** Identification and preparation (logging and environment adjustments).
        - **Week 2-4:** Video-based breathing, tapping, and mindfulness activities to reduce symptoms.
        - **Week 5-6:** Advanced modules for sustained lifestyle changes, including nutrition and exercise tips.
      `,
    result: "Outcome/Results",
    resultdesp: `
        - **Energy Boost:** Emily reported a 70% improvement in energy levels within three weeks.
        - **Symptom Relief:** Reduced sinus congestion and throat irritation, allowing medication-free days.
        - **Lifestyle Change:** Gained confidence in managing her environment and daily routines.
      `,
  },
];
