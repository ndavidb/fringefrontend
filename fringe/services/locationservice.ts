// services/venueService.ts
import { CreateLocationDto, CreateVenueDto, Venue } from '@/types/api/venue';
import { ShowTypeLookupDto } from '@/types/api/show';
import { TicketType } from "@/types/api/TicketType";
import { getCookie } from "cookies-next";
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5098';

// Helper function for fetch requests
async function fetchWithErrorHandling<T>(url: string, options: RequestInit): Promise<T> {
   
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

// Get all venues
export async function getVenues(): Promise<Venue[]> {
    return fetchWithErrorHandling<Venue[]>(`${API_BASE_URL}/api/location`, {
        credentials: 'include'
    });
}

// Get a venue by ID
export async function getVenueById(id: number): Promise<Venue> {
    return fetchWithErrorHandling<Venue>(`${API_BASE_URL}/api/location/${id}`, {
        credentials: 'include'
    });
}

// Create a new venue
export async function createVenue(venue: CreateLocationDto): Promise<CreateLocationDto> {
    const accessToken = getCookie('accessToken') as string;

    
    return fetchWithErrorHandling<CreateLocationDto>(`${API_BASE_URL}/api/locations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify(venue),
        credentials: 'include'
    });
}

// Update a venue
export async function updateVenue(id: number, venue: CreateLocationDto): Promise<CreateLocationDto> {
    const accessToken = getCookie('accessToken') as string;
    return fetchWithErrorHandling<CreateLocationDto>(`${API_BASE_URL}/api/location/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify(venue),
        credentials: 'include'
    });
}

// Delete a venue
export async function deleteVenue(id: number): Promise<void> {
    const accessToken = getCookie('accessToken') as string;
    return fetchWithErrorHandling<void>(`${API_BASE_URL}/api/location/${id}`, {
        method: 'DELETE',
        headers: {  'Authorization': `Bearer ${accessToken}` },
        credentials: 'include'
    });
}

// Get all venue types - Based on the ShowTypeLookupDto in your backend
export async function getVenueTypes(): Promise<ShowTypeLookupDto[]> {
    return fetchWithErrorHandling<ShowTypeLookupDto[]>(`${API_BASE_URL}/api/venues/types`, {
        credentials: 'include'
    });
}

// This endpoint may not exist yet in your current API implementation
// You may need to create it in your backend
export async function getTicketTypes(): Promise<TicketType[]> {
    return fetchWithErrorHandling<TicketType[]>(`${API_BASE_URL}/api/tickets/types`, {
        credentials: 'include'
    });
}