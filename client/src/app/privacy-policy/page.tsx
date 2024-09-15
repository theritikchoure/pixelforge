// app/privacy/page.js

import { Metadata } from 'next';
import Footer from '../components/Footer';
import { Fragment } from 'react';
import Header from '../components/Header';

export const metadata: Metadata = {
    title: 'Privacy Policy - Pixleforge',
    description: 'Read Pixleforge’s Privacy Policy to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
    return (
        <Fragment>
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-4">Last Updated: [Date]</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p>
                        Welcome to Pixleforge! We are committed to safeguarding your privacy and ensuring that your personal
                        information is protected. This Privacy Policy outlines how we collect, use, disclose, and safeguard your
                        data when you use our SaaS application. By using Pixleforge, you agree to the terms of this Privacy Policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <p>
                        When you use Pixleforge, we may collect personal information that you provide to us, including:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Payment Information (for subscription services)</li>
                        <li>Account Credentials (username and password)</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
                    <p>
                        We collect data about your interactions with Pixleforge, including:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>IP Address</li>
                        <li>Browser Type and Version</li>
                        <li>Operating System</li>
                        <li>Pages Visited</li>
                        <li>Date and Time of Access</li>
                        <li>Referring Website</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies</h3>
                    <p>
                        We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are
                        small files placed on your device to help us remember your preferences and improve our services. You can
                        control cookie settings through your browser.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <p>
                        We use the information we collect for the following purposes:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            <strong>To Provide and Manage Services:</strong> To deliver and maintain our SaaS application, process
                            transactions, and manage user accounts.
                        </li>
                        <li>
                            <strong>To Improve Our Services:</strong> To analyze usage patterns and make improvements to Pixleforge.
                        </li>
                        <li>
                            <strong>To Communicate with You:</strong> To send important updates, service-related communications, and
                            marketing materials (with your consent).
                        </li>
                        <li>
                            <strong>To Provide Customer Support:</strong> To respond to inquiries, resolve issues, and provide assistance.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell or rent your personal information to third parties. However, we may share your information in
                        the following circumstances:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            <strong>With Service Providers:</strong> We may share your data with third-party service providers who
                            assist us in operating Pixleforge and delivering our services. These providers are bound by confidentiality
                            agreements.
                        </li>
                        <li>
                            <strong>For Legal Compliance:</strong> We may disclose your information if required to do so by law, or to
                            comply with legal processes, regulations, or governmental requests.
                        </li>
                        <li>
                            <strong>In Case of Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                            your information may be transferred as part of the business transaction.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p>
                        We implement reasonable and appropriate security measures to protect your personal data from unauthorized
                        access, alteration, disclosure, or destruction. While we strive to protect your information, no method of
                        transmission over the internet or electronic storage is completely secure.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
                    <p>
                        Depending on your location, you may have certain rights regarding your personal data, including:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            <strong>Access:</strong> The right to request a copy of the personal data we hold about you.
                        </li>
                        <li>
                            <strong>Correction:</strong> The right to request that we correct any inaccuracies in your personal data.
                        </li>
                        <li>
                            <strong>Deletion:</strong> The right to request the deletion of your personal data, subject to certain
                            exceptions.
                        </li>
                        <li>
                            <strong>Restriction:</strong> The right to request the restriction of processing your personal data.
                        </li>
                        <li>
                            <strong>Objection:</strong> The right to object to the processing of your personal data for certain purposes.
                        </li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at{ ' ' }
                        <a href="mailto:contact@pixleforge.com" className="text-blue-500 hover:underline">contact@pixleforge.com</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                        We will notify you of any significant changes by posting the updated policy on our website. Your continued use
                        of Pixleforge after any changes signifies your acceptance of the updated policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <p className="mt-2">
                        <strong>Pixleforge</strong><br />
                        Email: <a href="mailto:contact@pixleforge.com" className="text-blue-500 hover:underline">contact@pixleforge.com</a><br />
                        Address: [Your Company Address]
                    </p>
                </section>
            </main>
            <Footer />
        </Fragment>
    );
}
