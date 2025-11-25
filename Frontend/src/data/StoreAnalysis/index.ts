import { IconType } from "react-icons";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdArrowUp } from "react-icons/io";
import { IoArrowDownOutline } from "react-icons/io5";

export interface StoreAnalysisItem {
    label: string;
}

export const StoreAnalysisBtnData: StoreAnalysisItem[] = [
    {
        label: "Products",
    },
    {
        label: "Orders",
    },
    {
        label: "Sales",
    },
    {
        label: "Inventory",
    },
    {
        label: "Reviews",
    }
];

export interface StoreItem {
    image: string;
    name: string;
    price: string;
    stock: string;
    supplemts: string;
    btn: {
        title: string;
    }[];
}

export const StoreAnalysisData: StoreItem[] = [
    {
        image: "/images/StoreAnalysis/1.svg",
        name: "Omega-3 Capsules",
        price: "$24.99",
        stock: "120 in stock",
        supplemts: "Supplements",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/2.svg",
        name: "Hair Analysis Kit",
        price: "$48.99",
        stock: "40 in stock",
        supplemts: "Hair Analysis",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/3.svg",
        name: "T-Shirt",
        price: "$19.99",
        stock: "75 in stock",
        supplemts: "T-shirts",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/4.svg",
        name: "Coffee Mug",
        price: "$12.99",
        stock: "100 in stock",
        supplemts: "Coffee Mugs",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/1.svg",
        name: "Omega-3 Capsules",
        price: "$24.99",
        stock: "120 in stock",
        supplemts: "Supplements",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/2.svg",
        name: "Hair Analysis Kit",
        price: "$48.99",
        stock: "40 in stock",
        supplemts: "Hair Analysis",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/3.svg",
        name: "T-Shirt",
        price: "$19.99",
        stock: "75 in stock",
        supplemts: "T-shirts",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/4.svg",
        name: "Coffee Mug",
        price: "$12.99",
        stock: "100 in stock",
        supplemts: "Coffee Mugs",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/2.svg",
        name: "Hair Analysis Kit",
        price: "$48.99",
        stock: "40 in stock",
        supplemts: "Hair Analysis",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/1.svg",
        name: "Omega-3 Capsules",
        price: "$24.99",
        stock: "120 in stock",
        supplemts: "Supplements",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/3.svg",
        name: "T-Shirt",
        price: "$19.99",
        stock: "75 in stock",
        supplemts: "T-shirts",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/4.svg",
        name: "Coffee Mug",
        price: "$12.99",
        stock: "100 in stock",
        supplemts: "Coffee Mugs",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/1.svg",
        name: "Omega-3 Capsules",
        price: "$24.99",
        stock: "120 in stock",
        supplemts: "Supplements",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/2.svg",
        name: "Hair Analysis Kit",
        price: "$48.99",
        stock: "40 in stock",
        supplemts: "Hair Analysis",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/3.svg",
        name: "T-Shirt",
        price: "$19.99",
        stock: "75 in stock",
        supplemts: "T-shirts",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
    {
        image: "/images/StoreAnalysis/4.svg",
        name: "Coffee Mug",
        price: "$12.99",
        stock: "100 in stock",
        supplemts: "Coffee Mugs",
        btn: [
            { title: "Edit" },
            { title: "Active" }
        ]
    },
]; 

export interface StoresOrdersItem {
    user: string;
    name: string;
    earned: string;
    redeem: string;
    shared: string;
    balance: string;
    action: string;
    date: string;
}

export const StoreOrdersData: StoresOrdersItem[] = [
    {
        user: "#ORD231",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Delivered",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD232",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Processing",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD233",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Shipped",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD234",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Cancelled",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD235",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Delivered",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD236",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Processing",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD237",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Shipped",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD238",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Cancelled",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD239",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Delivered",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD240",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Processing",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD241",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Shipped",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD242",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Cancelled",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD243",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Delivered",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD244",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Processing",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD245",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Shipped",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD246",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Cancelled",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD247",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Delivered",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD248",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Processing",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD249",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Shipped",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "#ORD250",
        name: "Marilyn Herwitz",
        earned: "Accessories",
        redeem: "1x Supplement",
        shared: "$24.99",
        balance: "Cancelled",
        action: "View",
        date: "Mar 1, 2025"
    },
    
];

export interface StoresInventoryItem {
    user: string;
    name: string;
    earned: string;
    redeem: string;
    shared: string;
    balance: string;
    action: string;
    date: string;
}

export const StoreInventoryData: StoresInventoryItem[] = [
    {
        user: "Omega-3 Capsules",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Hair Analysis Kit",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "SMA T-Shirt (L)",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Critical",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Coffee Mug",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Out of Stock",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Copper Air Bracelet",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Vitamin D3 Capsules",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Omega-3 Capsules",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Hair Analysis Kit",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "SMA T-Shirt (L)",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Critical",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Coffee Mug",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Out of Stock",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Omega-3 Capsules",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Hair Analysis Kit",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "SMA T-Shirt (L)",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Critical",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Coffee Mug",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Out of Stock",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Copper Air Bracelet",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Vitamin D3 Capsules",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Omega-3 Capsules",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Healthy",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Hair Analysis Kit",
        name: "HAIR-KIT-1",
        earned: "Hair Analysis",
        redeem: "22",
        shared: "24",
        balance: "Low",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "SMA T-Shirt (L)",
        name: "TSHIRT-L1",
        earned: "T-Shirts",
        redeem: "4",
        shared: "10",
        balance: "Critical",
        action: "View",
        date: "Mar 1, 2025"
    },
    {
        user: "Coffee Mug",
        name: "SUP-OM60",
        earned: "Supplements",
        redeem: "120",
        shared: "30",
        balance: "Out of Stock",
        action: "View",
        date: "Mar 1, 2025"
    }
];

export interface StoresReviewsItem {
    id: string;
    name: string;
    indentified: string;
    rating: string;
    review: string;
    date: string;
    status: string;
    icon: IconType;
}

export const StoreReviewsData: StoresReviewsItem[] = [
    {
        id: "#A202020",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fivestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202021",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fourstar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202022",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/threestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202023",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/twostar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202024",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/star.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202025",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fivestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202026",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fourstar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202027",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/threestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202028",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/twostar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202029",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/star.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202030",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fivestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202031",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fourstar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202032",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/threestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202033",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/twostar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202034",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/star.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202035",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fivestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202036",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/fourstar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202037",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/threestar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Flagged",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202038",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/twostar.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Approved",
        icon: HiOutlineDotsHorizontal,
    },
    {
        id: "#A202037",
        name: "Omega-3 Capsules",
        indentified: "John Doe",
        rating: "/images/StoreAnalysis/star.svg",
        review: "Noticed a real difference!",
        date: "Mar 10, 2024",
        status: "Pending",
        icon: HiOutlineDotsHorizontal,
    },  
];

export interface StoresSalesItem {
    name?: string;
    image?: string;
    sales: string;
    number: string;
    icon: IconType;
    rating: string;
    text: string;
}

export const StoreSalesData: StoresSalesItem[] = [
    {
        image: "/images/StoreAnalysis/vector0.svg",
        sales: "Sales",
        number: "+84%",
        icon: IoMdArrowUp,
        rating: "$ 4,84320",
        text: "Previous year ($2,294)"
    },
    {
        image: "/images/StoreAnalysis/vector1.svg",
        sales: "Purchases",
        number: "+9.2%",
        icon: IoMdArrowUp,
        rating: "$ 4,84320",
        text: "Previous year ($2,294)"
    },
    {
        image: "/images/StoreAnalysis/vector2.svg",
        sales: "Returns",
        number: "+1.5%",
        icon: IoArrowDownOutline,
        rating: "$ 4,84320",
        text: "Previous year ($2,294)"
    },
    // {
    //     name: "User Volume",
    //     number: "120",
    //     sales: "New Users",
    //     icon: MdArrowOutward,
    //     rating: "+19%",
    //     text: "Your users has grown"
    // }
];

export interface StoreSalesProductItem {
    image: string;
    name: string;
    sold: string;
    price: string;
    star: string;
    rating: string;
}

export const StoreSalesProductData: StoreSalesProductItem[] = [
    {
        image: "/images/StoreAnalysis/s.svg",
        name: "T-Shit",
        sold: "2.1k",
        price: "$1,428.24",
        star: "/images/StoreAnalysis/ss.svg",
        rating: "5.0",
    },
    {
        image: "/images/StoreAnalysis/s.svg",
        name: "T-Shit",
        sold: "2.1k",
        price: "$1,428.24",
        star: "/images/StoreAnalysis/ss.svg",
        rating: "5.0",
    },
    {
        image: "/images/StoreAnalysis/s.svg",
        name: "T-Shit",
        sold: "2.1k",
        price: "$1,428.24",
        star: "/images/StoreAnalysis/ss.svg",
        rating: "5.0",
    },
    {
        image: "/images/StoreAnalysis/s.svg",
        name: "T-Shit",
        sold: "2.1k",
        price: "$1,428.24",
        star: "/images/StoreAnalysis/ss.svg",
        rating: "5.0",
    },
    {
        image: "/images/StoreAnalysis/s.svg",
        name: "T-Shit",
        sold: "2.1k",
        price: "$1,428.24",
        star: "/images/StoreAnalysis/ss.svg",
        rating: "5.0",
    },  
];