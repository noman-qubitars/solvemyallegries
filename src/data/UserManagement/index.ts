import { IconType } from "react-icons";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export interface UserManagementItem {
    id: number;
    image: string;
    name: string;
    email: string;
    date: string;
    status: string;
    activity: string;
    icon: IconType;
}

export const UserManagementData: UserManagementItem[] = [
    {
        id: 1,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 2,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email1@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 3,
        image: "/images/User/person.svg",   
        name: "Marilyn Herwitz",
        email: "email2@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 4,
        image: "/images/User/person.svg",   
        name: "Marcus Bergson",
        email: "email3@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 5,
        image: "/images/User/person.svg",       
        name: "Marilyn Herwitz",
        email: "email4@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 6,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email5@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 7,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email6@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 8,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email7@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 9,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email8@email.com",
        date: "Mar 10, 2024",
        status: "Blocked",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 10,
        image: "/images/User/person.svg",
        name: "Jakob",
        email: "email9@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 11,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 12,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email1@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 13,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email2@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 14,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email3@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 15,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email4@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 16,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email5@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 17,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email6@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 18,
        image: "/images/User/person.svg",
        name: "Marcus Bergson",
        email: "email7@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 19,
        image: "/images/User/person.svg",
        name: "Marilyn Herwitz",
        email: "email8@email.com",
        date: "Mar 10, 2024",
        status: "Blocked",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: 20,
        image: "/images/User/person.svg",
        name: "Jakob",
        email: "email9@email.com",
        date: "Mar 10, 2024",
        status: "Active",
        activity: "2 Days Ago",
        icon: HiOutlineDotsHorizontal,
    }
];

export interface UserManagementDetailItem {
    array: {
        label: string;
        data: string;
    }[];
}

export const UserManagementDetailData: UserManagementDetailItem[] = [
    {
        array: [
            { label: "Full Name:", data: "Marilyn Herwitz" },
            { label: "Joined On:", data: "Mar 10, 2024" },
            { label: "Email ID:", data: "email@email.com" },
            { label: "session Days Completed:", data: "Day 9" },
            { label: "Phone Number:", data: "+33 123 45 67 89 0" },
        ]
    },
];

export interface UserManagementDetailModalItem {
    day: string;
    question: string;
    response: string;
    responseone?: string;
    answerone?: string;
    answer: string;
    questionone: string;
    array:{
        symptom: string;
        title: string;
        rating: string;
    }[];
    description?: string;
    ratingthree?: string;
    questiontwo: string;
    arrayone?: {
        title: string;
    }[];
    questionthree?: string;
    arraytwo?: {
        title: string;
    }[];
    questionfour?: string;
    arraythree?: {
        title: string;
    }[];
}

export const UserManagementDetailModalData: UserManagementDetailModalItem[] = [
    {
        day: "Day 1",
        question: "Q1: How do you feel today?",
        response: "Response",
        answer: "I feel great",
        questionone: "Q2: Please select top 3 symptoms that apply to you:",
        array: [
            {
                symptom: "Symptom 1",
                title: "Headache",
                rating: "Rating: 10",
            },
            {
                symptom: "Symptom 2",
                title: "Eye symptoms",
                rating: "Rating: 7",
            },
            {
                symptom: "Symptom 3",
                title: "Fatigue",
                rating: "Rating: 2",
            },
            {
                symptom: "Symptom 4",
                title: "Sleep Rest",
                rating: "Rating: 2",
            },
        ],
        questiontwo: "Q3: Did you take your supplements today?",
        responseone: "Response",
        answerone: "Yes",
        // description: "Previous day’s sleep and overall rest",
        // ratingthree: "Rating: 6",
        // arrayone: [
        //     {
        //         title: "Throbbing headache",
        //     },
        //     {
        //         title: "Affects vision",
        //     },
        //     {
        //         title: "Sinus headache",
        //     },
        //     {
        //         title: "Located behind eyes",
        //     }
        // ],
        // questionthree: "Q4: Did you take your supplements today?",
        // responseone: "Response",
        // answerone: "Yes",
        // arraytwo: [
        //     {
        //         title: "I feel fatigue all day",
        //     },
        //     {
        //         title: "Activities exhaust me",
        //     },
        // ],
        // questionfour: "Q5: What are your eye symptoms? Select up to 4:",
        // arraythree: [
        //     {
        //         title: "Watery",
        //     },
        //     {
        //         title: "Swollen",
        //     },
        //     {
        //         title: "Red",
        //     },
        //     {
        //         title: "Scratchy",
        //     },
        // ],
    },
];