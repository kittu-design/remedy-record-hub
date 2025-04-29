
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, User, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Patient = {
  id: string;
  name: string;
  age: number;
  status: "Scheduled" | "Completed" | "Canceled";
  lastVisit: string;
  image: string;
};

const dummyPatients: Patient[] = [
  {
    id: "1",
    name: "Emma Wilson",
    age: 32,
    status: "Scheduled",
    lastVisit: "2025-04-25",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "2",
    name: "James Peterson",
    age: 45,
    status: "Completed",
    lastVisit: "2025-04-24",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
  },
  {
    id: "3",
    name: "Sophie Chen",
    age: 28,
    status: "Canceled",
    lastVisit: "2025-04-22",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
  {
    id: "4",
    name: "Michael Roberts",
    age: 51,
    status: "Scheduled",
    lastVisit: "2025-04-20",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
];

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Canceled: "bg-red-100 text-red-800",
};

const PatientsList = () => {
  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Patients</CardTitle>
        <Button className="bg-medical-secondary hover:bg-medical-secondary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dummyPatients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.age} years</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant="outline"
                  className={`${
                    statusColors[patient.status]
                  } border-none font-normal`}
                >
                  {patient.status}
                </Badge>
                <div className="flex">
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="link" className="text-medical-primary">
            View All Patients
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsList;
