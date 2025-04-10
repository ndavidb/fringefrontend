'use client'
import React, { useState, useEffect } from 'react';
import { createVenue } from '../../../../services/locationservice';
import { CreateLocationDto } from '../../../../types/api';

// Define the Location interface
interface Location {
    id: number;
    name: string;
    address: string;
    suburb: string;
    postalCode: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    parkingAvailable: boolean;
    active: boolean;
}

const LocationManagement: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    const handleEdit = (location: Location) => {
        setCurrentLocation(location);
        setShowForm(true);
    };

    const handleDelete = (locationId: number) => {
        if (window.confirm('Are you sure?')) {
            setLocations(locations.filter((loc) => loc.id !== locationId));
        }
    };

    const handleFormSubmit = (formData: Location) => {
        if (currentLocation) {
            // Update existing location
            setLocations(
                locations.map((loc) =>
                    loc.id === currentLocation.id ? formData : loc
                )
            );
        } else {
            // Add new location
            setLocations([...locations, { ...formData, id: Date.now() }]);
        }
        setShowForm(false);
        setCurrentLocation(null);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Location Management</h1>
                <button
                    className="add-button"
                    onClick={() => {
                        setCurrentLocation(null);
                        setShowForm(true);
                    }}
                >
                    <span className="icon">+</span> Add Location
                </button>
            </div>

            {showForm && (
                <LocationForm
                    location={currentLocation}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setCurrentLocation(null);
                    }}
                />
            )}

            {locations.length > 0 && (
                <div className="table-container">
                    <table className="locations-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City/Suburb</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Parking</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location) => (
                                <tr key={location.id}>
                                    <td>{location.name}</td>
                                    <td>{location.address}</td>
                                    <td>{location.suburb}</td>
                                    <td>{location.state}</td>
                                    <td>{location.country}</td>
                                    <td>{location.parkingAvailable ? 'Yes' : 'No'}</td>
                                    <td>{location.active ? 'Yes' : 'No'}</td>
                                    <td className="actions">
                                        <button className="edit-button" onClick={() => handleEdit(location)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(location.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {locations.length > 0 && (
                <p className="location-count">Showing {locations.length} locations</p>
            )}

            <style jsx>{`
                .container {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background-color: #fff;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eaeaea;
                }
                h1 {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }
                .add-button {
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                .icon {
                    margin-right: 6px;
                    font-size: 18px;
                }
                .table-container {
                    overflow-x: auto;
                    margin-top: 20px;
                }
                .locations-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .locations-table th {
                    text-align: left;
                    padding: 12px 16px;
                    background-color: #f9f9f9;
                    border-bottom: 1px solid #eaeaea;
                    font-weight: 500;
                }
                .locations-table td {
                    padding: 12px 16px;
                    border-bottom: 1px solid #eaeaea;
                }
                .actions {
                    display: flex;
                    gap: 8px;
                }
                .edit-button, .delete-button {
                    border: none;
                    border-radius: 4px;
                    padding: 6px 12px;
                    font-size: 13px;
                    cursor: pointer;
                }
                .edit-button {
                    background-color: #f0f0f0;
                    color: #333;
                }
                .delete-button {
                    background-color: #ffebee;
                    color: #d32f2f;
                }
                .location-count {
                    margin-top: 16px;
                    font-size: 14px;
                    color: #666;
                }
            `}</style>
        </div>
    );
};

const LocationForm: React.FC<{
    location: Location | null;
    onSubmit: (formData: Location) => void;
    onCancel: () => void;
}> = ({ location, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Location>({
        id: 0,
        name: '',
        address: '',
        suburb: '',
        postalCode: '',
        state: '',
        country: '',
        latitude: 0,
        longitude: 0,
        parkingAvailable: false,
        active: true,
    });

    useEffect(() => {
        if (location) {
            setFormData(location);
        }
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLocation: CreateLocationDto = {
            LocationName: formData.name,
            Address: formData.address,
            Suburb: formData.suburb,
            PostalCode: formData.postalCode,
            State: formData.state,
            Country: formData.country,
            Latitude: formData.latitude,
            Longitude: formData.longitude,
            ParkingAvailable: formData.parkingAvailable,
        };
        console.log(formData);
        console.log(newLocation);
        createVenue(newLocation);
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h2>{location ? 'Edit' : 'Add'} Location</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>
                            Location Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Address <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Suburb <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="suburb"
                            value={formData.suburb}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Postal Code <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Country <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Latitude <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Longitude <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="checkbox-group">
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="parkingAvailable"
                            name="parkingAvailable"
                            checked={formData.parkingAvailable}
                            onChange={handleChange}
                        />
                        <label htmlFor="parkingAvailable">Parking Available</label>
                    </div>
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange}
                        />
                        <label htmlFor="active">Active</label>
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </form>

            <style jsx>{`
                .form-container {
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    padding: 24px;
                    margin-bottom: 30px;
                }
                h2 {
                    font-size: 18px;
                    margin-top: 0;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                }
                .form-group {
                    margin-bottom: 16px;
                }
                label {
                    display: block;
                    margin-bottom: 6px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .required {
                    color: #d32f2f;
                }
                input[type="text"],
                input[type="number"] {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .checkbox-group {
                    margin-top: 16px;
                    margin-bottom: 24px;
                }
                .checkbox {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .checkbox input {
                    margin-right: 8px;
                }
                .form-buttons {
                    display: flex;
                    gap: 12px;
                }
                .save-button, .cancel-button {
                    padding: 10px 16px;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                }
                .save-button {
                    background-color: #0070f3;
                    color: white;
                }
                .cancel-button {
                    background-color: #f0f0f0;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default LocationManagement;