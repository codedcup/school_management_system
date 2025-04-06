import React from "react";
import {
    Typography,
    List,
    Accordion,
    AccordionHeader,
    AccordionBody,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    InboxIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Define a TypeScript type for our route items.
type RouteItem = {
    id: number;
    title: string;
    url: string;
    icon: React.ElementType;
    children?: RouteItem[];
    chip?: string;
};

// Create an object tree for your sidebar routes.
const routes: RouteItem[] = [
    {
        id: 1,
        title: "Dashboard",
        url: "dashboard",
        icon: PresentationChartBarIcon,
        children: [
            { id: 11, title: "Overview", url: "overview", icon: ChevronRightIcon }
        ],
    },
    {
        id: 2,
        title: "Master Data",
        url: "master",
        icon: ShoppingBagIcon,
        children: [
            { id: 21, title: "Classes", url: "classes", icon: ChevronRightIcon },
            { id: 22, title: "Sections", url: "sections", icon: ChevronRightIcon },
            { id: 23, title: "Streams", url: "streams", icon: ChevronRightIcon },
            { id: 24, title: "Subjects", url: "subjects", icon: ChevronRightIcon },
            { id: 25, title: "Designations", url: "designations", icon: ChevronRightIcon }
        ],
    },
    {
        id: 3,
        title: "Academic Setup",
        url: "academic",
        icon: ShoppingBagIcon,
        children: [
            { id: 31, title: "Class-Subject Assignment", url: "class-subject-assignment", icon: ChevronRightIcon },
            { id: 32, title: "Class Teacher Assignment", url: "class-teacher-assignment", icon: ChevronRightIcon },
        ],
    },
    {
        id: 4,
        title: "Student Management",
        url: "student",
        icon: ShoppingBagIcon,
        children: [
            { id: 41, title: "Student Registration", url: "registration", icon: ChevronRightIcon },
            { id: 42, title: "Student Directory", url: "directory", icon: ChevronRightIcon },
            { id: 42, title: "Fee Management", url: "fee-management", icon: ChevronRightIcon },
        ],
    },
    {
        id: 5,
        title: "Teacher Management",
        url: "teacher",
        icon: ShoppingBagIcon,
        children: [
            { id: 51, title: "Teacher Registration", url: "registration", icon: ChevronRightIcon },
            { id: 52, title: "Teacher Directory", url: "directory", icon: ChevronRightIcon },
            { id: 52, title: "Salary Management", url: "salary-management", icon: ChevronRightIcon },
        ],
    },
    {
        id: 6,
        title: "Finance",
        url: "finance",
        icon: ShoppingBagIcon,
        children: [
            { id: 61, title: "Fee Setup", url: "fee-setup", icon: ChevronRightIcon },
            { id: 62, title: "Salary Setup", url: "salary-setup", icon: ChevronRightIcon },
        ],
    },
    {
        id: 7,
        title: "Settings",
        url: "settings",
        icon: Cog6ToothIcon,
    },
    {
        id: 8,
        title: "Log Out",
        url: "logout",
        icon: PowerIcon,
    }
];

export default function Sidebar() {
    // This state keeps track of which accordion is open.
    const [open, setOpen] = React.useState<number>(0);

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };


    return (
        <div className="h-[100vh] w-[17rem] py-4 px-2 bg-white shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    School Name
                </Typography>
            </div>
            <div className="h-[calc(100vh-6em)]">
                <List className="min-w-full">
                    {routes.map((route) => {
                        // If the route has children, render it as an Accordion.
                        if (route.children && route.children.length > 0) {
                            return (
                                <Accordion
                                    key={route.id}
                                    open={open === route.id}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === route.id ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === route.id}>
                                        <AccordionHeader
                                            onClick={() => handleOpen(route.id)}
                                            className="border-b-0 p-3"
                                        >
                                            <ListItemPrefix>
                                                <route.icon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto text-sm font-normal">
                                                {route.title}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {route.children.map((child) => (
                                                <Link to={`/${route.url}/${child.url}`}>
                                                    <ListItem key={child.id}>
                                                        <ListItemPrefix>
                                                            <ChevronRightIcon
                                                                strokeWidth={3}
                                                                className="h-3 w-5"
                                                            />
                                                        </ListItemPrefix>

                                                        <Typography color="blue-gray" className="mr-auto text-sm font-normal">
                                                            {child.title}
                                                        </Typography>

                                                    </ListItem>
                                                </Link>
                                            ))}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            );
                        }

                        // If the route does not have children, render it as a simple ListItem.
                        return (
                            <Link to={`/${route.url}`}>
                                <ListItem key={route.id} className="max-w-100">
                                    <ListItemPrefix>
                                        <route.icon className="h-5 w-5" />
                                    </ListItemPrefix>

                                    <Typography color="blue-gray" className="mr-auto text-sm font-normal">
                                        {route.title}
                                    </Typography>

                                    {route.chip && (
                                        <ListItemSuffix>
                                            <Chip
                                                value={route.chip}
                                                size="sm"
                                                variant="ghost"
                                                color="blue-gray"
                                                className="rounded-full"
                                            />
                                        </ListItemSuffix>
                                    )}

                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </div>
        </div>
    );
}
