import { useState } from "react";

const Discovery = () => {
    const [diseaseTargets, setDiseaseTargets] = useState(["Covid-19", "Cancer", "Diabetes", "Alzheimer's"]);
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold underline">Discovery Page</h1>
            <p>Welcome to the Discovery page!</p>
            <p>Here you can explore various features and content.</p>
            <div className="m-4  w-72 border border-neutral-300 rounded-lg shadow-md bg-white">
                <div className='w-full bg-neutral-500 text-white'>Disease Targets</div>
                <div>
                    {diseaseTargets.map((target, index) => (
                        <div key={index} className='p-2 border-b border-neutral-300'>
                            {target}
                        </div>
                    ))}
                </div>
                <div>
                    <button className="w-full p-2 border-t border-neutral-300 text-neutral-500 hover:bg-neutral-100">
                        Add Disease Target
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Discovery;
