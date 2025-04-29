
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Pill, AlertCircle } from "lucide-react";

const patientHistory = {
  name: "John Doe",
  age: 45,
  history: [
    {
      date: "2023-10-15",
      type: "visit",
      title: "Regular Checkup",
      doctor: "Dr. Sarah Johnson",
      notes: "Patient reports feeling well. Blood pressure normal at 120/80. Weight stable."
    },
    {
      date: "2023-08-22",
      type: "prescription",
      title: "Prescribed Lisinopril",
      doctor: "Dr. Sarah Johnson",
      medication: "Lisinopril 10mg",
      instructions: "Take once daily in the morning"
    },
    {
      date: "2023-07-10",
      type: "allergy",
      title: "Allergy Identified",
      doctor: "Dr. Michael Chen",
      allergen: "Penicillin",
      reaction: "Skin rash, mild swelling"
    },
    {
      date: "2023-05-05",
      type: "visit",
      title: "Blood Test Results",
      doctor: "Dr. Sarah Johnson",
      notes: "Cholesterol slightly elevated at 210 mg/dL. Recommended dietary changes and follow-up in 3 months."
    },
    {
      date: "2023-02-18",
      type: "prescription",
      title: "Prescribed Amoxicillin",
      doctor: "Dr. Robert Wilson",
      medication: "Amoxicillin 500mg",
      instructions: "Take 3 times daily for 7 days"
    },
  ]
};

const HistoryItem = ({ item }: { item: any }) => {
  const getIcon = () => {
    switch (item.type) {
      case "visit":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "prescription":
        return <Pill className="h-5 w-5 text-purple-500" />;
      case "allergy":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="mb-4 border-l-4 pl-4" style={{ borderLeftColor: item.type === 'visit' ? '#3b82f6' : item.type === 'prescription' ? '#8b5cf6' : '#ef4444' }}>
      <div className="flex items-start">
        <div className="mr-3 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-gray-600">Attending: {item.doctor}</p>
          
          {item.type === 'visit' && (
            <p className="mt-1 text-sm bg-blue-50 p-2 rounded">{item.notes}</p>
          )}
          
          {item.type === 'prescription' && (
            <div className="mt-1 bg-purple-50 p-2 rounded">
              <p className="text-sm"><span className="font-medium">Medication:</span> {item.medication}</p>
              <p className="text-sm"><span className="font-medium">Instructions:</span> {item.instructions}</p>
            </div>
          )}
          
          {item.type === 'allergy' && (
            <div className="mt-1 bg-red-50 p-2 rounded">
              <p className="text-sm"><span className="font-medium">Allergen:</span> {item.allergen}</p>
              <p className="text-sm"><span className="font-medium">Reaction:</span> {item.reaction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MedicalHistory = () => {
  const [activeFilter, setActiveFilter] = React.useState("all");
  
  const filteredHistory = activeFilter === "all" 
    ? patientHistory.history 
    : patientHistory.history.filter(item => item.type === activeFilter);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Medical History</h1>
          <p className="text-gray-600">Patient: {patientHistory.name}, {patientHistory.age} years old</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Patient Timeline</span>
              <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
                <TabsList>
                  <TabsTrigger value="all">All Records</TabsTrigger>
                  <TabsTrigger value="visit">Visits</TabsTrigger>
                  <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
                  <TabsTrigger value="allergy">Allergies</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, index) => (
                  <HistoryItem key={index} item={item} />
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No medical records found for this category</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MedicalHistory;
