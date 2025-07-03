import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Truck,
  Package,
  Building,
  Warehouse,
  Clipboard,
  PlusCircle,
} from "lucide-react";

const SupplyChain = () => {
  const [shipmentData, setShipmentData] = useState([
    { id: "SHP001", origin: "Lahore", destination: "Karachi", status: "In Transit" },
    { id: "SHP002", origin: "Islamabad", destination: "Lahore", status: "Delivered" },
    { id: "SHP003", origin: "Quetta", destination: "Peshawar", status: "Pending" },
  ]);

  const [inventory, setInventory] = useState([
    { item: "Paracetamol", quantity: 1200, location: "Warehouse A" },
    { item: "Ibuprofen", quantity: 800, location: "Warehouse B" },
    { item: "Amoxicillin", quantity: 1500, location: "Warehouse A" },
    { item: "Cough Syrup", quantity: 500, location: "Warehouse C" },
  ]);

  const [supplyManagement, setSupplyManagement] = useState([
    { supplier: "PharmaLink", product: "Prozac", contact: "0300-1234567" },
    { supplier: "MediPlus", product: "Zoloft", contact: "0321-7654321" },
    { supplier: "HealthSupply Co.", product: "Lipitor", contact: "0333-9876543" },
  ]);

  const [warehouseLocations, setWarehouseLocations] = useState([
    { name: "Warehouse A", city: "Lahore", capacity: "80%" },
    { name: "Warehouse B", city: "Karachi", capacity: "65%" },
    { name: "Warehouse C", city: "Multan", capacity: "90%" },
  ]);

  const [supplyReports, setSupplyReports] = useState([
    { date: "2025-06-01", summary: "Monthly supply chain review completed." },
    { date: "2025-05-15", summary: "Inventory restocked for Q2." },
    { date: "2025-04-20", summary: "New supplier 'HealthSupply Co.' onboarded." },
  ]);

  const handleAddShipment = (e) => {
    e.preventDefault();
    const form = e.target;
    const newShipment = {
      id: form.id.value,
      origin: form.origin.value,
      destination: form.destination.value,
      status: form.status.value,
    };
    setShipmentData((prev) => [...prev, newShipment]);
    toast.success("New shipment added!");
    form.reset();
  };

  const handleAddInventory = (e) => {
    e.preventDefault();
    const form = e.target;
    const newItem = {
      item: form.item.value,
      quantity: parseInt(form.quantity.value),
      location: form.location.value,
    };
    setInventory((prev) => [...prev, newItem]);
    toast.success("New inventory item added!");
    form.reset();
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSupplier = {
      supplier: form.supplier.value,
      product: form.product.value,
      contact: form.contact.value,
    };
    setSupplyManagement((prev) => [...prev, newSupplier]);
    toast.success("New supplier added!");
    form.reset();
  };

  const handleAddWarehouse = (e) => {
    e.preventDefault();
    const form = e.target;
    const newWarehouse = {
      name: form.name.value,
      city: form.city.value,
      capacity: form.capacity.value,
    };
    setWarehouseLocations((prev) => [...prev, newWarehouse]);
    toast.success("New warehouse added!");
    form.reset();
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReport = {
      date: form.date.value,
      summary: form.summary.value,
    };
    setSupplyReports((prev) => [...prev, newReport]);
    toast.success("New report added!");
    form.reset();
  };

  const inventoryChartData = inventory.reduce((acc, curr) => {
    const existing = acc.find((item) => item.location === curr.location);
    if (existing) {
      existing.quantity += curr.quantity;
    } else {
      acc.push({ location: curr.location, quantity: curr.quantity });
    }
    return acc;
  }, []);

  const shipmentStatusData = shipmentData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.status === curr.status);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ status: curr.status, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="m-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow-xl max-w-6xl mx-auto font-sans">
      <h1 className="text-5xl font-extrabold text-center text-purple-900 mb-10 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Supply Chain Dashboard
        </span>
      </h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="justify-center bg-purple-200 rounded-full p-2 mb-8 shadow-inner flex flex-wrap gap-3">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">Overview</TabsTrigger>
          <TabsTrigger value="shipment" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">
            <Truck className="h-4 w-4 mr-2" />Shipments
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">
            <Package className="h-4 w-4 mr-2" />Inventory
          </TabsTrigger>
          <TabsTrigger value="management" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">
            <Building className="h-4 w-4 mr-2" />Supply Management
          </TabsTrigger>
          <TabsTrigger value="warehouses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">
            <Warehouse className="h-4 w-4 mr-2" />Warehouses
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-5 py-2 transition-all duration-300">
            <Clipboard className="h-4 w-4 mr-2" />Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg border-purple-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                <Truck className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-800">{shipmentData.length}</div>
                <p className="text-xs text-muted-foreground">Currently tracking</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-purple-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
                <Package className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-800">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">Unique items across warehouses</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-purple-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
                <Building className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-800">{supplyManagement.length}</div>
                <p className="text-xs text-muted-foreground">Partners in supply</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-purple-300 p-4">
              <CardHeader>
                <CardTitle>Inventory by Location</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#8884d8" name="Total Quantity" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-purple-300 p-4">
              <CardHeader>
                <CardTitle>Shipment Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shipmentStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" name="Number of Shipments" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipment">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Shipment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddShipment} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">ID</Label>
                  <Input name="id" placeholder="SHP00X" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="origin" className="text-right">Origin</Label>
                  <Input name="origin" placeholder="City A" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-right">Destination</Label>
                  <Input name="destination" placeholder="City B" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select name="status" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Save Shipment</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="shadow-lg border-purple-300">
            <CardHeader>
              <CardTitle>Shipment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipmentData.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.id}</TableCell>
                      <TableCell>{s.origin}</TableCell>
                      <TableCell>{s.destination}</TableCell>
                      <TableCell>{s.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Inventory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddInventory} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="item" className="text-right">Item Name</Label>
                  <Input name="item" placeholder="Item Name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input name="quantity" type="number" placeholder="Quantity" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input name="location" placeholder="Warehouse X" required className="col-span-3" />
                </div>
                <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Save Inventory</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="shadow-lg border-purple-300">
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSupplier} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">Supplier Name</Label>
                  <Input name="supplier" placeholder="Supplier Name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product" className="text-right">Product</Label>
                  <Input name="product" placeholder="Product" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">Contact</Label>
                  <Input name="contact" placeholder="Contact Number" required className="col-span-3" />
                </div>
                <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Save Supplier</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="shadow-lg border-purple-300">
            <CardHeader>
              <CardTitle>Supply Management Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Supplier</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplyManagement.map((entry, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{entry.supplier}</TableCell>
                      <TableCell>{entry.product}</TableCell>
                      <TableCell>{entry.contact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Warehouse
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Warehouse</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddWarehouse} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Warehouse Name</Label>
                  <Input name="name" placeholder="Warehouse Name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">City</Label>
                  <Input name="city" placeholder="City" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">Capacity</Label>
                  <Input name="capacity" placeholder="e.g., 75%" required className="col-span-3" />
                </div>
                <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Save Warehouse</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="shadow-lg border-purple-300">
            <CardHeader>
              <CardTitle>Warehouse Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Capacity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warehouseLocations.map((loc, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{loc.name}</TableCell>
                      <TableCell>{loc.city}</TableCell>
                      <TableCell>{loc.capacity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Report</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReport} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input name="date" type="date" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="summary" className="text-right">Summary</Label>
                  <Textarea name="summary" placeholder="Summary of the report" required className="col-span-3" rows="3" />
                </div>
                <Button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Save Report</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Card className="shadow-lg border-purple-300">
            <CardHeader>
              <CardTitle>Supply Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Date</TableHead>
                    <TableHead>Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplyReports.map((report, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{report.date}</TableCell>
                      <TableCell>{report.summary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChain;