import { IconType } from "react-icons";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


export interface JournalsAnalysisItem {
    name: string;
    image: string;
    number: string;
    text: string;
}

export const JournalsAnalysisData: JournalsAnalysisItem[] = [
    {
        name: "Total Journals",
        image: "/images/ReportsandAnalytics/vector5.svg",
        number: "1,208",
        text: "Submitted"
    },
    {
        name: "Common Symptom",
        image: "/images/ReportsandAnalytics/vector6.svg",
        number: "Headache",
        text: "Submitted by 150+ users"
    }
];

export interface JournalItem {
    id: number;
    date: string;
    name: string;
    session: string;
    feedback: string;
    symptom: string;
    status: string;
    icon: IconType;
}

export const JournalData: JournalItem[] = [
    {
        id: 1,
        date: "Mar 10, 2024",
        name: "John Doe",
        session: "01",
        feedback: "Feeling better than yesterday, mild headache.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 2,
        date: "Mar 11, 2024",
        name: "Emma",
        session: "02",
        feedback: "Chest feels tight, slight shortness of breath.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 3,
        date: "Mar 12, 2024",
        name: "Emma",
        session: "03",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 4,
        date: "Mar 13, 2024",
        name: "Mark Smith",
        session: "04",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 5,
        date: "Mar 14, 2024",
        name: "John Doe",
        session: "05",
        feedback: "Feeling better than yesterday, mild headache.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 6,
        date: "Mar 15, 2024",
        name: "Emma",
        session: "06",
        feedback: "Chest feels tight, slight shortness of breath.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 7,
        date: "Mar 16, 2024",
        name: "Emma",
        session: "07",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 8,
        date: "Mar 17, 2024",
        name: "Mark Smith",
        session: "08",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 9,
        date: "Mar 18, 2024",
        name: "John Doe",
        session: "09",
        feedback: "Feeling better than yesterday, mild headache.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 10,
        date: "Mar 19, 2024",
        name: "Emma",
        session: "10",
        feedback: "Chest feels tight, slight shortness of breath.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 11,
        date: "Mar 20, 2024",
        name: "Emma",
        session: "11",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 12,
        date: "Mar 21, 2024",
        name: "Mark Smith",
        session: "12",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 13,
        date: "Mar 22, 2024",
        name: "John Doe",
        session: "13",
        feedback: "Feeling better than yesterday, mild headache.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 14,
        date: "Mar 23, 2024",
        name: "Emma",
        session: "14",
        feedback: "Chest feels tight, slight shortness of breath.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 15,
        date: "Mar 24, 2024",
        name: "Emma",
        session: "15",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 16,
        date: "Mar 25, 2024",
        name: "Mark Smith",
        session: "16",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 17,
        date: "Mar 26, 2024",
        name: "John Doe",
        session: "17",
        feedback: "Feeling better than yesterday, mild headache.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 18,
        date: "Mar 27, 2024",
        name: "Emma",
        session: "18",
        feedback: "Chest feels tight, slight shortness of breath.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 19,
        date: "Mar 28, 2024",
        name: "Emma",
        session: "19",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Active",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 20,
        date: "Mar 29, 2024",
        name: "Mark Smith",
        session: "20",
        feedback: "Eye irritation persists, especially outdoors.",
        symptom: "Sinus Pressure",
        status: "Blocked",
        icon: HiOutlineDotsHorizontal,
    },
];

export interface JournalModalItem {
    id: number;
    title: string;
    titleone: string;
    date: string;
    image: string;
    name: string;
    email: string;
    uid: string;
    joined: string;
    label: string;
    text: string;
    word: string;
    labelone: string;
    array: {
        symptom: string;
        severity: string;
        tag: string;
    }[];
}

export const JournalModalData: JournalModalItem[] = [
    {
        id: 1,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "John Doe",
        uid: "U-101",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 2,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-102",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 3,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-103",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 4,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-104",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 5,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-105",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 6,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-106",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 7,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-107",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 8,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-108",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 9,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-109",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 10,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-110",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 11,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-111",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 12,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-112",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 13,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-113",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 14,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-114",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 15,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-115",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 16,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-116",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 17,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-117",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 18,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-118",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 19,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-119",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    },
    {
        id: 20,
        title: "Journal Entry -",
        titleone: "John Doe",
        date: "April 10, 2025 at 9:12 AM",
        image: "/images/Rewards/person.svg",
        name: "Marilyn Herwitz",
        uid: "U-120",
        joined: "Feb 25, 2025",
        email: "email@email.com",
        label: "Feedback",
        text: "Feeling better than yesterday. Still had some pressure near the nose but it was manageable. Took supplements in the morning. Slept better last night. No coughing or wheezing.",
        word: "134 words",
        labelone: "Symptom Summary",
        array: [
            {
                symptom: "Sinus Pressure",
                severity: "06",
                tag: "Moderate",
            },
            {
                symptom: "Headache",
                severity: "03",
                tag: "Low",
            },
            {
                symptom: "Sleep Quality",
                severity: "-",
                tag: "Improved",
            }
        ]
    }
];