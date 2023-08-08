import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: getIcon("bi:card-heading"),
  },
  {
    title: "Events",
    path: "/events",
    icon: getIcon("fluent-mdl2:product-catalog"),
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: getIcon("fluent-mdl2:publish-course"),
  },
  {
    title: "Food and Drinks",
    path: "/foodAndDrinks",
    icon: getIcon("ri:advertisement-line"),
  },
  {
    title: "CMS",
    path: "/cms",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "Menu",
    path: "/menu",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "Venue",
    path: "/venue",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "Venue Booking",
    path: "/venueBooking",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "FAQ",
    path: "/faq",
    icon: getIcon("mdi:faq"),
  },
  {
    title: "About Us",
    path: "/aboutUs",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "Contact Us",
    path: "/contactUs",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
  {
    title: "Subscribers",
    path: "/subscribers",
    icon: getIcon("material-symbols:contact-page-outline-rounded"),
  },
];

export default navConfig;
