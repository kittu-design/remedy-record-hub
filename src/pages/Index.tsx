import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import PatientsList from "@/components/dashboard/PatientsList";
import AppointmentsCard from "@/components/dashboard/AppointmentsCard";
import PrescriptionQuickForm from "@/components/dashboard/PrescriptionQuickForm";
import { Calendar, FileText, Pill, Users } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6 animate-fade-in">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-6">Welcome back, Dr. Sarah</h1>
        </div>

        {/* Stats Row */}
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <StatsCard
            title="Total Patients"
            value="1,248"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
            className="bg-gradient-to-br from-white to-blue-50 border-blue-100"
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <StatsCard
            title="Appointments Today"
            value="24"
            icon={<Calendar className="h-5 w-5" />}
            description="8 remaining"
            className="bg-gradient-to-br from-white to-green-50 border-green-100"
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <StatsCard
            title="Prescriptions"
            value="856"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
            className="bg-gradient-to-br from-white to-purple-50 border-purple-100"
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <StatsCard
            title="Medications"
            value="124"
            icon={<Pill className="h-5 w-5" />}
            description="32 need renewal"
            className="bg-gradient-to-br from-white to-orange-50 border-orange-100"
          />
        </div>

        {/* Patient List and Appointments Row */}
        <PatientsList />
        <AppointmentsCard />

        {/* Prescription Quick Form */}
        <PrescriptionQuickForm />
      </div>
    </DashboardLayout>
  );
};

export default Index;
