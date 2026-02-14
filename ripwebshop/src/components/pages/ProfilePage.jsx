import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
    const { userData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData?.firstName) {
            alert('No profile data found. Please sign up first.');
            navigate('/sign-up');
        }
    }, [userData, navigate]);

    if (!userData?.firstName) return null;

    const fullName = userData.firstName + ' ' + userData.lastName;
    const initials = (userData.firstName.charAt(0) + userData.lastName.charAt(0)).toUpperCase();

    return (
        <section className="profile-section">
            <div className="profile-header">
                <div className="profile-avatar">{initials}</div>
                <h2 className="profile-name">{fullName}</h2>
            </div>
            <div className="profile-details">
                <div className="detail-row">
                    <span className="detail-label">First Name</span>
                    <span className="detail-value">{userData.firstName}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Last Name</span>
                    <span className="detail-value">{userData.lastName}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Email Address</span>
                    <span className="detail-value">{userData.email}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Mobile Number</span>
                    <span className="detail-value">{userData?.mobile ?? '-'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Home Address</span>
                    <span className="detail-value">{userData?.address ?? '-'}</span>
                </div>
            </div>
            <button className="back-home-btn" onClick={() => navigate('/')}>Back to Home</button>
        </section>
    );
}
