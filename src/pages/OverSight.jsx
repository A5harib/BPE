import React, { useState, useEffect } from "react";
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
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FilePlus, Lock, Unlock, Save, Send, PlusCircle, Edit, Trash2, Eye, Search, CalendarCheck, File, Upload } from "lucide-react";

// Custom hook for using localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Clinical Manager Tab Content
const ClinicalManagerTab = () => {
  const [siteReports, setSiteReports] = useLocalStorage("siteReports", []);
  const [dataEntry, setDataEntry] = useState({
    siteName: "",
    investigator: "",
    notes: "",
  });
  const [editingReport, setEditingReport] = useState(null); // State to hold the report being edited
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (key, val) => {
    setDataEntry((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataEntry.siteName || !dataEntry.investigator) {
      toast.error("Site Name and Principal Investigator are required.");
      return;
    }

    if (editingReport) {
      // Update existing report
      setSiteReports((prev) =>
        prev.map((report) =>
          report.id === editingReport.id ? { ...dataEntry, id: report.id } : report
        )
      );
      toast.success("Site report updated successfully!");
      setEditingReport(null);
    } else {
      // Add new report
      const newEntry = { ...dataEntry, id: Date.now() };
      setSiteReports((prev) => [...prev, newEntry]);
      toast.success("Site report submitted successfully!");
    }
    setDataEntry({ siteName: "", investigator: "", notes: "" });
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setDataEntry({
      siteName: report.siteName,
      investigator: report.investigator,
      notes: report.notes,
    });
  };

  const handleDelete = (id) => {
    setSiteReports((prev) => prev.filter((report) => report.id !== id));
    toast.success("Site report deleted successfully!");
  };

  const filteredReports = siteReports.filter(
    (report) =>
      report.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.investigator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Selection & Planning</CardTitle>
        <CardDescription>
          Manage and report site selection and planning details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> {editingReport ? "Edit Site Report" : "Report Site Selection"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingReport ? "Edit Site Report" : "Add New Site Report"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <Input
                placeholder="Site Name"
                value={dataEntry.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
              <Input
                placeholder="Principal Investigator"
                value={dataEntry.investigator}
                onChange={(e) => handleChange("investigator", e.target.value)}
              />
              <Textarea
                placeholder="Notes on planning"
                value={dataEntry.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">{editingReport ? "Update" : "Submit"}</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative mt-6 mb-4">
          <Input
            placeholder="Search by site or investigator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Submitted Reports</h3>
          <div className="border rounded-md">
            {filteredReports.length === 0 ? (
              <p className="text-gray-500 italic p-4">No site reports yet or no matches found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigator</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.siteName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.investigator}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Site Report Details</DialogTitle>
                                <DialogDescription>
                                  Detailed information for {entry.siteName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2">
                                <p><strong>Site Name:</strong> {entry.siteName}</p>
                                <p><strong>Principal Investigator:</strong> {entry.investigator}</p>
                                <p><strong>Notes:</strong> {entry.notes}</p>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(entry)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// CRA Tab Content
const CRATab = () => {
  const [complianceChecks, setComplianceChecks] = useLocalStorage("complianceChecks", []);
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("general");
  const [editingCheck, setEditingCheck] = useState(null);

  const handleSubmit = () => {
    if (summary.trim()) {
      if (editingCheck) {
        setComplianceChecks((prev) =>
          prev.map((check) =>
            check.id === editingCheck.id ? { ...check, text: summary, category: category } : check
          )
        );
        toast.success("Compliance summary updated.");
        setEditingCheck(null);
      } else {
        setComplianceChecks((prev) => [...prev, { text: summary, category: category, id: Date.now() }]);
        toast.success("Data review summary submitted.");
      }
      setSummary("");
      setCategory("general");
    } else {
      toast.error("Summary cannot be empty.");
    }
  };

  const handleEdit = (check) => {
    setEditingCheck(check);
    setSummary(check.text);
    setCategory(check.category);
  };

  const handleDelete = (id) => {
    setComplianceChecks((prev) => prev.filter((check) => check.id !== id));
    toast.success("Compliance summary deleted.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Review & Compliance Checks</CardTitle>
        <CardDescription>
          Upload summaries of data integrity or safety issues observed and categorize them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Textarea
            placeholder="Summarize any data integrity or safety issues..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="data-integrity">Data Integrity</SelectItem>
              <SelectItem value="patient-safety">Patient Safety</SelectItem>
              <SelectItem value="protocol-deviation">Protocol Deviation</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} className="w-full">
            <Send className="mr-2 h-4 w-4" /> {editingCheck ? "Update Summary" : "Submit Summary"}
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold mb-2">Submitted Summaries</h3>
          {complianceChecks.length > 0 ? (
            complianceChecks.map((item) => (
              <div key={item.id} className="border p-3 rounded-md text-sm bg-gray-50 flex justify-between items-start">
                <div>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p>{item.text}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No summaries submitted yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Regulatory Tab Content
const RegulatoryTab = () => {
  const [adminUnlocked, setAdminUnlocked] = useLocalStorage("adminUnlocked", false);
  const [adminCode, setAdminCode] = useState("");
  const [complianceStatus, setComplianceStatus] = useLocalStorage("complianceStatus", "");
  const [auditLog, setAuditLog] = useLocalStorage("regulatoryAuditLog", []);
  const [documents, setDocuments] = useLocalStorage("regulatoryDocuments", []);
  const [newDocName, setNewDocName] = useState("");
  const [newDocLink, setNewDocLink] = useState("");
  const [milestones, setMilestones] = useLocalStorage("regulatoryMilestones", []);
  const [newMilestoneDesc, setNewMilestoneDesc] = useState("");
  const [newMilestoneDueDate, setNewMilestoneDueDate] = useState("");

  const handleUnlock = () => {
    if (adminCode === "505") { // This would be a more secure check in a real app
      setAdminUnlocked(true);
      setAdminCode("");
      toast.success("Admin Panel Unlocked!");
    } else {
      toast.error("Access denied. Incorrect password.");
    }
  };

  const handleSaveStatus = () => {
    if (complianceStatus) {
      const newLogEntry = {
        type: "status_change",
        status: complianceStatus,
        timestamp: new Date().toLocaleString(),
        notes: `Compliance status updated to: ${complianceStatus.replace(/-/g, ' ')}.`,
      };
      setAuditLog((prev) => [...prev, newLogEntry]);
      toast.success(`Compliance marked as: ${complianceStatus.replace(/-/g, ' ')}`);
    } else {
      toast.warning("Please select a compliance status.");
    }
  };

  const handleLock = () => {
    setAdminUnlocked(false);
    toast.info("Admin Panel Locked.");
  };

  const handleAddDocument = () => {
    if (newDocName.trim() && (newDocLink.trim() || newDocName.trim())) { // Name is always required, link is optional for simulation
      const newDoc = {
        id: Date.now(),
        name: newDocName.trim(),
        link: newDocLink.trim(),
        uploadedAt: new Date().toLocaleString(),
      };
      setDocuments((prev) => [...prev, newDoc]);
      setAuditLog((prev) => [...prev, {
        type: "document_added",
        timestamp: new Date().toLocaleString(),
        notes: `Document added: "${newDoc.name}".`,
      }]);
      setNewDocName("");
      setNewDocLink("");
      toast.success("Document added successfully!");
    } else {
      toast.error("Document name is required.");
    }
  };

  const handleDeleteDocument = (id) => {
    const deletedDoc = documents.find(doc => doc.id === id);
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setAuditLog((prev) => [...prev, {
      type: "document_deleted",
      timestamp: new Date().toLocaleString(),
      notes: `Document deleted: "${deletedDoc?.name || 'Unknown Document'}".`,
    }]);
    toast.success("Document deleted successfully!");
  };

  const handleAddMilestone = () => {
    if (newMilestoneDesc.trim() && newMilestoneDueDate.trim()) {
      const newMilestone = {
        id: Date.now(),
        description: newMilestoneDesc.trim(),
        dueDate: newMilestoneDueDate.trim(),
        completed: false,
      };
      setMilestones((prev) => [...prev, newMilestone]);
      setAuditLog((prev) => [...prev, {
        type: "milestone_added",
        timestamp: new Date().toLocaleString(),
        notes: `Milestone added: "${newMilestone.description}" due by ${newMilestone.dueDate}.`,
      }]);
      setNewMilestoneDesc("");
      setNewMilestoneDueDate("");
      toast.success("Milestone added successfully!");
    } else {
      toast.error("Milestone description and due date are required.");
    }
  };

  const handleToggleMilestoneCompletion = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
    const toggledMilestone = milestones.find(m => m.id === id);
    setAuditLog((prev) => [...prev, {
      type: toggledMilestone.completed ? "milestone_completed" : "milestone_reopened",
      timestamp: new Date().toLocaleString(),
      notes: `Milestone "${toggledMilestone.description}" marked as ${toggledMilestone.completed ? 'completed' : 'reopened'}.`,
    }]);
    toast.success(`Milestone "${toggledMilestone.description}" marked as ${toggledMilestone.completed ? 'completed' : 'reopened'}.`);
  };

  const handleDeleteMilestone = (id) => {
    const deletedMilestone = milestones.find(m => m.id === id);
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setAuditLog((prev) => [...prev, {
      type: "milestone_deleted",
      timestamp: new Date().toLocaleString(),
      notes: `Milestone deleted: "${deletedMilestone?.description || 'Unknown Milestone'}".`,
    }]);
    toast.success("Milestone deleted successfully!");
  };

  if (!adminUnlocked) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2" /> Admin Access Required
          </CardTitle>
          <CardDescription>
            Enter the password to manage regulatory compliance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Enter Admin Password"
          />
          <Button onClick={handleUnlock} className="w-full">
            <Unlock className="mr-2 h-4 w-4" /> Unlock Panel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regulatory Affairs Dashboard</CardTitle>
        <CardDescription>
          Manage regulatory documents, track compliance status, and oversee key milestones.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compliance Status Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5" /> Compliance Status
          </h3>
          <div className="flex items-center space-x-2 mb-4">
            <p className="font-medium">Current Status:</p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                complianceStatus === "approved" ? "bg-green-100 text-green-800" :
                complianceStatus === "revision-needed" ? "bg-yellow-100 text-yellow-800" :
                complianceStatus === "rejected" ? "bg-red-100 text-red-800" :
                complianceStatus === "needs-review" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>
              {complianceStatus ? complianceStatus.replace(/-/g, ' ').toUpperCase() : "N/A"}
            </span>
          </div>

          <Select value={complianceStatus} onValueChange={setComplianceStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select compliance result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="revision-needed">Revision Needed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="needs-review">Needs Review</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2 mt-3">
            <Button onClick={handleSaveStatus} className="flex-1">
              <Save className="mr-2 h-4 w-4" /> Save Status
            </Button>
            <Button variant="outline" onClick={handleLock}>
              <Lock className="mr-2 h-4 w-4" /> Lock Panel
            </Button>
          </div>
        </div>

        <hr className="my-6" />

        {/* Document Management Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <FilePlus className="mr-2 h-5 w-5" /> Document Management
          </h3>
          <div className="flex items-end space-x-2 mb-4">
            <div className="grid gap-2 flex-1">
              <label htmlFor="doc-name" className="text-sm font-medium">Document Name</label>
              <Input
                id="doc-name"
                placeholder="e.g., IRB Approval Letter, Protocol V2.0"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 flex-1">
              <label htmlFor="doc-link" className="text-sm font-medium">Document Link (Optional)</label>
              <Input
                id="doc-link"
                placeholder="e.g., https://docs.example.com/irb_letter"
                value={newDocLink}
                onChange={(e) => setNewDocLink(e.target.value)}
              />
            </div>
            <Button onClick={handleAddDocument}>
              <Upload className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </div>

          <div className="border rounded-md mt-4">
            {documents.length === 0 ? (
              <p className="text-gray-500 italic p-4">No documents added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{doc.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {doc.link ? (
                            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                              <Link className="h-4 w-4 mr-1" /> View
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{doc.uploadedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteDocument(doc.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Document</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* Regulatory Milestones Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5" /> Regulatory Milestones
          </h3>
          <div className="flex items-end space-x-2 mb-4">
            <div className="grid gap-2 flex-1">
              <label htmlFor="milestone-desc" className="text-sm font-medium">Milestone Description</label>
              <Input
                id="milestone-desc"
                placeholder="e.g., Submit IND Application, Receive Ethics Approval"
                value={newMilestoneDesc}
                onChange={(e) => setNewMilestoneDesc(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="milestone-date" className="text-sm font-medium">Due Date</label>
              <Input
                id="milestone-date"
                type="date"
                value={newMilestoneDueDate}
                onChange={(e) => setNewMilestoneDueDate(e.target.value)}
              />
            </div>
            <Button onClick={handleAddMilestone}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Milestone
            </Button>
          </div>

          <div className="border rounded-md mt-4">
            {milestones.length === 0 ? (
              <p className="text-gray-500 italic p-4">No milestones added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {milestones.map((milestone) => (
                      <tr key={milestone.id}>
                        <td className={`px-6 py-4 ${milestone.completed ? 'line-through text-gray-500' : ''}`}>{milestone.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{milestone.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            milestone.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {milestone.completed ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleToggleMilestoneCompletion(milestone.id)}>
                            {milestone.completed ? 'Reopen' : 'Complete'}
                          </Button>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteMilestone(milestone.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Milestone</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* Compliance Audit Log Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <Lock className="mr-2 h-5 w-5" /> Compliance Audit Log
          </h3>
          {auditLog.length === 0 ? (
            <p className="text-gray-500 italic">No audit entries yet.</p>
          ) : (
            <div className="border rounded-md p-3 max-h-48 overflow-y-auto bg-gray-50 text-sm">
              {auditLog.slice().reverse().map((log, index) => ( // Display in reverse chronological order
                <div key={index} className="mb-1 pb-1 border-b last:border-b-0 border-gray-100">
                  <span className="font-medium text-gray-700">[{log.timestamp}]</span>{" "}
                  <span className="font-semibold text-gray-800 capitalize">{log.type.replace(/_/g, ' ')}:</span>{" "}
                  {log.notes}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};



export default function ClinicalStudyOversight() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Clinical Study Oversight</h1>
        <p className="text-muted-foreground">
          Manage data from Clinical Managers, CRAs, and Regulatory Affairs.
        </p>
      </div>

      <Tabs defaultValue="ClinicalManager" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="ClinicalManager">Clinical Manager</TabsTrigger>
          <TabsTrigger value="CRA">CRA</TabsTrigger>
          <TabsTrigger value="Regulatory">Regulatory Affairs</TabsTrigger>
        </TabsList>

        <TabsContent value="ClinicalManager" className="mt-4">
          <ClinicalManagerTab />
        </TabsContent>

        <TabsContent value="CRA" className="mt-4">
          <CRATab />
        </TabsContent>

        <TabsContent value="Regulatory" className="mt-4">
          <RegulatoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}