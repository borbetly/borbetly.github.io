import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await new Promise(resolve => setTimeout(resolve, 500));
        alert('Thank you, ' + name + '! Your message has been sent successfully.');
        setName('');
        setMessage('');
    };

    return (
        <>
            <h2>Get In Touch</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
                <aside className="contact-form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required value={name} onChange={e => setName(e.target.value)} />
                </aside>
                <aside className="contact-form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" placeholder="How can we help?" required value={message} onChange={e => setMessage(e.target.value)} />
                </aside>
                <button type="submit" id="submitBtn">Submit Message</button>
            </form>
        </>
    );
}
