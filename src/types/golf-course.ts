export type CourseType = 'Links' | 'Parkland' | 'Historic' | 'Modern';
export type Environment = 'Seaside' | 'Inland';
export type Accessibility = 'Public' | 'Private';

export interface GolfCourse {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
        address: string;
        distanceFromStAndrews?: number; // km
    };
    type: CourseType[];
    environment: Environment;
    isTourCourse: boolean;

    difficulty: 1 | 2 | 3 | 4 | 5; // 1 = Easy, 5 = Very Hard
    prestige: 1 | 2 | 3 | 4 | 5; // 1 = Hidden Gem, 5 = World Class

    greenFee: {
        min: number;
        max: number;
        currency: string;
    };

    accessibility: Accessibility;
    idealSeason: string[];
    averagePlayTime: string; // e.g. "4h30"

    services: {
        clubhouse: boolean;
        practice: boolean;
        rental: boolean;
        caddie: boolean;
    };

    images: string[];
    description: string;
    bookingLink?: string;
}
