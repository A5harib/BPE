import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Introduction = () => {

    const [adminCode, setAdminCode] = useState("");
    const [adminAccess, setAdminAccess] = useState(false);
    const [ideas, setIdeas] = useState([
        { title: "NanoVax", description: "A nanoparticle-based vaccine for rapid response to emerging viral infections.", source: "University Student" },
        { title: "GlucoGuard", description: "A smart insulin patch that automatically adjusts dosage based on real-time glucose monitoring.", source: "Medical Researcher" },
        { title: "NeuroRelief", description: "A non-invasive wearable device for early detection and intervention in neurodegenerative diseases.", source: "Healthcare Startup" },
        { title: "CardioClean", description: "An oral medication that targets and dissolves arterial plaque to prevent heart attacks.", source: "Pharmaceutical Company" },
        { title: "OncoDetect", description: "A blood test kit for early cancer detection using AI-driven biomarker analysis.", source: "Biotech Firm" }
    ]);
    const [loading, setLoading] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(prev => (prev >= 3 ? 0 : prev + 1));
        }, 400);
        return () => clearInterval(interval);
    }, []);
    const loadingDots = ["", ".", "..", "..."][loading];
    const [selectedIdea, setSelectedIdea] = useState([]);
    const [newIdea, setNewIdea] = useState({
        title: "",
        description: "",
        source: ""
    });
    const [productions, setProductions] = useState([]);

    return (

        <div>
            {adminAccess ? (<div className="">
                <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 p-6 flex flex-col items-center">
                    <div className="w-full max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow tracking-tight">
                            Product Introduction & Manufacturing
                        </h1>
                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            {/* Ideas Section */}
                            <div className="flex-1 bg-white/90 rounded-3xl shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-2xl font-bold p-5 text-center">
                                    Current Ideas Proposed
                                </div>
                                <div className="p-6 space-y-4">
                                    <ul className="space-y-4">
                                        {ideas.map((idea, index) => (
                                            <li key={index} className="bg-indigo-50 rounded-xl p-4 shadow flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-lg text-indigo-700">{idea.title}</span>
                                                    <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">{idea.source}</span>
                                                </div>
                                                <p className="text-gray-700">{idea.description}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                                        onClick={() => setIdeas(ideas.filter((_, i) => i !== index))}
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                                        onClick={() => {
                                                            setSelectedIdea([...selectedIdea, {
                                                                ...idea,
                                                                manufacturingSite: "",
                                                                batchSize: "",
                                                                productionDate: "",
                                                                expectedOutput: "",
                                                                formulationType: "",
                                                                testResults: "",
                                                                regulatoryApproval: ""
                                                            }]);
                                                            setIdeas(ideas.filter((_, i) => i !== index));
                                                        }}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Dialog>
                                        <div className="text-indigo-100 bg-indigo-500 hover:bg-indigo-600 cursor-pointer border-2 border-indigo-500 hover:scale-105 transition-all duration-300 w-fit p-2 rounded-md my-2 font-semibold">
                                            <DialogTrigger>Add Idea</DialogTrigger>
                                        </div>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Enter Idea Details</DialogTitle>
                                                <DialogDescription className="flex flex-col gap-3">
                                                    <input
                                                        className="border border-neutral-300 p-2 rounded-md w-full"
                                                        type="text"
                                                        placeholder="Idea Title"
                                                        value={newIdea.title}
                                                        onChange={e => setNewIdea({ ...newIdea, title: e.target.value })}
                                                    />
                                                    <input
                                                        className="border border-neutral-300 p-2 rounded-md w-full"
                                                        type="text"
                                                        placeholder="Idea Description"
                                                        value={newIdea.description}
                                                        onChange={e => setNewIdea({ ...newIdea, description: e.target.value })}
                                                    />
                                                    <input
                                                        className="border border-neutral-300 p-2 rounded-md w-full"
                                                        type="text"
                                                        placeholder="Idea Source"
                                                        value={newIdea.source}
                                                        onChange={e => setNewIdea({ ...newIdea, source: e.target.value })}
                                                    />
                                                    <DialogClose asChild>
                                                        <button
                                                            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded font-semibold"
                                                            onClick={() => {
                                                                if (newIdea.title && newIdea.description && newIdea.source) {
                                                                    setIdeas([...ideas, newIdea]);
                                                                    setNewIdea({ title: "", description: "", source: "" });
                                                                }
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                    </DialogClose>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            {/* Production Section */}
                            <div className="flex-1 bg-white/90 rounded-3xl shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-2xl font-bold p-5 text-center">
                                    Current Production
                                </div>
                                <div className="p-6">
                                    {productions.length === 0 && (
                                        <div className="text-center text-gray-400 italic">No productions yet.</div>
                                    )}
                                    {productions.map((production, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <strong className="text-xl">{production.title}</strong>
                                                    <span className="text-2xl">{loadingDots}</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent sideOffset={5}>
                                                <div className="p-2 text-sm">
                                                    <strong>Description:</strong> {production.description} <br />
                                                    <strong>Source:</strong> {production.source} <br />
                                                    <strong>Manufacturing Site:</strong> {production.manufacturingSite} <br />
                                                    <strong>Batch Size:</strong> {production.batchSize} <br />
                                                    <strong>Production Date:</strong> {production.productionDate} <br />
                                                    <strong>Expected Output:</strong> {production.expectedOutput} <br />
                                                    <strong>Formulation Type:</strong> {production.formulationType} <br />
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Manufacturing Process Section */}
                        <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden mt-4">
                            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-2xl font-bold p-5 text-center">
                                Manufacturing Process
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {selectedIdea.length === 0 && (
                                    <div className="col-span-full text-center text-gray-400 italic">
                                        No ideas selected for manufacturing yet.
                                    </div>
                                )}
                                {selectedIdea.map((idea, index) => (
                                    <div key={index} className="bg-indigo-50 rounded-2xl shadow p-5 flex flex-col gap-3">
                                        <strong className="text-xl text-indigo-700">{index + 1}. {idea.title}</strong>
                                        <select
                                            className="border border-neutral-300 p-2 rounded-md w-full my-1 bg-white text-indigo-700 font-semibold focus:ring-2 focus:ring-indigo-400 transition"
                                            value={idea.testResults || ""}
                                            onChange={e => {
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, testResults: e.target.value };
                                                setSelectedIdea(updated);
                                            }}
                                        >
                                            <option className="text-gray-400 bg-white" value="">Select Test Result</option>
                                            <option className="text-green-700 bg-green-50 font-bold" value="Pass">Pass</option>
                                            <option className="text-red-700 bg-red-50 font-bold" value="Fail">Fail</option>
                                        </select>
                                        <select
                                            className="border border-neutral-300 p-2 rounded-md w-full my-1 bg-white text-indigo-700 font-semibold focus:ring-2 focus:ring-indigo-400 transition"
                                            value={idea.regulatoryApproval || ""}
                                            onChange={e => {
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, regulatoryApproval: e.target.value };
                                                setSelectedIdea(updated);
                                            }}
                                        >
                                            <option className="text-gray-400 bg-white" value="">Select Regulatory Approval</option>
                                            <option className="text-green-700 bg-green-50 font-bold" value="Approved">Approved</option>
                                            <option className="text-yellow-700 bg-yellow-50 font-bold" value="Pending">Pending</option>
                                        </select>
                                        {idea.manufacturingSite ? (
                                            <div className="text-sm text-gray-700 space-y-1">
                                                <div><strong>Manufacturing Site:</strong> {idea.manufacturingSite}</div>
                                                <div><strong>Batch Size:</strong> {idea.batchSize}</div>
                                                <div><strong>Production Date:</strong> {idea.productionDate}</div>
                                                <div><strong>Expected Output:</strong> {idea.expectedOutput}</div>
                                                <div><strong>Formulation Type:</strong> {idea.formulationType}</div>
                                            </div>
                                        ) : null}
                                        <Dialog>
                                            <div className="text-indigo-100 bg-indigo-500 hover:bg-indigo-600 cursor-pointer border-2 border-indigo-500 hover:scale-105 transition-all duration-300 w-fit p-2 rounded-md my-2 font-semibold">
                                                <DialogTrigger>Add Manufacturing Details</DialogTrigger>
                                            </div>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Enter Manufacturing Details</DialogTitle>
                                                    <DialogDescription className="flex flex-col gap-3">
                                                        <input
                                                            className="border border-neutral-300 p-2 rounded-md w-full"
                                                            type="text"
                                                            placeholder="Manufacturing Site"
                                                            value={idea.manufacturingSite || ""}
                                                            onChange={e => {
                                                                const updated = [...selectedIdea];
                                                                updated[index] = { ...idea, manufacturingSite: e.target.value };
                                                                setSelectedIdea(updated);
                                                            }}
                                                        />
                                                        <input
                                                            className="border border-neutral-300 p-2 rounded-md w-full"
                                                            type="text"
                                                            placeholder="Batch Size"
                                                            value={idea.batchSize || ""}
                                                            onChange={e => {
                                                                const updated = [...selectedIdea];
                                                                updated[index] = { ...idea, batchSize: e.target.value };
                                                                setSelectedIdea(updated);
                                                            }}
                                                        />
                                                        <input
                                                            className="border border-neutral-300 p-2 rounded-md w-full"
                                                            type="text"
                                                            placeholder="Production Date"
                                                            value={idea.productionDate || ""}
                                                            onChange={e => {
                                                                const updated = [...selectedIdea];
                                                                updated[index] = { ...idea, productionDate: e.target.value };
                                                                setSelectedIdea(updated);
                                                            }}
                                                        />
                                                        <input
                                                            className="border border-neutral-300 p-2 rounded-md w-full"
                                                            type="text"
                                                            placeholder="Expected Output"
                                                            value={idea.expectedOutput || ""}
                                                            onChange={e => {
                                                                const updated = [...selectedIdea];
                                                                updated[index] = { ...idea, expectedOutput: e.target.value };
                                                                setSelectedIdea(updated);
                                                            }}
                                                        />
                                                        <input
                                                            className="border border-neutral-300 p-2 rounded-md w-full"
                                                            type="text"
                                                            placeholder="Formulation Type"
                                                            value={idea.formulationType || ""}
                                                            onChange={e => {
                                                                const updated = [...selectedIdea];
                                                                updated[index] = { ...idea, formulationType: e.target.value };
                                                                setSelectedIdea(updated);
                                                            }}
                                                        />
                                                        <DialogClose asChild>
                                                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded font-semibold">
                                                                Save
                                                            </button>
                                                        </DialogClose>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                        {idea.testResults === "Pass" && idea.regulatoryApproval === "Approved" && idea.manufacturingSite ? (
                                            <div className="flex gap-2 items-center mt-2">
                                                <div className="text-green-600 font-semibold">
                                                    <strong>Status:</strong> Ready for Production
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setProductions([...productions, idea]);
                                                        setSelectedIdea(selectedIdea.filter((_, i) => i !== index));
                                                    }}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-red-500 mt-2 font-medium">
                                                <strong>Status:</strong> Pending Approval or Manufacturing Details
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (<div className="">
                <div className="flex flex-col gap-3 bg-white p-6 rounded-2xl shadow w-full max-w-md mx-auto">
                    <p className="text-gray-700 text-center text-lg font-medium">Enter admin access code to proceed:</p>
                    <input
                        type="password"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        placeholder="Enter admin code"
                        className="p-2 border border-indigo-200 rounded-md"
                    />
                    <button
                        onClick={() => {
                            if (adminCode === "admin505") {
                                setAdminAccess(true);
                                setAdminCode("");
                            } else {
                                alert("Access Denied. Incorrect code.");
                            }
                        }}
                        className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 shadow"
                    >
                        Submit
                    </button>
                </div>
            </div>)}
        </div>

    );
};

export default Introduction
