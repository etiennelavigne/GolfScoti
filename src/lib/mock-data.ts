import { GolfCourse } from "@/types/golf-course";

export const MOCK_CATALOG: GolfCourse[] = [
    {
        id: "Old Course", name: "St Andrews Old Course", location: { lat: 56.3432, lng: -2.8023, address: "St Andrews", distanceFromStAndrews: 0 },
        type: ["Links", "Historic"], environment: "Seaside", isTourCourse: true, difficulty: 5, slope: 132, length: 7305, established: 1552,
        greenFee: { min: 200, max: 300, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any,
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        description: "The Home of Golf where the game has been played since the 15th century. It is the most iconic golf course in the world.",
        website: "https://standrews.com",
        email: "reservations@standrews.com",
        phone: "+44 1334 466666",
        bookingLink: "#"
    },
    {
        id: "Carnoustie", name: "Carnoustie Golf Links", location: { lat: 56.4975, lng: -2.7167, address: "Carnoustie", distanceFromStAndrews: 25 },
        type: ["Links"], environment: "Seaside", isTourCourse: true, difficulty: 5, slope: 145, length: 7402, established: 1842,
        greenFee: { min: 180, max: 280, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h30", services: {} as any,
        images: ["/placeholder.svg", "/placeholder.svg"],
        description: "Golf's greatest test. Known as 'Carnasty' it is widely regarded as the most difficult course on the Open rota.",
        website: "https://carnoustiegolflinks.com",
        email: "golf@carnoustielinks.com",
        phone: "+44 1241 802270",
        bookingLink: "#"
    },
    {
        id: "Kingsbarns", name: "Kingsbarns Golf Links", location: { lat: 56.2995, lng: -2.6505, address: "St Andrews", distanceFromStAndrews: 7 },
        type: ["Links", "Modern"], environment: "Seaside", isTourCourse: true, difficulty: 4, slope: 138, length: 7226, established: 2000,
        greenFee: { min: 250, max: 350, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "4h45", services: {} as any,
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        description: "Modern classic with sea views from every hole. Quickly became a must-play when visiting the Fife coast.",
        website: "https://kingsbarns.com",
        email: "info@kingsbarns.com",
        phone: "+44 1334 460860",
        bookingLink: "#"
    },
    {
        id: "Gleneagles_Kings", name: "Gleneagles (King's)", location: { lat: 56.2828, lng: -3.7501, address: "Auchterarder", distanceFromStAndrews: 45 },
        type: ["Parkland", "Historic"], environment: "Inland", isTourCourse: true, difficulty: 4, slope: 135, length: 6790, established: 1919,
        greenFee: { min: 150, max: 275, currency: "GBP" }, accessibility: "Private", idealSeason: [], averagePlayTime: "4h30", services: {} as any,
        images: ["/placeholder.svg"],
        description: "Beautiful inland challenge designed by James Braid. A masterpiece of golf course architecture.",
        website: "https://gleneagles.com",
        email: "resort.sales@gleneagles.com",
        phone: "+44 1764 662231",
        bookingLink: "#"
    },
    {
        id: "Elie", name: "Elie Golf House Club", location: { lat: 56.1884, lng: -2.8247, address: "Elie, Fife", distanceFromStAndrews: 14 },
        type: ["Links"], environment: "Seaside", isTourCourse: false, difficulty: 3, slope: 120, length: 6273, established: 1589,
        greenFee: { min: 95, max: 130, currency: "GBP" }, accessibility: "Public", idealSeason: [], averagePlayTime: "3h45", services: {} as any,
        images: ["/placeholder.svg", "/placeholder.svg"],
        description: "Fun, forgiving historic links with no par 5s. Famous for its blind opening drive watched over by a periscope from a submarine.",
        website: "https://eliegolflinks.co.uk",
        email: "info@golfhouseclub.co.uk",
        phone: "+44 1333 330301",
        bookingLink: "#"
    }
];
