export interface Venue {
    venueId: number;
    venueName: string;
    typeId: number;
    maxCapacity: number;
    description: string;
    contactEmail: string;
    contactPhone: string;
    isAccessible: boolean;
    venueUrl: string;
    locationId: number;
}

export interface CreateVenueDto {
    venueName: string;
    typeId: number;
    maxCapacity: number;
    description: string;
    contactEmail: string;
    contactPhone: string;
    isAccessible: boolean;
    venueUrl: string;
    locationId: number;
}
export interface CreateLocationDto {
    LocationName: string;
    Address: string;
    Suburb: string;
    PostalCode: string;
    State: string;
    Country: string;
    Latitude: number;
    Longitude: number;
    ParkingAvailable: boolean;
}