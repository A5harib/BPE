import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ClinicalStudyOversight() {
  const [adminCode, setAdminCode] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const [siteReports, setSiteReports] = useState([]);
  const [complianceChecks, setComplianceChecks] = useState([]);
  const [dataEntry, setDataEntry] = useState({
    siteName: "",
    investigator: "",
    patientSafety: "",
    dataIntegrity: "",
    complianceStatus: "",
    notes: "",
  });

  const handleChange = (key, val) => {
    setDataEntry((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...dataEntry };
    setSiteReports((prev) => [...prev, newEntry]);
    setDataEntry({
      siteName: "",
      investigator: "",
      patientSafety: "",
      dataIntegrity: "",
      complianceStatus: "",
      notes: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">Clinical Study Oversight</h2>
        <p className="text-sm text-gray-600">
          Manage data from Clinical Managers, CRAs, and Regulatory Affairs.
        </p>
      </div>

      <Tabs defaultValue="ClinicalManager" className="w-full">
        <TabsList className="w-full justify-center mb-4">
          <TabsTrigger value="ClinicalManager">Clinical Manager</TabsTrigger>
          <TabsTrigger value="CRA">CRA</TabsTrigger>
          <TabsTrigger value="Regulatory">Regulatory Affairs</TabsTrigger>
        </TabsList>

        {/* Clinical Manager Tab */}
        <TabsContent value="ClinicalManager">
          <Dialog>
            <DialogTrigger className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              Report Site Selection
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Site Selection and Planning</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Site Name"
                  value={dataEntry.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Principal Investigator"
                  value={dataEntry.investigator}
                  onChange={(e) => handleChange("investigator", e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md"
                />
                <textarea
                  placeholder="Notes on planning"
                  value={dataEntry.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md resize-none"
                  rows={3}
                ></textarea>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600"
                >
                  Submit
                </button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-6 space-y-4">
            {siteReports.length === 0 ? (
              <p className="text-gray-500 italic">No site reports yet.</p>
            ) : (
              siteReports.map((entry, idx) => (
                <div key={idx} className="border p-4 rounded-md bg-gray-50">
                  <p><strong>Site:</strong> {entry.siteName}</p>
                  <p><strong>Investigator:</strong> {entry.investigator}</p>
                  {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* CRA Tab */}
        <TabsContent value="CRA">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Upload Data Review Summary</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={5}
              placeholder="Summarize any data integrity or safety issues observed during the trial."
              value={dataEntry.dataIntegrity}
              onChange={(e) => handleChange("dataIntegrity", e.target.value)}
            ></textarea>
            <button
              className="bg-indigo-500 text-white mt-3 py-2 px-4 rounded-md hover:bg-indigo-600"
              onClick={() => {
                if (dataEntry.dataIntegrity) {
                  setComplianceChecks((prev) => [...prev, dataEntry.dataIntegrity]);
                  handleChange("dataIntegrity", "");
                }
              }}
            >
              Submit Summary
            </button>
            <div className="mt-4 space-y-2">
              {complianceChecks.map((item, i) => (
                <div key={i} className="border p-2 rounded-md text-sm bg-gray-50">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Regulatory Tab */}
        <TabsContent value="Regulatory">
          {!adminUnlocked ? (
            <div className="bg-white p-4 rounded-lg shadow w-full max-w-md space-y-4">
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
                  if (adminCode === "505") {
                    setAdminUnlocked(true);
                    setAdminCode("");
                  } else {
                    alert("Access denied. Incorrect password.");
                  }
                }}
              >
                Unlock Panel
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Regulatory Compliance Status</h3>
              <Select
                value={dataEntry.complianceStatus}
                onValueChange={(val) => handleChange("complianceStatus", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select compliance result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="revision-needed">Revision Needed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => {
                  if (dataEntry.complianceStatus) {
                    alert(`Compliance marked as: ${dataEntry.complianceStatus}`);
                    handleChange("complianceStatus", "");
                  }
                }}
                className="mt-3 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 w-full"
              >
                Save Status
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}