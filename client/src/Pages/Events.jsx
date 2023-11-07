import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

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
        <div id="signUp-div">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <label>Event Name</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('event_name')}
                    />
                    {formik.touched.event_name && formik.errors.event_name ? (
                        <div className="error">{formik.errors.event_name}</div>
                    ) : null}
                </div>
                <div className="input-group">
                    <label>Location</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('location')}
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <div className="error">{formik.errors.location}</div>
                    ) : null}
                </div>
                <div className="input-group">
                    <label>Description</label>
                    <textarea
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="error">{formik.errors.description}</div>
                    ) : null}
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default Events;
