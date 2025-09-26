export const launchStatus = [
    { value: '', label: 'All Status' },
    { value: 'true', label: 'Success' },
    { value: 'false', label: 'Failed' }
];
export const launchType = [
    { value: '', label: 'All Launches' },
    { value: 'true', label: 'Upcoming' },
    { value: 'false', label: 'Past' }
];
export const launchYears = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
});

export const launchSort = [
    { value: 'date_utc', label: 'Sort by Date' },
    { value: 'name', label: 'Sort by Name' }
];