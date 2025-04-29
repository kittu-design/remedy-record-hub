
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

type Appointment = {
  id: string;
  patientName: string;
  patientImage: string;
  time: string;
  purpose: string;
};

const todaysAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Emma Wilson",
    patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    time: "09:00 AM",
    purpose: "Follow-up",
  },
  {
    id: "2",
    patientName: "Michael Roberts",
    patientImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    time: "11:30 AM",
    purpose: "New Patient",
  },
  {
    id: "3",
    patientName: "Sophie Chen",
    patientImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    time: "02:15 PM",
    purpose: "Prescription Renewal",
  },
];

const AppointmentsCard = () => {
  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todaysAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-3 border rounded-lg hover:shadow-sm transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={appointment.patientImage}
                    alt={appointment.patientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{appointment.patientName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.time} - {appointment.purpose}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {todaysAppointments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No appointments scheduled for today
          </div>
        ) : (
          <div className="mt-4 text-center">
            <Button variant="link" className="text-medical-primary">
              View Full Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsCard;
