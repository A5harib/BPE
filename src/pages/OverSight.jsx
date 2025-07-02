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
import { FilePlus, Lock, Unlock, Save, Send, PlusCircle } from "lucide-react";

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

  const handleChange = (key, val) => {
    setDataEntry((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataEntry.siteName || !dataEntry.investigator) {
      toast.error("Site Name and Principal Investigator are required.");
      return;
    }
    const newEntry = { ...dataEntry, id: Date.now() };
    setSiteReports((prev) => [...prev, newEntry]);
    setDataEntry({ siteName: "", investigator: "", notes: "" });
    toast.success("Site report submitted successfully!");
  };

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
              <PlusCircle className="mr-2 h-4 w-4" /> Report Site Selection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Site Report</DialogTitle>
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
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Submitted Reports</h3>
          <div className="border rounded-md">
            {siteReports.length === 0 ? (
              <p className="text-gray-500 italic p-4">No site reports yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigator</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {siteReports.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.siteName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.investigator}</td>
                        <td className="px-6 py-4">{entry.notes}</td>
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

  const handleSubmit = () => {
    if (summary.trim()) {
      setComplianceChecks((prev) => [...prev, { text: summary, id: Date.now() }]);
      setSummary("");
      toast.success("Data review summary submitted.");
    } else {
      toast.error("Summary cannot be empty.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Review Summary</CardTitle>
        <CardDescription>
          Upload summaries of data integrity or safety issues observed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Summarize any data integrity or safety issues..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
        />
        <Button onClick={handleSubmit} className="mt-3">
          <Send className="mr-2 h-4 w-4" /> Submit Summary
        </Button>
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold mb-2">Submitted Summaries</h3>
          {complianceChecks.length > 0 ? (
            complianceChecks.map((item) => (
              <div key={item.id} className="border p-3 rounded-md text-sm bg-gray-50">
                {item.text}
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
  const [complianceStatus, setComplianceStatus] = useState("");

  const handleUnlock = () => {
    if (adminCode === "505") {
      setAdminUnlocked(true);
      setAdminCode("");
      toast.success("Admin Panel Unlocked!");
    } else {
      toast.error("Access denied. Incorrect password.");
    }
  };

  const handleSaveStatus = () => {
    if (complianceStatus) {
      toast.success(`Compliance marked as: ${complianceStatus}`);
      // Here you would typically save this to a backend
      console.log("Compliance Status Saved:", complianceStatus);
    } else {
      toast.warning("Please select a compliance status.");
    }
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
        <CardTitle>Regulatory Compliance Status</CardTitle>
        <CardDescription>
          Set and save the regulatory compliance status for the study.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={complianceStatus} onValueChange={setComplianceStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select compliance result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="revision-needed">Revision Needed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSaveStatus} className="mt-3 w-full">
          <Save className="mr-2 h-4 w-4" /> Save Status
        </Button>
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
        <TabsList className="grid w-full grid-cols-3">
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