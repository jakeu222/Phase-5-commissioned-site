import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            event_name: '',
            location: '',
            description: '',
        },
        validationSchema: Yup.object({
            event_name: Yup.string().required('Event name is required'),
            location: Yup.string().required('Location is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: (values) => {
            const eventObject = {
                "event_name": values.event_name,
                "location": values.location,
                "description": values.description,
            };

            fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response error");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    nav("/events");
                })
                .catch(error => {
                    console.log("error", error.message);
                });
        },
    });

    return (
        <div className="min-h-screen flex justify-center items-center bg-hero bg-cover" style={{ backgroundImage: 'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)' }}>
            <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-md text-white">
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="text-3xl text-center font-bold mb-4 text-gray-600">Create Event!</h2>
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
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full mb-2 py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Events;
