
export interface Message {
    label: string;
    all: {
        image: string;
        name: string;
        userId: string;
        message: string;
        date: string;
        time: string;
        dot?: string;
    }[];
}

export const messages: Message[] = [
    {
        label: "Pinned",
        all: [
            {
                image: "/images/Messages/1.svg",
                name: 'John Doe',
                userId: 'User 1024',
                message: 'I am suffering from severe headache from...',
                dot: "/images/Messages/dot.svg",
                date: '7 March 2025',
                time: '12:25 AM',
            },
            {
                image: "/images/Messages/2.svg",
                name: 'Smith',
                userId: 'User 0387',
                message: 'I have submitted my reports.',
                date: '4 March 2025',
                time: '9:15 PM',
            },
            {
                image: "/images/Messages/3.svg",
                name: 'Sophia',
                userId: 'User 0278',
                message: 'I want to purchase mug. Can you tell me...',
                dot: "/images/Messages/dot.svg",
                date: '2 March 2025',
                time: '10:00 AM',
            },
        ]
    },
    {
        label: "All Messages",
        all: [
            {
                image: "/images/Messages/4.svg",
                name: 'Kadin',
                userId: 'User 1024',
                message: 'Can you guide me how can I get rid of m...',
                dot: "/images/Messages/dot.svg",
                date: '3 March 2025',
                time: '7:06 PM',
            },
            {
                image: "/images/Messages/5.svg",
                name: 'Dulce Botosh',
                userId: 'User 1024',
                message: 'Dulce Botosh is typing ...',
                date: '7 March 2025',
                time: '12:25 AM',
            },
            {
                image: "/images/Messages/6.svg",
                name: 'Maria Culhane',
                userId: 'User 0387',
                message: 'Hi, Kathy. It’s Maria here I want to discuss ab...',
                date: '4 March 2025',
                time: '9:15 PM',
            },
            {
                image: "/images/Messages/1.svg",
                name: 'Kadin',
                userId: 'User 1024',
                message: 'Can you guide me how can I get rid of m...',
                date: '3 March 2025',
                time: '7:06 PM',
            },
            {
                image: "/images/Messages/2.svg",
                name: 'Maria Culhane',
                userId: 'User 0387',
                message: 'Hi, Kathy. It’s Maria here I want to discuss ab...',
                date: '4 March 2025',
                time: '9:15 PM',
            },
        ]
    },
    {
        label: "Read",
        all: [
            {
                image: "/images/Messages/1.svg",
                name: 'Kadin',
                userId: 'User 1024',
                message: 'Can you guide me how can I get rid of m...',
                date: '3 March 2025',
                time: '7:06 PM',
            },
            {
                image: "/images/Messages/2.svg",
                name: 'Dulce Botosh',
                userId: 'User 1024',
                message: 'Dulce Botosh is typing ...',
                date: '7 March 2025',
                time: '12:25 AM',
            },
            {
                image: "/images/Messages/3.svg",
                name: 'Maria Culhane',
                userId: 'User 0387',
                message: 'Hi, Kathy. It’s Maria here I want to discuss ab...',
                date: '4 March 2025',
                time: '9:15 PM',
            },
            {
                image: "/images/Messages/4.svg",
                name: 'Kadin',
                userId: 'User 1024',
                message: 'Can you guide me how can I get rid of m...',
                date: '3 March 2025',
                time: '7:06 PM',
            },
            {
                image: "/images/Messages/5.svg",
                name: 'Maria Culhane',
                userId: 'User 0387',
                message: 'Hi, Kathy. It’s Maria here I want to discuss ab...',
                date: '4 March 2025',
                time: '9:15 PM',
            },
        ]
    },
    {
        label: "Unread",
        all: [
            {
                image: "/images/Messages/1.svg",
                name: 'Kadin',
                userId: 'User 1024',
                message: 'Can you guide me how can I get rid of m...',
                dot: "/images/Messages/dot.svg",
                date: '3 March 2025',
                time: '7:06 PM',
            },
            {
                image: "/images/Messages/2.svg",
                name: 'Dulce Botosh',
                userId: 'User 1024',
                message: 'Dulce Botosh is typing ...',
                dot: "/images/Messages/dot.svg",
                date: '7 March 2025',
                time: '12:25 AM',
            },
            {
                image: "/images/Messages/3.svg",
                name: 'Maria Culhane',
                userId: 'User 0387',
                message: 'Hi, Kathy. It’s Maria here I want to discuss ab...',
                dot: "/images/Messages/dot.svg",
                date: '4 March 2025',
                time: '9:15 PM',
            },
        ]
    },

];
