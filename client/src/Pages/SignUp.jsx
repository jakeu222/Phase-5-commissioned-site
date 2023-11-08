import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const Signup = () => {
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
            buyer: false
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email address'),
            age: Yup.number().required('Required'),
            city: Yup.string(),
            username: Yup.string().required('Required'),
            // buyer: Yup.boolean().oneOf([true], 'Required'),
            password: Yup.string().required('Required')
                .min(8, 'Password should be at least 8 characters long')
                .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
                .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
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

            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response error");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    nav("/login");
                })
                .catch(error => {
                    console.log("error", error.message);
                });
        },
    });

    return (
        <div className="relative w-full min-h-screen">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)',
                }}
            >
                <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-md">
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="text-3xl text-center font-bold mb-4">Signup</h2>

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
                            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;








// import { useFormik } from 'formik';
// import { useNavigate } from "react-router-dom";
// import * as Yup from 'yup';
// // import './SignUp.css'

// const Signup = () => {
//     const nav = useNavigate();
//     const formik = useFormik({
//         initialValues: {
//             first_name: '',
//             last_name: '',
//             email: '',
//             age: 0,
//             city: '',
//             username: '',
//             password: '',
//             buyer: ''
//         },
//         validationSchema: Yup.object({
//             first_name: Yup.string().required('Required'),
//             last_name: Yup.string().required('Required'),
//             email: Yup.string().required('Required').email('Invalid email address'),
//             age: Yup.number().required('Required'),
//             city: Yup.string(),
//             username: Yup.string().required('Required'),
//             buyer: Yup.boolean().required('Required'),
//             password: Yup.string().required('Required')
//                 .min(8, 'Username should be over 7 characters long')
//                 .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
//                 .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
//         }),
//         onSubmit: values => {
//             console.log(values)
//             // console.log('Form data', values);

//             const userObject = {
//                 "first_name": values.first_name,
//                 "last_name": values.last_name,
//                 "email": values.email,
//                 "age": values.age,
//                 "city": values.city,
//                 "username": values.username,
//                 "password": values.password,
//                 "buyer": values.buyer
//             }
//             console.log(userObject);

//             fetch('/api/users', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userObject)
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error("Network response error");
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log(data)
//                     nav("/login");

//                 })
//                 .catch(error => {
//                     console.log("error", error.message);
//                 });

//         },

//     });

//     return (
//         <div id='signUp-div'>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="input-group">
//                     <label>First Name</label>
//                     <input
//                         type="first_name"
//                         {...formik.getFieldProps('first_name')}
//                     />
//                     {formik.touched.first_name && formik.errors.first_name ? (
//                         <div className="error">{formik.errors.first_name}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Last Name</label>
//                     <input
//                         type="last_name"
//                         {...formik.getFieldProps('last_name')}
//                     />
//                     {formik.touched.last_name && formik.errors.last_name ? (
//                         <div className="error">{formik.errors.last_name}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         {...formik.getFieldProps('email')}
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                         <div className="error">{formik.errors.email}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Age</label>
//                     <input
//                         type="age"
//                         {...formik.getFieldProps('age')}
//                     />
//                     {formik.touched.age && formik.errors.age ? (
//                         <div className="error">{formik.errors.age}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>City of Residence</label>
//                     <input
//                         type="city"
//                         {...formik.getFieldProps('city')}
//                     />
//                     {formik.touched.city && formik.errors.city ? (
//                         <div className="error">{formik.errors.city}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Buyer</label>
//                     <input
//                         type="buyer"
//                         {...formik.getFieldProps('buyer')}
//                     />
//                     {formik.touched.buyer && formik.errors.buyer ? (
//                         <div className="error">{formik.errors.buyer}</div>
//                     ) : null}
//                 </div>
//                 <div className="input-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         {...formik.getFieldProps('username')}
//                     />
//                     {formik.touched.username && formik.errors.username ? (
//                         <div className="error">{formik.errors.username}</div>
//                     ) : null}
//                 </div>

//                 <div className="input-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         {...formik.getFieldProps('password')}
//                     />
//                     {formik.touched.password && formik.errors.password ? (
//                         <div className="error">{formik.errors.password}</div>
//                     ) : null}
//                 </div>

//                 <button type="submit">Signup</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;