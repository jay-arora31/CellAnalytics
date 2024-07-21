import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [touched, setTouched] = useState({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
        password2: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        const { first_name, last_name, email, password, password2 } = formData;
        return first_name.trim() !== '' &&
               last_name.trim() !== '' &&
               validateEmail(email) &&
               password.length >= 8 &&
               password === password2;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setError('Please correct the errors in the form.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            await axiosInstance.post('auth/register', JSON.stringify(formData));
            setLoading(false);
            navigate('/auth/login');
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className='container'>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Register</h2>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${touched.first_name && !formData.first_name.trim() ? 'is-invalid' : ''}`}
                                        id="first_name" 
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('first_name')}
                                        required 
                                    />
                                    {touched.first_name && !formData.first_name.trim() && (
                                        <div className="invalid-feedback">First name is required.</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${touched.last_name && !formData.last_name.trim() ? 'is-invalid' : ''}`}
                                        id="last_name" 
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('last_name')}
                                        required 
                                    />
                                    {touched.last_name && !formData.last_name.trim() && (
                                        <div className="invalid-feedback">Last name is required.</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className={`form-control ${touched.email && !validateEmail(formData.email) ? 'is-invalid' : ''}`}
                                        id="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('email')}
                                        required 
                                    />
                                    {touched.email && !validateEmail(formData.email) && (
                                        <div className="invalid-feedback">Please enter a valid email address.</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className={`form-control ${touched.password && formData.password.length < 8 ? 'is-invalid' : ''}`}
                                        id="password" 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('password')}
                                        required 
                                    />
                                    {touched.password && formData.password.length < 8 && (
                                        <div className="invalid-feedback">Password must be at least 8 characters long.</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className={`form-control ${touched.password2 && formData.password !== formData.password2 ? 'is-invalid' : ''}`}
                                        id="password2" 
                                        name="password2"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('password2')}
                                        required 
                                    />
                                    {touched.password2 && formData.password !== formData.password2 && (
                                        <div className="invalid-feedback">Passwords do not match.</div>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        disabled={loading || !validateForm()}
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <Link to="/auth/login" className="text-decoration-none">Already have an account? Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}