import {
    BeefIcon,
    Building2Icon,
    CroissantIcon,
    FishIcon,
    GlobeIcon,
    LeafIcon,
    MailIcon,
    Share2Icon,
    UtensilsCrossedIcon,
} from "lucide-react";
import default_restaurant_img from "./default_restaurant_Img.jpeg";
import hero_bg_img from "./hero_bg_img.png";
import membership_section_img from "./membership_section_img.png";

export const assets = {
    hero_bg_img,
    default_restaurant_img,
    membership_section_img,
};

export const dummyReviews = [
  {
    _id: "dummy-rev-1",
    userName: "Muhammad Ahmed",
    rating: 5,
    comment:
      "Absolutely phenomenal experience! The ambiance was perfect, and the food was cooked to perfection. A must-visit!",
    visitedDate: "2026-06-10T12:00:00.000Z",
    createdAt: "2026-06-10T12:00:00.000Z",
  },
  {
    _id: "dummy-rev-2",
    userName: "Hamza Khan",
    rating: 4,
    comment:
      "The signature dishes were incredible and the staff was extremely attentive. Will definitely come back for another dinner.",
    visitedDate: "2026-06-08T18:30:00.000Z",
    createdAt: "2026-06-08T18:30:00.000Z",
  },
  {
    _id: "dummy-rev-3",
    userName: "Ayesha Malik",
    rating: 5,
    comment:
      "Every course was a delightful experience. The flavors were amazing, the presentation was beautiful, and the service was excellent. Highly recommended!",
    visitedDate: "2026-06-05T20:15:00.000Z",
    createdAt: "2026-06-05T20:15:00.000Z",
  },
];

export const dummyRating = 4.8;
export const dummyReviewCount = 124;

export const footerSections = [
    {
        title: "COMPANY",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Partner with Us", path: "/partner" },
            { label: "Careers", path: "/careers" },
        ],
    },
    {
        title: "LEGAL",
        links: [
            { label: "Terms of Service", path: "/terms" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Cookies", path: "/cookies" },
        ],
    },
];

export const socialLinks = [
    { icon: GlobeIcon, href: "#" },
    { icon: Share2Icon, href: "#" },
    { icon: MailIcon, href: "#" },
];

export const bottomLinks = [
    { label: "Terms", path: "/terms" },
    { label: "Privacy", path: "/privacy" },
];

export const cuisines = [
    { name: "Italian", icon: UtensilsCrossedIcon, label: "ITALIAN" },
    { name: "Japanese", icon: FishIcon, label: "SUSHI" },
    { name: "French", icon: CroissantIcon, label: "FRENCH" },
    { name: "Rooftop", icon: Building2Icon, label: "ROOFTOP" },
    { name: "Steakhouse", icon: BeefIcon, label: "STEAKHOUSE" },
    { name: "Vegetarian", icon: LeafIcon, label: "VEGETARIAN" },
];

