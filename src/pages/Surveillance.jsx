import { useState } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Toaster as toast } from "@/components/ui/sonner"


export default function Surveillance() {
    const [reportData, setReportData] = useState({
        age: "",
        gender: "",
        drugName: "",
        dose: "",
        sideEffect: "",
        severity: "",
        riskType: "",
        date: "",
        notes: "",
    });

    const [approvedReports, setApprovedReports] = useState([]);

    const [adminUnlocked, setAdminUnlocked] = useState(false);
    const [adminCode, setAdminCode] = useState("");


    const [submittedReports, setSubmittedReports] = useState([]);

    const handleChange = (field, value) => {
        setReportData({ ...reportData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedReports([...submittedReports, reportData]);
        setReportData({
            age: "",
            gender: "",
            drugName: "",
            dose: "",
            sideEffect: "",
            severity: "",
            riskType: "",
            date: "",
            notes: "",
        });
        alert("Report submitted successfully.");
    };

    return (
        <div className="max-w-xl mx-auto mt-6">
            <div className="text-center mb-4">
                <h2 className="text-lg font-semibold">Surveillance Reporting</h2>
                <p className="text-sm text-gray-600">Please fill out the form below to report an issue.</p>
            </div>
            <Tabs defaultValue="User" className="w-full">
                <TabsList className="w-full justify-center mb-4">
                    <TabsTrigger value="User">User</TabsTrigger>
                    <TabsTrigger value="Admin">Admin</TabsTrigger>
                </TabsList>

                {/* USER TAB */}
                <TabsContent className='' value="User">
                    <Tabs defaultValue="issue-report" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="issue-report">Issue Report</TabsTrigger>
                            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
                        </TabsList>

                        {/* ISSUE REPORT TAB */}
                        <TabsContent value="issue-report">
                            <Dialog>
                                <DialogTrigger className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                    Fill Out Report Form
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>What issues are you facing?</DialogTitle>
                                    </DialogHeader>

                                    <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
                                        {/* Patient Info */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="number"
                                                placeholder="Age"
                                                value={reportData.age}
                                                onChange={(e) => handleChange("age", e.target.value)}
                                                className="w-full p-2 border border-neutral-300 rounded-md"
                                            />

                                            <Select
                                                value={reportData.gender}
                                                onValueChange={(val) => handleChange("gender", val)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Drug Info */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Drug Name"
                                                value={reportData.drugName}
                                                onChange={(e) => handleChange("drugName", e.target.value)}
                                                className="w-full p-2 border border-neutral-300 rounded-md"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Dose (e.g., 500mg)"
                                                value={reportData.dose}
                                                onChange={(e) => handleChange("dose", e.target.value)}
                                                className="w-full p-2 border border-neutral-300 rounded-md"
                                            />
                                        </div>

                                        {/* Side Effect */}
                                        <input
                                            type="text"
                                            placeholder="Side Effect Observed"
                                            value={reportData.sideEffect}
                                            onChange={(e) => handleChange("sideEffect", e.target.value)}
                                            className="w-full p-2 border border-neutral-300 rounded-md"
                                        />

                                        {/* Severity */}
                                        <Select
                                            value={reportData.severity}
                                            onValueChange={(val) => handleChange("severity", val)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Severity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mild">Mild</SelectItem>
                                                <SelectItem value="moderate">Moderate</SelectItem>
                                                <SelectItem value="severe">Severe</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {/* Risk Type */}
                                        <Select
                                            value={reportData.riskType}
                                            onValueChange={(val) => handleChange("riskType", val)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Risk Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="allergic">Allergic Reaction</SelectItem>
                                                <SelectItem value="toxic">Toxic Effect</SelectItem>
                                                <SelectItem value="interaction">Drug Interaction</SelectItem>
                                                <SelectItem value="unknown">Unknown Risk</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {/* Date */}
                                        <input
                                            type="date"
                                            value={reportData.date}
                                            onChange={(e) => handleChange("date", e.target.value)}
                                            className="w-full p-2 border border-neutral-300 rounded-md"
                                        />

                                        {/* Notes */}
                                        <textarea
                                            placeholder="Additional details (optional)"
                                            value={reportData.notes}
                                            onChange={(e) => handleChange("notes", e.target.value)}
                                            className="w-full p-2 border border-neutral-300 rounded-md resize-none"
                                            rows={3}
                                        ></textarea>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600"
                                        >
                                            Submit Report
                                        </button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </TabsContent>

                        {/* MY REPORTS TAB */}
                        <TabsContent value="my-reports">
                            <div className="bg-white p-4 rounded-lg -2xl w-full space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-indigo-600">My Submitted Reports</h2>
                                    <button
                                        onClick={() =>
                                            setSubmittedReports((prev) => [
                                                ...prev,
                                                {
                                                    age: 42,
                                                    gender: "male",
                                                    drugName: "Ibuprofen",
                                                    dose: "400mg",
                                                    sideEffect: "Stomach pain",
                                                    severity: "moderate",
                                                    riskType: "toxic",
                                                    date: new Date().toISOString().slice(0, 10),
                                                    notes: "Patient reported symptoms after 2 days of use.",
                                                },
                                            ])
                                        }
                                        className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200"
                                    >
                                        + Add Mock Data
                                    </button>
                                </div>

                                {submittedReports.length === 0 ? (
                                    <p className="text-gray-500 italic">You haven't submitted any reports yet.</p>
                                ) : (
                                    submittedReports.map((report, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-md p-4 bg-gray-50"
                                        >
                                            <p><strong>Age:</strong> {report.age}</p>
                                            <p><strong>Gender:</strong> {report.gender}</p>
                                            <p><strong>Drug:</strong> {report.drugName} ({report.dose})</p>
                                            <p><strong>Side Effect:</strong> {report.sideEffect}</p>
                                            <p><strong>Severity:</strong> {report.severity}</p>
                                            <p><strong>Risk Type:</strong> {report.riskType}</p>
                                            <p><strong>Date:</strong> {report.date}</p>
                                            {report.notes && <p><strong>Notes:</strong> {report.notes}</p>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                    </Tabs>
                </TabsContent>


                {/* ADMIN TAB */}
                <TabsContent value="Admin">
                    {!adminUnlocked ? (
                        <div className="bg-white p-4 rounded-lg shadow-2xl w-full max-w-md space-y-4">
                            <h2 className="text-xl font-semibold text-indigo-600">Admin Access</h2>
                            <input
                                type="password"
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                                placeholder="Enter Admin Password"
                                className="w-full p-2 border border-neutral-300 rounded-md"
                            />
                            <button
                                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 w-full"
                                onClick={() => {
                                    if (adminCode === "admin505") {
                                        setAdminUnlocked(true);
                                        setAdminCode("");
                                    } else {
                                        alert("Access denied. Incorrect password.");
                                    }
                                }}
                            >
                                Unlock Admin Panel
                            </button>
                        </div>
                    ) : (
                        <Tabs defaultValue="view-reports" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="view-reports">User Reports</TabsTrigger>
                                <TabsTrigger value="submitted-reports">Submitted Reports</TabsTrigger>
                                <TabsTrigger value="change-password">Change Password</TabsTrigger>

                            </TabsList>

                            <TabsContent value="change-password">
                                <div className="bg-white p-4 rounded-lg shadow-2xl w-full">
                                    <h2 className="text-xl font-semibold text-indigo-600 mb-2">Change your password</h2>
                                    <input
                                        type="password"
                                        placeholder="New password"
                                        className="w-full p-2 mb-2 border border-neutral-300 rounded-md"
                                    />
                                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 w-full">
                                        Update Password
                                    </button>
                                </div>
                            </TabsContent>

                            <TabsContent value="view-reports">
                                <div className="bg-white p-4 rounded-lg shadow-2xl w-full space-y-4">
                                    <h2 className="text-xl font-semibold text-indigo-600">Submitted Reports</h2>

                                    {submittedReports.length === 0 ? (
                                        <p className="text-gray-500 italic">No reports submitted yet.</p>
                                    ) : (
                                        submittedReports.map((report, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-md p-4 bg-gray-50 space-y-1"
                                            >
                                                <p><strong>Age:</strong> {report.age}</p>
                                                <p><strong>Gender:</strong> {report.gender}</p>
                                                <p><strong>Drug:</strong> {report.drugName} ({report.dose})</p>
                                                <p><strong>Side Effect:</strong> {report.sideEffect}</p>
                                                <p><strong>Severity:</strong> {report.severity}</p>
                                                <p><strong>Risk Type:</strong> {report.riskType}</p>
                                                <p><strong>Date:</strong> {report.date}</p>
                                                {report.notes && <p><strong>Notes:</strong> {report.notes}</p>}

                                                <div className="flex gap-2 pt-2">
                                                    <button
                                                        onClick={() => {
                                                            setSubmittedReports((prev) =>
                                                                prev.filter((_, i) => i !== index)
                                                            );
                                                            toast({
                                                                title: "Report deleted",
                                                                description: `Report on ${report.drugName} was removed.`,
                                                            });
                                                        }}
                                                        className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSubmittedReports((prev) =>
                                                                prev.filter((_, i) => i !== index)
                                                            );
                                                            setApprovedReports((prev) => [...prev, report]);
                                                            toast({
                                                                title: "Report submitted",
                                                                description: `Forwarded report on ${report.drugName} to relevant authority.`,
                                                            });
                                                        }}
                                                        className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                                                    >
                                                        Submit to Authority
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="submitted-reports">
                                <div className="bg-white p-4 rounded-lg shadow-2xl w-full space-y-4">
                                    <h2 className="text-xl font-semibold text-indigo-600">Submitted to Authority</h2>
                                    {approvedReports.length === 0 ? (
                                        <p className="text-gray-500 italic">No reports submitted to authority yet.</p>
                                    ) : (
                                        approvedReports.map((report, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-md p-4 bg-gray-50"
                                            >
                                                <p><strong>Age:</strong> {report.age}</p>
                                                <p><strong>Gender:</strong> {report.gender}</p>
                                                <p><strong>Drug:</strong> {report.drugName} ({report.dose})</p>
                                                <p><strong>Side Effect:</strong> {report.sideEffect}</p>
                                                <p><strong>Severity:</strong> {report.severity}</p>
                                                <p><strong>Risk Type:</strong> {report.riskType}</p>
                                                <p><strong>Date:</strong> {report.date}</p>
                                                {report.notes && <p><strong>Notes:</strong> {report.notes}</p>}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </TabsContent>

                        </Tabs>
                    )}
                </TabsContent>

            </Tabs>
        </div>
    );
}
