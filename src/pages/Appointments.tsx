
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, User, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const appointments = [
  {
    id: 1,
    patientName: "Emma Thompson",
    patientId: "PT-7823",
    date: new Date(2025, 3, 29, 9, 30),
    duration: 30,
    type: "Checkup",
    status: "confirmed",
    location: "Main Office, Room 3"
  },
  {
    id: 2,
    patientName: "Michael Chen",
    patientId: "PT-4891",
    date: new Date(2025, 3, 29, 11, 0),
    duration: 45,
    type: "Follow-up",
    status: "confirmed",
    location: "Main Office, Room 2"
  },
  {
    id: 3,
    patientName: "Olivia Smith",
    patientId: "PT-5623",
    date: new Date(2025, 3, 29, 14, 15),
    duration: 60,
    type: "New Patient",
    status: "pending",
    location: "Main Office, Room 1"
  },
  {
    id: 4,
    patientName: "James Wilson",
    patientId: "PT-3456",
    date: new Date(2025, 3, 30, 10, 0),
    duration: 30,
    type: "Checkup",
    status: "confirmed",
    location: "Branch Office, Room 4"
  },
  {
    id: 5,
    patientName: "Sarah Johnson",
    patientId: "PT-7892",
    date: new Date(2025, 3, 30, 13, 30),
    duration: 45,
    type: "Follow-up",
    status: "confirmed",
    location: "Main Office, Room 3"
  }
];

const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const endTime = new Date(appointment.date);
  endTime.setMinutes(endTime.getMinutes() + appointment.duration);

  return (
    <Card className={`mb-4 border-l-4 ${
      appointment.status === 'confirmed' ? 'border-l-green-500' : 'border-l-amber-500'
    }`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{appointment.patientName}</h3>
            <p className="text-sm text-gray-500">{appointment.patientId} • {appointment.type}</p>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm">{formatTime(appointment.date)} - {formatTime(endTime)}</span>
            </div>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm">{appointment.location}</span>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="mb-2">
              Reschedule
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 w-full">
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Appointments = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 3, 29));
  const [view, setView] = React.useState("list");
  
  const filteredAppointments = appointments.filter(appointment => {
    if (!date) return true;
    
    return (
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
    );
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Appointments</h1>
          <Button className="bg-medical-primary hover:bg-medical-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <h3 className="font-medium text-sm text-gray-700 mb-2">Legend</h3>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Confirmed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {date ? (
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-medical-primary" />
                        {date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    ) : (
                      "All Appointments"
                    )}
                  </CardTitle>
                  <Tabs defaultValue="list" value={view} onValueChange={setView}>
                    <TabsList>
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="list" className="mt-0">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <h3 className="text-lg font-medium">No appointments scheduled</h3>
                      <p className="text-gray-500">Select a different date or create a new appointment</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="timeline" className="mt-0">
                  <div className="relative border-l border-gray-200 ml-4 pl-8">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="mb-6 relative">
                          <div className="absolute -left-12 w-4 h-4 rounded-full bg-medical-primary"></div>
                          <div className="absolute -left-14 text-xs text-gray-500 whitespace-nowrap">
                            {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center">
                                <User className="h-8 w-8 text-gray-400 mr-3 bg-gray-100 p-1 rounded-full" />
                                <div>
                                  <h3 className="font-medium">{appointment.patientName}</h3>
                                  <p className="text-sm text-gray-500">{appointment.type} • {appointment.duration} min</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <h3 className="text-lg font-medium">No appointments scheduled</h3>
                        <p className="text-gray-500">Select a different date or create a new appointment</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
