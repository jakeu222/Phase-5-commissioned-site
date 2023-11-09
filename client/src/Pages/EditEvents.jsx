import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = ({ updateEvents }) => {
    const { eventId } = useParams();
    const nav = useNavigate();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        // Fetch event data by eventId and set it to the state (eventData) when the component mounts.
        fetch(`/api/events/${eventId}`)
            .then((response) => response.json())
            .then((data) => setEventData(data))
            .catch((error) => console.error('Error fetching event data:', error));
    }, [eventId]);

    const formik = useFormik({
        initialValues: {
            event_name: eventData?.event_name || '',
            location: eventData?.location || '',
            description: eventData?.description || '',
        },
        validationSchema: Yup.object({
            event_name: Yup.string().required('Event name is required'),
            location: Yup.string().required('Location is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: (values) => {
            const updatedEvent = {
                event_name: values.event_name,
                location: values.location,
                description: values.description,
            };

            fetch(`/api/events/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error('Network response error');
                    }
                    return response.json();
                })
                .then((data) => {
                    updateEvents(eventId, data);
                    nav(`/events`);
                })
                .catch((error) => {
                    console.error('Error updating event:', error.message);
                });
        },
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response error');
                    }
                    return response.json();
                })
                .then(() => {
                    console.log('Event deleted successfully');
                    nav('/events');
                })
                .catch((error) => {
                    console.error('Error deleting event:', error.message);
                });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-hero bg-cover" style={{ backgroundImage: 'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)' }}>
            <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-md text-white">
                {eventData ? (
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="text-3xl text-center font-bold mb-4 text-gray-600">Edit Event!</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_name">
                                Event Name
                            </label>
                            <input
                                id="event_name"
                                type="text"
                                {...formik.getFieldProps('event_name')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {formik.touched.event_name && formik.errors.event_name ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.event_name}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                {...formik.getFieldProps('location')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {formik.touched.location && formik.errors.location ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.location}</p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...formik.getFieldProps('description')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.description}</p>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="w-full mb-2 py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Update Event
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="w-full mb-2 py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Delete Event
                        </button>

                    </form>
                ) : (
                    <p>Loading event data...</p>
                )}
            </div>
        </div>
    );
};

export default EditEvent;
