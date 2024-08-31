import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={{ margin: '20px', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}>
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This information may include:</p>
            <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment information</li>
                <li>Event preferences and attendance history</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide, operate, and maintain our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you updates, promotional materials, and other information</li>
                <li>Respond to your inquiries and provide customer support</li>
            </ul>

            <h2>How We Share Your Information</h2>
            <p>We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at admin@eventify.bg.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <p>If you have any questions about this Privacy Policy, please contact us at admin@eventify.bg.</p>
        </div>
    );
}

export default PrivacyPolicy;
