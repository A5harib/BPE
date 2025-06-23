import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";

const Discovery = () => {
    const [diseaseTargetInput, setDiseaseTargetInput] = useState("");
    const [candidateInput, setCandidateInput] = useState("");

    const [diseaseTargets, setDiseaseTargets] = useState(["Covid-19", "Cancer", "Diabetes", "Alzheimer's", "Asthma", "Influenza", "Tuberculosis", "HIV/AIDS", "Malaria"]);
    const [selectedDiseaseTarget, setSelectedDiseaseTarget] = useState([]);
    const [candidates, setCandidates] = useState({ name: "", target: "" });
    const [leads, setLeads] = useState([]);
    const [selectedTarget, setSelectedTarget] = useState("");


    const handleAddTarget = () => {
        if (diseaseTargetInput.trim() === "") return;
        setDiseaseTargets([...diseaseTargets, diseaseTargetInput.trim()]);
        setDiseaseTargetInput("");
    };
    return (
        <div className="m-4">
            <h1 className="text-3xl font-bold underline">Innovative Drug Research</h1>

            <div className="flex flex-col md:flex-row gap-4">

                <div className="m-4  w-72 border border-neutral-300 rounded-lg  shadow-md bg-white overflow-hidden">
                    <div className='w-full bg-indigo-500 text-white p-4 text-center'>Disease Targets</div>
                    <div className="max-h-[60vh] overflow-y-scroll">
                        {diseaseTargets.map((target, index) => (
                            <div key={index} className='p-2 border-b border-neutral-300 flex justify-between items-center'>
                                <div>{target}</div>
                                <div className="flex gap-2">


                                    <button className="bg-red-300 px-3 py-1 rounded-sm grid place-items-center" onClick={() => setDiseaseTargets(diseaseTargets.filter((_, i) => i !== index))}>x</button>
                                    <button className="bg-blue-300 px-3 py-1 rounded-sm grid place-items-center" onClick={() => {
                                        setSelectedDiseaseTarget([...selectedDiseaseTarget, target]);
                                        setDiseaseTargets(diseaseTargets.filter((_, i) => i !== index))
                                    }}>Select</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                        <Sheet>
                            <SheetTrigger className="w-full p-2 border-t border-neutral-300 text-neutral-500 hover:bg-neutral-100">Add Disease Target</SheetTrigger>
                            <SheetContent side="bottom" className="w-96">
                                <SheetHeader>
                                    <SheetTitle>Add new Disease Target</SheetTitle>
                                    <SheetDescription>
                                        <input value={diseaseTargetInput}
                                            onChange={(e) => setDiseaseTargetInput(e.target.value)}
                                            type="text" placeholder="Enter disease target name" className="w-full p-2 border border-neutral-300 rounded-md" />
                                        <button onClick={handleAddTarget} className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">Add Target</button>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="m-4  w-72 border border-neutral-300 rounded-lg max-h-[80vh] shadow-md bg-white overflow-hidden">
                    <div className='w-full bg-indigo-500 text-white p-4 text-center'>Submitted Targets</div>
                    <ul className="max-h-[60vh] overflow-y-scroll">
                        {selectedDiseaseTarget.map((target, index) => (
                            <li key={index} className='p-2 border-b border-neutral-300'>{target}</li>
                        ))}
                    </ul>
                </div>
                <div className="m-4  w-72 border border-neutral-300 rounded-lg max-h-[80vh] shadow-md bg-white overflow-hidden">
                    <div className='w-full bg-indigo-500 text-white p-4 text-center'>Candidate Molecule Design</div>
                    <div className="flex flex-col justify-between">

                        <div className="p-4 border-b border-neutral-300 text-center">
                            {candidates.name ? <div>
                                <h2 className="text-lg font-semibold">Candidate: {candidates.name}</h2>
                                <p className="text-sm text-neutral-500">Target: {candidates.target}</p>
                                <div className="flex flex-col items-center">


                                    <button className="mt-2 bg-red-300 px-3 py-1 rounded-sm" onClick={() => {
                                        setCandidates({ name: "", target: "" });
                                    }}>Remove Candidate</button>
                                    <button className="mt-2 bg-green-300 px-3 py-1 rounded-sm" onClick={() => {
                                        // Submit the candidate
                                        setLeads([...leads, candidates]);
                                        setCandidates({ name: "", target: "", testId: "", testResult: "", performedBy: "" });
                                    }}>Submit Candidate</button>
                                </div>
                            </div> : "No candidate selected"}
                        </div>
                        <div>

                            <Sheet>
                                <SheetTrigger className="w-full p-2 border-t border-neutral-300 text-neutral-500 hover:bg-neutral-100">Add Candidate</SheetTrigger>
                                <SheetContent side="bottom" className="w-96">
                                    <SheetHeader>
                                        <SheetTitle>Add new Candidate</SheetTitle>
                                        <SheetDescription>
                                            <input className="w-full p-2 border border-neutral-300 rounded-md m-2" value={candidateInput} onChange={(e) => setCandidateInput(e.target.value)} placeholder="Enter candidate name" />
                                            <Select className="w-full m-2" value={selectedTarget}
                                                onValueChange={setSelectedTarget}>
                                                <SelectTrigger className="w-[180px] m-2">
                                                    <SelectValue placeholder="Target" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {selectedDiseaseTarget.map((target, index) => (
                                                        <SelectItem key={index} value={target}>{target}</SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                            <button onClick={() => {
                                                if (candidateInput.trim() === "" || selectedTarget === "") return;
                                                setCandidates({ name: candidateInput, target: selectedTarget });
                                                setCandidateInput("");
                                                setSelectedTarget("");

                                                setSelectedDiseaseTarget(selectedDiseaseTarget.filter((t) => t !== selectedTarget));
                                            }} className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">Add Candidate</button>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>



                </div>
                <div className="m-4  w-72 border border-neutral-300 rounded-lg max-h-[80vh] shadow-md bg-white overflow-hidden">
                    <div className='w-full bg-indigo-500 text-white p-4 text-center'>Leads</div>
                    <ul className="max-h-[40vh] overflow-y-scroll">
                        {leads.map((lead, index) => (
                            <li key={index} className='p-2 border-b border-neutral-300'>
                                <div>{lead.name}</div>
                                <div className="text-sm text-neutral-500">Target: {lead.target}</div>
                                {lead.testId ? <div className="text-sm text-neutral-500">Test ID: {lead.testId}</div> : null}

                                {lead.testResult ? <div className="text-sm text-neutral-500">Test Result: {lead.testResult}</div> : null}
                                {lead.performedBy ? <div className="text-sm text-neutral-500">Performed By: {lead.performedBy}</div> : null}
                                <Dialog>
                                    <div className="text-indigo-500 hover:text-indigo-700 cursor-pointer">
                                        <DialogTrigger >Test Outcome for {lead.name} </DialogTrigger>
                                    </div>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Enter Test details</DialogTitle>
                                            <DialogDescription className={"flex flex-col gap-3"}>
                                                <input className="border border-neutral-300 p-2 rounded-md w-full" type="number" placeholder="test ID" value={lead.testId} onChange={(e) => {
                                                    const newLeads = [...leads];
                                                    newLeads[index].testId = e.target.value;
                                                    setLeads(newLeads);
                                                }} />
                                                <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="test result" value={lead.testResult} onChange={(e) => {
                                                    const newLeads = [...leads];
                                                    newLeads[index].testResult = e.target.value;
                                                    setLeads(newLeads);
                                                }} />
                                                <input className="border border-neutral-300 p-2 rounded-md w-full" type="text" placeholder="performed by" value={lead.performedBy} onChange={(e) => {
                                                    const newLeads = [...leads];
                                                    newLeads[index].performedBy = e.target.value;
                                                    setLeads(newLeads);
                                                }} />
                                                <DialogClose asChild>
                                                    <button className="bg-indigo-500 text-white p-2 rounded" variant="outline">Save</button>
                                                </DialogClose>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger className={"text-sm text-blue-500"}>Lab Findings for {lead.name}</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Discovery;
