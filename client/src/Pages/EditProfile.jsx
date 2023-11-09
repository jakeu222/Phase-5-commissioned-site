import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useUserStore from '../hooks/userStore';

const EditProfile = () => {
    const { user, updateUser, deleteUser } = useUserStore();
    const nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            age: 0,
            city: '',
            username: '',
            password: '',
            buyer: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email address'),
            age: Yup.number().required('Required'),
            city: Yup.string(),
            username: Yup.string().required('Required'),
            buyer: Yup.boolean().required('Required'),
            password: Yup.string()
                .required('Required')
                .min(8, 'Password should be over 7 characters long')
                .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
                .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character'),
        }),
        onSubmit: values => {
            const userObject = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                age: values.age,
                city: values.city,
                username: values.username,
                password: values.password,
                buyer: values.buyer
            };

            fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response error');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    updateUser(data);
                    // nav("/profile");
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        },
    });

    return (
        <div className="min-h-screen flex justify-center items-center bg-hero bg-cover" style={{ backgroundImage: 'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)' }}>
            <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-md text-white">
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="text-3xl text-center font-bold mb-4 text-gray-600">Edit Profile</h2>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">First Name:</label>
                        <input
                            type="text"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('first_name')}
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <div className="text-red-500">{formik.errors.first_name}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Last Name:</label>
                        <input
                            type="text"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('last_name')}
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <div className="text-red-500">{formik.errors.last_name}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Email:</label>
                        <input
                            type="email"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Age:</label>
                        <input
                            type="number"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('age')}
                        />
                        {formik.touched.age && formik.errors.age && (
                            <div className="text-red-500">{formik.errors.age}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">City of Residence:</label>
                        <input
                            type="text"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('city')}
                        />
                        {formik.touched.city && formik.errors.city && (
                            <div className="text-red-500">{formik.errors.city}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Buyer:</label>
                        <input
                            type="checkbox"
                            className="w-4 h-4 mt-2 border border-gray-300 rounded"
                            {...formik.getFieldProps('buyer')}
                        />
                        {formik.touched.buyer && formik.errors.buyer && (
                            <div className="text-red-500">{formik.errors.buyer}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Username:</label>
                        <input
                            type="text"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('username')}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500">{formik.errors.username}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-600">Password:</label>
                        <input
                            type="password"
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500">{formik.errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mb-2 py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                    >
                        Edit Account
                    </button>
                    <button
                        className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        onClick={(e) => {
                            fetch("/api/logout", { method: "DELETE" })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Network response error");
                                    }
                                })
                                .then(() => {
                                    fetch(`/api/users/${user.id}`, { method: 'DELETE' })
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error("Network response error");
                                            }
                                        })
                                        .then(() => {
                                            deleteUser();
                                            nav("/");
                                        })
                                        .catch((error) => {
                                            console.log("error", error.message);
                                        })
                                })
                                .catch((error) => {
                                    console.log("error", error.message);
                                });


                        }}
                    >
                        Delete Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;















