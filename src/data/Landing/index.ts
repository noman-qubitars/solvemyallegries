import { StaticImageData } from "next/image";
import Card from "../../../public/images/card.svg";
import Card_one from "../../../public/images/card_one.svg";
import Card_two from "../../../public/images/card_two.svg";
import Card_three from "../../../public/images/card_three.svg";

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
  }
];