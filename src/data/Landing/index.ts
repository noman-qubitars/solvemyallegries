import { StaticImageData } from "next/image";
import Card from "../../../public/images/card.svg";
import Card_one from "../../../public/images/card_one.svg";
import Card_two from "../../../public/images/card_two.svg";
import Card_three from "../../../public/images/card_three.svg";
import Quote_top from "../../../public/images/quote_white_top.svg";
import Quote_bottom from "../../../public/images/quote_white_bottom.svg";
import { BsArrowUpRight } from "react-icons/bs";
import Case from "../../../public/images/case.svg";
import Quote from "../../../public/images/quote.svg";
import Star from "../../../public/images/star.svg";
import Person from "../../../public/images/test.svg";
import Person_one from "../../../public/images/test_one.svg";
import Person_two from "../../../public/images/test_two.svg";
import { IoIosArrowForward } from "react-icons/io";


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
    id: "3",
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
    author: 'ALFREDO WORKMAN'
  },
  {
    id: "2",
    image: Quote,
    imagestar: Star,
    ranking: "4.9",
    rating: "Rating",
    desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    imageperson: Person_one,
    author: 'ANN VACCARO'
  },
  {
    id: "3",
    image: Quote,
    imagestar: Star,
    ranking: "4.9",
    rating: "Rating",
    desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    imageperson: Person_two,
    author: 'EMERY GEIDT'
  },
];

export interface FAQ {
  id: string;
  title: string;
  vector: React.FC;
  subtitle: string;
  desp: string;
}

export const faq: FAQ[] = [
  {
    id: "1",
    title: 'What is the SaveMyAllergies app about?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "2",
    title: 'How do I start using SaveMyAllergies?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App abouts?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "3",
    title: 'What is included in the personalized healing program?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "4",
    title: 'Can I directly contact with my practitioner?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "5",
    title: 'What types of purchases are recommended in the app?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "6",
    title: 'How are rewards unlocked in App?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "7",
    title: 'Are my personal and medical details secure?',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
  {
    id: "8",
    title: 'How can I track my progress',
    vector: IoIosArrowForward,
    subtitle: 'What is a SolveMyAllergies App about?',
    desp: 'SaveMyAllergies provides personalized tools, sessions, and support to help manage allergies and improve wellness through practitioner guidance.'
  },
];
