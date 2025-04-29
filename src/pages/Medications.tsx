
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const medicationCategories = [
  { id: "all", name: "All Medications" },
  { id: "antibiotics", name: "Antibiotics" },
  { id: "painkillers", name: "Painkillers" },
  { id: "cardiovascular", name: "Cardiovascular" },
  { id: "respiratory", name: "Respiratory" },
];

const medicationsList = [
  { name: "Amoxicillin", category: "antibiotics", dosage: "500mg", frequency: "3 times daily", stock: 125 },
  { name: "Ibuprofen", category: "painkillers", dosage: "400mg", frequency: "As needed", stock: 300 },
  { name: "Lisinopril", category: "cardiovascular", dosage: "10mg", frequency: "Once daily", stock: 200 },
  { name: "Ventolin", category: "respiratory", dosage: "100mcg", frequency: "As needed", stock: 85 },
  { name: "Azithromycin", category: "antibiotics", dosage: "250mg", frequency: "Once daily", stock: 60 },
  { name: "Paracetamol", category: "painkillers", dosage: "500mg", frequency: "4 times daily", stock: 450 },
  { name: "Atorvastatin", category: "cardiovascular", dosage: "20mg", frequency: "Once daily", stock: 175 },
];

const MedicationCard = ({ medication }: { medication: any }) => (
  <Card className="border-l-4 border-l-medical-primary">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{medication.name}</h3>
          <p className="text-sm text-gray-600">Dosage: {medication.dosage}</p>
          <p className="text-sm text-gray-600">Frequency: {medication.frequency}</p>
        </div>
        <div className="bg-medical-light rounded-full px-3 py-1 text-sm">
          Stock: {medication.stock}
        </div>
      </div>
    </CardContent>
  </Card>
);

const Medications = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredMedications = medicationsList.filter((medication) => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || medication.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Medication Inventory</h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search medications..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-gray-100 p-1 overflow-x-auto flex whitespace-nowrap max-w-full">
            {medicationCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.length > 0 ? (
                filteredMedications.map((medication, index) => (
                  <MedicationCard key={index} medication={medication} />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Pill className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium">No medications found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Medications;
