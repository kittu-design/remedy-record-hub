
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, BadgeDollarSign, Filter } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Medical Doctor - General Practice",
    department: "Medical",
    location: "New York, NY",
    type: "Full-time",
    salary: "$180,000 - $220,000",
    posted: "2 weeks ago",
    description: "We're looking for an experienced General Practitioner to join our growing medical practice. The ideal candidate will have at least 3 years of experience and excellent patient communication skills."
  },
  {
    id: 2,
    title: "Registered Nurse",
    department: "Nursing",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$75,000 - $95,000",
    posted: "3 days ago",
    description: "Join our nursing team to provide exceptional patient care. Requirements include RN license, BLS certification, and at least 2 years of clinical experience."
  },
  {
    id: 3,
    title: "Medical Assistant",
    department: "Support Staff",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$45,000 - $55,000",
    posted: "1 week ago",
    description: "Seeking a certified Medical Assistant to support our physicians. Responsibilities include taking vital signs, preparing patients for examination, and administrative duties."
  },
  {
    id: 4,
    title: "Medical Receptionist",
    department: "Administrative",
    location: "Remote",
    type: "Full-time",
    salary: "$40,000 - $50,000",
    posted: "Just posted",
    description: "Looking for an organized and friendly medical receptionist to manage our front desk operations. Experience with medical scheduling software preferred."
  },
  {
    id: 5,
    title: "Pharmacist",
    department: "Pharmacy",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $140,000",
    posted: "5 days ago",
    description: "Seeking a licensed pharmacist to join our pharmacy team. Responsibilities include dispensing medications, counseling patients, and managing inventory."
  }
];

const JobCard = ({ job }: { job: any }) => (
  <Card className="mb-6">
    <CardHeader className="pb-2">
      <div className="flex justify-between">
        <div>
          <CardTitle className="text-xl text-medical-primary">{job.title}</CardTitle>
          <CardDescription>{job.department}</CardDescription>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full h-fit">
          {job.posted}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-3 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {job.type}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BadgeDollarSign className="h-4 w-4 mr-1" />
          {job.salary}
        </div>
      </div>
      <p className="text-gray-700">{job.description}</p>
    </CardContent>
    <CardFooter className="pt-0">
      <Button className="bg-medical-primary hover:bg-medical-primary/90">Apply Now</Button>
      <Button variant="outline" className="ml-2">Save Job</Button>
    </CardFooter>
  </Card>
);

const Careers = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  
  const filteredJobs = activeTab === "all" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department.toLowerCase() === activeTab);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Career Opportunities</h1>
          <p className="text-gray-600">Join our team of healthcare professionals</p>
        </div>
        
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-medical-secondary mb-2">Why Work With Us?</h2>
                <p className="text-gray-700 mb-4">Join a team dedicated to providing exceptional patient care in a supportive and innovative environment.</p>
                <ul className="space-y-2">
                  {[
                    "Competitive salary and benefits",
                    "Professional development opportunities",
                    "Work-life balance",
                    "State-of-the-art facilities",
                    "Collaborative team environment"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/3 md:pl-6 flex justify-center md:justify-end">
                <Briefcase className="h-32 w-32 text-medical-secondary/20" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-0">
            <TabsList>
              <TabsTrigger value="all">All Departments</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="nursing">Nursing</TabsTrigger>
              <TabsTrigger value="administrative">Admin</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Options
          </Button>
        </div>
        
        <div>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <h3 className="text-lg font-medium">No job openings found</h3>
              <p className="text-gray-500">Try selecting a different department</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Careers;
