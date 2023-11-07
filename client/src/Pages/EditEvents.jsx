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
                        throw new Error('Network response error');
                    }
                    return response.json();
                })
                .then((data) => {
                    updateEvents(eventId, data)
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
        <div id="signUp-div">
            {eventData ? (
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
                    <button type="submit">Update Event</button>
                    <button type="button" onClick={handleDelete} className="delete-button">
                        Delete Event
                    </button>
                </form>
            ) : (
                <p>Loading event data...</p>
            )}
        </div>
    );
};

export default EditEvent;










// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from "react-router-dom";

// const Events = () => {
//     const nav = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             event_name: '',
//             location: '',
//             description: '',
//         },
//         validationSchema: Yup.object({
//             event_name: Yup.string().required('Event name is required'),
//             location: Yup.string().required('Location is required'),
//             description: Yup.string().required('Description is required'),
//         }),
//         onSubmit: (values) => {
//             const eventObject = {
//                 "event_name": values.event_name,
//                 "location": values.location,
//                 "description": values.description,
//             };

//             fetch(`/api/events/${events.id}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(eventObject)
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error("Network response error");
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log(data);
//                     nav("/events");
//                 })
//                 .catch(error => {
//                     console.log("error", error.message);
//                 });
//         },
//     });

//     return (
//         <div id="signUp-div">
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="input-group">
//                     <label>Event Name</label>
//                     <input
//                         type="text"
//                         {...formik.getFieldProps('event_name')}
//                     />
//                     {formik.touched.event_name && formik.errors.event_name ? (
//                         <div className="error">{formik.errors.event_name}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Location</label>
//                     <input
//                         type="text"
//                         {...formik.getFieldProps('location')}
//                     />
//                     {formik.touched.location && formik.errors.location ? (
//                         <div className="error">{formik.errors.location}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Description</label>
//                     <textarea
//                         {...formik.getFieldProps('description')}
//                     />
//                     {formik.touched.description && formik.errors.description ? (
//                         <div className="error">{formik.errors.description}</div>
//                     ) : null}
//                 </div>
//                 <button type="submit">Edit Event</button>
//             </form>
//         </div>
//     );
// };

// export default Events;
