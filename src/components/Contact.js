import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); // New state for status message


    const sendEmail = (e) => {
        e.preventDefault();
        // Using EmailJS 
        emailjs.sendForm('service_oa2vben', 'template_koludme', e.target, 'DZTjuzlyoAKlEif--')
            .then((result) => {
                console.log(result.text);
                setStatusMessage('Message sent!');
            }, (error) => {
                console.log(error.text);
                setStatusMessage('Error.');
            });

        e.target.reset();
    };

    return (
        <section id="contact">
            <div className="contact-text">
                <h2>Contact</h2>
                <p>Let's get in touch! I'm open to new opportunities or collaborations.</p>
            </div>
            <form onSubmit={sendEmail} className="contact-form">
                <input
                    type="email"
                    name="user_email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type="submit" style={{ marginRight: '10px' }}>Send</button>
                    <span style={{ fontSize: '0.8rem' }}>{statusMessage}</span>
                </div>
            </form>
            <div className="contact-icons">
                <a href="https://www.linkedin.com/in/tiffany-ngai-4887481b6" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a href="https://github.com/TiffanyNgai?tab=repositories" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
            </div>
        </section>
    );
};

export default Contact;
