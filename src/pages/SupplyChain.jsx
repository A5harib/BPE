import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SupplyChain = () => {
  const [shipmentData, setShipmentData] = useState([
    { id: "SHP001", origin: "Lahore", destination: "Karachi", status: "In Transit" },
    { id: "SHP002", origin: "Islamabad", destination: "Lahore", status: "Delivered" },
  ]);

  const [inventory, setInventory] = useState([
    { item: "Paracetamol", quantity: 1200, location: "Warehouse A" },
    { item: "Ibuprofen", quantity: 800, location: "Warehouse B" },
  ]);

  const [supplyManagement, setSupplyManagement] = useState([
    { supplier: "PharmaLink", product: "Prozac", contact: "0300-1234567" },
    { supplier: "MediPlus", product: "Zoloft", contact: "0321-7654321" },
  ]);

  const [warehouseLocations, setWarehouseLocations] = useState([
    { name: "Warehouse A", city: "Lahore", capacity: "80%" },
    { name: "Warehouse B", city: "Karachi", capacity: "65%" },
  ]);

  const [supplyReports, setSupplyReports] = useState([
    { date: "2025-06-01", summary: "Monthly supply chain review completed." },
    { date: "2025-05-15", summary: "Inventory restocked for Q2." },
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
    setShipmentData(prev => [...prev, newShipment]);
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
    setInventory(prev => [...prev, newItem]);
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
    setSupplyManagement(prev => [...prev, newSupplier]);
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
    setWarehouseLocations(prev => [...prev, newWarehouse]);
    form.reset();
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    const form = e.target;
    const newReport = {
      date: form.date.value,
      summary: form.summary.value,
    };
    setSupplyReports(prev => [...prev, newReport]);
    form.reset();
  };

  return (
    <div className="m-6 p-6 bg-white rounded-2xl shadow-lg max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">
        Supply Chain Dashboard
      </h1>

      <Tabs defaultValue="shipment">
        <TabsList className="justify-center bg-purple-100 rounded-xl p-2 mb-6 shadow-inner flex flex-wrap gap-2">
          <TabsTrigger value="shipment">Shipment</TabsTrigger>
          <TabsTrigger value="inventory">View Inventory</TabsTrigger>
          <TabsTrigger value="management">Supply Management</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouse Locations</TabsTrigger>
          <TabsTrigger value="reports">Supply Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="shipment">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">+ Add Shipment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Shipment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddShipment} className="space-y-3">
                <input name="id" placeholder="ID" required className="w-full border px-3 py-2 rounded-md" />
                <input name="origin" placeholder="Origin" required className="w-full border px-3 py-2 rounded-md" />
                <input name="destination" placeholder="Destination" required className="w-full border px-3 py-2 rounded-md" />
                <select name="status" required className="w-full border px-3 py-2 rounded-md">
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <Button type="submit" className="w-full mt-2">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shipmentData.map((s, i) => (
              <div key={i} className="p-5 rounded-xl shadow border border-purple-200">
                <p className="text-xl font-bold text-purple-700">🚚 {s.id}</p>
                <p><strong>From:</strong> {s.origin}</p>
                <p><strong>To:</strong> {s.destination}</p>
                <p><strong>Status:</strong> {s.status}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">+ Add Inventory</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddInventory} className="space-y-3">
                <input name="item" placeholder="Item Name" required className="w-full border px-3 py-2 rounded-md" />
                <input name="quantity" type="number" placeholder="Quantity" required className="w-full border px-3 py-2 rounded-md" />
                <input name="location" placeholder="Location" required className="w-full border px-3 py-2 rounded-md" />
                <Button type="submit" className="w-full mt-2">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inventory.map((item, i) => (
              <div key={i} className="p-5 rounded-xl shadow border border-purple-200">
                <p className="text-xl font-bold text-purple-700">📦 {item.item}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Location:</strong> {item.location}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="management">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">+ Add Supplier</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSupplier} className="space-y-3">
                <input name="supplier" placeholder="Supplier Name" required className="w-full border px-3 py-2 rounded-md" />
                <input name="product" placeholder="Product" required className="w-full border px-3 py-2 rounded-md" />
                <input name="contact" placeholder="Contact" required className="w-full border px-3 py-2 rounded-md" />
                <Button type="submit" className="w-full mt-2">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplyManagement.map((entry, i) => (
              <div key={i} className="p-5 rounded-xl shadow border border-purple-200">
                <p className="text-xl font-bold text-purple-700">🏢 {entry.supplier}</p>
                <p><strong>Product:</strong> {entry.product}</p>
                <p><strong>Contact:</strong> {entry.contact}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="warehouses">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">+ Add Warehouse</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Warehouse</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddWarehouse} className="space-y-3">
                <input name="name" placeholder="Warehouse Name" required className="w-full border px-3 py-2 rounded-md" />
                <input name="city" placeholder="City" required className="w-full border px-3 py-2 rounded-md" />
                <input name="capacity" placeholder="Capacity" required className="w-full border px-3 py-2 rounded-md" />
                <Button type="submit" className="w-full mt-2">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {warehouseLocations.map((loc, i) => (
              <div key={i} className="p-5 rounded-xl shadow border border-purple-200">
                <p className="text-xl font-bold text-purple-700">🏬 {loc.name}</p>
                <p><strong>City:</strong> {loc.city}</p>
                <p><strong>Capacity:</strong> {loc.capacity}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">+ Add Report</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Report</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReport} className="space-y-3">
                <input name="date" type="date" required className="w-full border px-3 py-2 rounded-md" />
                <textarea name="summary" placeholder="Summary" required className="w-full border px-3 py-2 rounded-md" rows="3" />
                <Button type="submit" className="w-full mt-2">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplyReports.map((report, i) => (
              <div key={i} className="p-5 rounded-xl shadow border border-purple-200">
                <p className="text-xl font-bold text-purple-700">📝 {report.date}</p>
                <p>{report.summary}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChain;
