import { CalendarClock, CalendarDays, Home, Users, Video } from "lucide-react";

export const sidebarItems = [
  {
    label: "Home",
    imgUrl: Home,
    route: "/",
  },
  {
    label: "Upcoming",
    imgUrl: CalendarDays,
    route: "/upcoming",
  },
  {
    label: "Previous",
    imgUrl: CalendarClock,
    route: "/previous",
  },
  {
    label: "Recordings",
    imgUrl: Video,
    route: "/recordings",
  },
  {
    label: "Personal Room",
    imgUrl: Users,
    route: "/personal-room",
  },
];


export const avatarImages = [
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
  '/images/avatar-5.jpg',
]