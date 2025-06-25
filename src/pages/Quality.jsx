import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";


const Quality = () => {
    const [products, setProducts] = useState([
        { name: "prozac", description: "antidepressant", lastChecked: "2024-05-12", effectiveness: "High" },
        { name: "zoloft", description: "antidepressant", lastChecked: "2024-04-28", effectiveness: "Medium" },
        { name: "paracetamol", description: "pain reliever", lastChecked: "2024-06-01", effectiveness: "High" },
        { name: "ibuprofen", description: "anti-inflammatory", lastChecked: "2024-05-20", effectiveness: "Medium" },
        { name: "amoxicillin", description: "antibiotic", lastChecked: "2024-03-15", effectiveness: "High" },
        { name: "metformin", description: "diabetes medication", lastChecked: "2024-05-30", effectiveness: "Medium" },
        { name: "lisinopril", description: "blood pressure medication", lastChecked: "2024-04-10", effectiveness: "High" },
        { name: "atorvastatin", description: "cholesterol medication", lastChecked: "2024-05-05", effectiveness: "Medium" },
    ]);
    const [qualityChecks, setQualityChecks] = useState([]);
    const updateCheck = (productName, field, value) => {
        setQualityChecks(prev => {
            const existingIndex = prev.findIndex(item => item.productName === productName);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex][field] = value;
                return updated;
            } else {
                return [...prev, { productName, [field]: value }];
            }
        });
    };


    return (
        <div className='  '>
            <h1 className='text-3xl font-bold text-center my-5 underline'>Product Quality Management</h1>
            <p className='text-center text-gray-700 '>Manage and monitor the quality of pharmaceutical products with real-time updates and checks.</p>
            <div className="flex w-full">

                <div className=' flex-1/2 rounded-lg shadow-2xl overflow-hidden bg-white max-w-3xl  m-10'>
                    <div className='bg-indigo-500 p-4 text-white text-center text-xl font-bold'>
                        Current Products
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50">
                        {products.map((product, index) => (
                            <div key={index} className='bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-lg transition'>
                                <h3 className='text-lg font-semibold text-indigo-700 mb-1'>{product.name}</h3>
                                <p className='text-sm text-gray-600 mb-1'>{product.description}</p>
                                <p className='text-xs text-gray-500 mb-1'>Last Checked: <span className="font-medium">{product.lastChecked}</span></p>
                                <p className={`text-xs font-semibold ${product.effectiveness === "High" ? "text-green-600" : "text-yellow-600"}`}>
                                    Effectiveness: {product.effectiveness}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex-1/3 rounded-lg shadow-2xl overflow-hidden bg-white max-w-3xl  m-10'>
                    <div className='bg-indigo-500 p-4 text-white text-center text-xl font-bold'>
                        New Quality Check
                    </div>
                    <div className="p-4 space-y-4 flex flex-col gap-2">
                        {products.map((product, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <button
                                        className="px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition font-medium shadow-sm"
                                    >
                                        {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                                    </button>

                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>New Quality Check: {product.name}</DialogTitle>
                                    </DialogHeader>

                                    {(() => {
                                        const check = qualityChecks.find(q => q.productName === product.name) || {};

                                        return (
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <label className="block text-sm font-medium">Batch Number</label>
                                                    <input
                                                        type="text"
                                                        value={check.batchNumber || ""}
                                                        onChange={(e) => updateCheck(product.name, "batchNumber", e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-md border-gray-300"
                                                        placeholder="Enter batch number"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="block text-sm font-medium">Comments / Description</label>
                                                    <textarea
                                                        value={check.comments || ""}
                                                        onChange={(e) => updateCheck(product.name, "comments", e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-md border-gray-300"
                                                        placeholder="Additional notes"
                                                        rows="3"
                                                    ></textarea>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="block text-sm font-medium">Type of Test</label>
                                                    <Select
                                                        value={check.testType || ""}
                                                        onValueChange={(value) => updateCheck(product.name, "testType", value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select test type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="microbiology">Microbiology</SelectItem>
                                                            <SelectItem value="chemical">Chemical</SelectItem>
                                                            <SelectItem value="stability">Stability</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="block text-sm font-medium">Result</label>
                                                    <Select
                                                        value={check.result || ""}
                                                        onValueChange={(value) => updateCheck(product.name, "result", value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Pass or Fail" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pass">Pass</SelectItem>
                                                            <SelectItem value="fail">Fail</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>

                                                    <DialogClose className="">

                                                        <Button className="w-full" onClick={() => console.log("Saved:", check)}>
                                                            Save Quality Data
                                                        </Button>
                                                    </DialogClose>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </DialogContent>

                            </Dialog>
                        ))}
                    </div>


                </div>
                {qualityChecks.length > 0 && (
                    <div className="rounded-lg shadow-2xl overflow-hidden  max-w-5xl m-10 w-full">
                        <div className="bg-indigo-500 p-4 text-white text-center text-xl font-bold">
                            Quality Check Summary
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
                            {qualityChecks.map((check, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition"
                                >
                                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">{check.productName}</h3>

                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-medium text-gray-900">Batch:</span> {check.batchNumber || "-"}
                                    </p>

                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-medium text-gray-900">Description:</span>{" "}
                                        {check.comments || "-"}
                                    </p>

                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-medium text-gray-900">Test Type:</span> {check.testType || "-"}
                                    </p>

                                    <p
                                        className={`text-sm font-medium ${check.result === "pass"
                                            ? "text-green-600"
                                            : check.result === "fail"
                                                ? "text-red-600"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        Result: {check.result || "-"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Quality;
