export interface __DefaultListSchema {
    pageIndex: number;
    pageSize: number;
    pagingStrategy: number;
    sortingOptions: SortingOption[];
    filteringOptions: FilteringOption[];
}

interface FilteringOption {
    field: string;
    operator: number;
    value: string;
}

interface SortingOption {
    field: string;
    direction: number;
    priority: number;
}
