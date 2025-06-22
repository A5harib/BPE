import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <h1 className="text-3xl font-bold underline">Home Page</h1>
            <p>Welcome to the Home page!</p>
            <p>This is the main landing page of the application.</p>
            <Link className="text-blue-500 hover:underline" to="/discovery">
                Innovative drug discovery
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/oversight">
                Comprehensive oversight solutions
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/monitoring">
                Real-time monitoring and analytics
            </Link>     

            <br />
            <Link className="text-blue-500 hover:underline" to="/manufacturing">
                Streamlined manufacturing processes
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/supply-chain">
                Optimized supply chain management
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/quality">
                Enhanced quality assurance and compliance
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/surveillance">
                Proactive surveillance and risk management
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/sales">
                Data-driven sales strategies and insights
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/introduction">
                Introduction to our platform and services
            </Link>
            <br />
            <Link className="text-blue-500 hover:underline" to="/education">
                Educational resources and training materials
            </Link>
        </div>
    );
}

export default Home;
