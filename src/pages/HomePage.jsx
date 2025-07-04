import { SignIn, useUser } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
    { to: "/discovery", label: "Innovative drug discovery" },
    { to: "/oversight", label: "Comprehensive oversight solutions" },

    { to: "/supply-chain", label: "Optimized supply chain management" },
    { to: "/quality", label: "Enhanced quality assurance and compliance" },
    { to: "/surveillance", label: "Proactive surveillance and risk management" },
    { to: "/sales", label: "Data-driven sales strategies and insights" },
    { to: "/introduction", label: "New Product Introduction" },
    { to: "/education", label: "Educational resources and training materials" },
];

const Home = () => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Welcome to Pfizer Dashboard</h2>
                    <p className="mb-6 text-center text-gray-600">Sign in to access innovative solutions for every stage of your workflow.</p>
                    <SignIn />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center drop-shadow">Welcome to Pfizer Dashboard</h1>
                <p className="text-lg text-gray-700 mb-8 text-center">
                    Empowering your journey from discovery to delivery with cutting-edge solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <Link 
                            key={feature.to}
                            to={feature.to}
                            className="block bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-5 py-4 text-indigo-800 font-semibold text-center shadow transition"
                        >
                            {feature.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
