export interface FilterState {
    searchTerm: string;
    regions: string[];
    environments: string[];
    maxPrice: number;
    indexMatch: number | null;
    tourCoursesOnly: boolean;
    historicCoursesOnly: boolean;
}

export const INITIAL_FILTER_STATE: FilterState = {
    searchTerm: "",
    regions: [],
    environments: [],
    maxPrice: 500,
    indexMatch: null,
    tourCoursesOnly: false,
    historicCoursesOnly: false,
};
