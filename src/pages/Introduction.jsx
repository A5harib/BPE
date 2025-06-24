import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const Introduction = () => {
    const [ideas, setIdeas] = useState([
        { title: "NanoVax", description: "A nanoparticle-based vaccine for rapid response to emerging viral infections.", source: "University Student" },
        { title: "GlucoGuard", description: "A smart insulin patch that automatically adjusts dosage based on real-time glucose monitoring.", source: "Medical Researcher" },
        { title: "NeuroRelief", description: "A non-invasive wearable device for early detection and intervention in neurodegenerative diseases.", source: "Healthcare Startup" },
        { title: "CardioClean", description: "An oral medication that targets and dissolves arterial plaque to prevent heart attacks.", source: "Pharmaceutical Company" },
        { title: "OncoDetect", description: "A blood test kit for early cancer detection using AI-driven biomarker analysis.", source: "Biotech Firm" }
    ]);
    const [loading, setLoading] = useState("...");
    // Animated loading dots (...), looping

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setLoading(prev => {
                if (prev.length >= 3) return "";
                return prev + ".";
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);
    const [selectedIdea, setSelectedIdea] = useState([]);
    const [newIdea, setNewIdea] = useState({
        title: "",
        description: "",
        source: "",
        manufacturingSite: "",
        batchSize: "",
        productionDate: "",
        expectedOutput: "",
        formulationType: "",
        testResults: "",
        regulatoryApproval: "",
    });
    const [productions, setProductions] = useState([
        {
            title: "",
            description: "",
            source: "",
            manufacturingSite: "",
            batchSize: "",
            productionDate: "",
            expectedOutput: "",
            formulationType: "",
            testResults: "",
            regulatoryApproval: "",
        }
    ]);

    return (
        <div className='p-4'>
            <div className="flex flex-row gap-4 ">

                <div className='shadow-2xl rounded-lg w-fit  bg-white min-h-[40vh] overflow-hidden my-4 '>
                    <div className='w-full  bg-indigo-500 text-white text-2xl p-4'>Current Ideas proposed</div>
                    <div className='p-4'>
                        <ul className='list-disc list-inside'>
                            {ideas.map((idea, index) => (
                                <li key={index}>
                                    <strong>{idea.title}</strong>:
                                    {idea.description} <br />
                                    <em>Source: {idea.source}</em>
                                    <div className="flex gap-2">
                                        <button className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => setIdeas(ideas.filter((_, i) => i !== index))} >Reject </button>

                                        <button onClick={() => {
                                            setSelectedIdea([...selectedIdea, idea])
                                            setIdeas(ideas.filter((_, i) => i !== index))
                                        }
                                        } className='bg-green-500 text-white px-2 py-1 rounded'>Approve</button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        <Dialog>
                            <div className="text-indigo-100 bg-indigo-500 hover:text-white cursor-pointer border-2 border-indigo-500 hover:scale-105 transition-all duration-300 w-fit p-2 rounded-md my-2">
                                <DialogTrigger >Add Idea</DialogTrigger>
                            </div>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Enter Idea details</DialogTitle>
                                    <DialogDescription className={"flex flex-col gap-3"}>
                                        <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Idea Title" value={newIdea.title} onChange={(e) => {
                                            setNewIdea({ ...newIdea, title: e.target.value });
                                        }} />
                                        <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Idea Description" value={newIdea.description} onChange={(e) => {
                                            setNewIdea({ ...newIdea, description: e.target.value });
                                        }} />
                                        <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Idea Source" value={newIdea.source} onChange={(e) => {
                                            setNewIdea({ ...newIdea, source: e.target.value });
                                        }} />
                                        <DialogClose asChild>
                                            <button className="bg-indigo-500 text-white p-2 rounded" variant="outline"
                                                onClick={
                                                    () => {
                                                        setIdeas([...ideas, newIdea]);
                                                        setNewIdea({ title: "", description: "", source: "" });
                                                    }
                                                }
                                            >Save</button>
                                        </DialogClose>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className='shadow-2xl rounded-lg w-fit  bg-white min-h-[40vh] overflow-hidden my-4 '>
                    <div className='w-full  bg-indigo-500 text-white text-2xl p-4'>Current Production</div>
                    <div>
                        {productions.map((production, index) => (
                            <div key={index} className=''>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center ">
                                            <strong className="text-xl p-4" key={index}> {production.title}</strong> {production.title !== "" ? <div className="text-2xl" key={index}>{loading}</div> : null}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={5}>
                                        <div className="p-2">
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

                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className='shadow-2xl rounded-lg w-fit  bg-white min-h-[40vh] overflow-hidden '>
                <div className='w-full  bg-indigo-500 text-white text-2xl p-4'>Manufacturing Process</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {selectedIdea.map((idea, index) => (
                        <div key={index} className='p-4'>
                            <strong className="text-xl  ">{index + 1}. {idea.title}</strong><br />
                            <select className="border border-neutral-300 p-2 rounded-md w-full my-2" value={idea.testResults || ""} onChange={(e) => {
                                const updated = [...selectedIdea];
                                updated[index] = { ...idea, testResults: e.target.value };
                                setSelectedIdea(updated);
                            }}>
                                <option className="" value="">Select Test Result</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                            </select>
                            <select className="border border-neutral-300 p-2 rounded-md w-full my-2" value={idea.regulatoryApproval || ""} onChange={(e) => {
                                const updated = [...selectedIdea];
                                updated[index] = { ...idea, regulatoryApproval: e.target.value };
                                setSelectedIdea(updated);
                            }}>
                                <option value="">Select Regulatory Approval</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                            </select>
                            {idea.manufacturingSite ? (
                                <div>
                                    <strong>Manufacturing Site:</strong> {idea.manufacturingSite} <br />
                                    <strong>Batch Size:</strong> {idea.batchSize} <br />
                                    <strong>Production Date:</strong> {idea.productionDate} <br />
                                    <strong>Expected Output:</strong> {idea.expectedOutput} <br />
                                    <strong>Formulation Type:</strong> {idea.formulationType} <br />
                                </div>
                            ) : null}
                            <Dialog>
                                <div className="text-indigo-100 bg-indigo-500 hover:text-white cursor-pointer border-2 border-indigo-500 hover:scale-105 transition-all duration-300 w-fit p-2 rounded-md my-2">
                                    <DialogTrigger >Add Manufacturing Details</DialogTrigger>
                                </div>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Enter Manufacturing Details</DialogTitle>
                                        <DialogDescription className={"flex flex-col gap-3"}>
                                            <input
                                                className="border border-neutral-300 p-2 rounded-md w-full"
                                                type="text"
                                                placeholder="Manufacturing Site"
                                                value={idea.manufacturingSite || ""}
                                                onChange={(e) => {
                                                    setNewIdea({ ...newIdea, manufacturingSite: e.target.value });
                                                    const updated = [...selectedIdea];
                                                    updated[index] = { ...idea, manufacturingSite: e.target.value };
                                                    setSelectedIdea(updated);
                                                }}
                                            />
                                            <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Batch Size" value={newIdea.batchSize} onChange={(e) => {
                                                setNewIdea({ ...newIdea, batchSize: e.target.value });
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, batchSize: e.target.value };
                                                setSelectedIdea(updated);
                                            }} />
                                            <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Production Date" value={newIdea.productionDate} onChange={(e) => {
                                                setNewIdea({ ...newIdea, productionDate: e.target.value });
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, productionDate: e.target.value };
                                                setSelectedIdea(updated);
                                            }} />
                                            <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Expected Output" value={newIdea.expectedOutput} onChange={(e) => {
                                                setNewIdea({ ...newIdea, expectedOutput: e.target.value });
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, expectedOutput: e.target.value };
                                                setSelectedIdea(updated);
                                            }} />
                                            <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="Formulation Type" value={newIdea.formulationType} onChange={(e) => {
                                                setNewIdea({ ...newIdea, formulationType: e.target.value });
                                                const updated = [...selectedIdea];
                                                updated[index] = { ...idea, formulationType: e.target.value };
                                                setSelectedIdea(updated);
                                            }} />
                                            <DialogClose asChild>
                                                <button className="bg-indigo-500 text-white p-2 rounded" variant="outline"

                                                >Save</button>
                                            </DialogClose>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            {idea.testResults == "Pass" && idea.regulatoryApproval === "Approved" && idea.manufacturingSite ? (
                                <div className="flex gap-2 items-center ">
                                    <div className="text-green-500 mt-2">
                                        <strong>Status:</strong> Ready for Production
                                    </div>
                                    <button onClick={() => {
                                        setProductions([...productions, idea])
                                        setNewIdea(idea.filter((_, i) => i !== index))
                                    }
                                    } className='bg-green-500 text-white px-2 py-1 rounded'>Approve</button>
                                </div>
                            ) : (
                                <div className="text-red-500 mt-2">
                                    <strong>Status:</strong> Pending Approval or Manufacturing Details
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Introduction;
