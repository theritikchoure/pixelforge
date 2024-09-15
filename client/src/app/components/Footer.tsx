import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; 2024 Pixelforge. All rights reserved.</p>
                <div className="mt-4">
                    <Link href="/privacy-policy" className="text-white hover:underline">Privacy Policy
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="/terms" className="text-white hover:underline">Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
 }