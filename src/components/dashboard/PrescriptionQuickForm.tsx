
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronDown, FileText } from "lucide-react";
import { toast } from "sonner";

const medications = [
  { value: "amoxicillin", label: "Amoxicillin" },
  { value: "lisinopril", label: "Lisinopril" },
  { value: "metformin", label: "Metformin" },
  { value: "atorvastatin", label: "Atorvastatin" },
  { value: "levothyroxine", label: "Levothyroxine" },
  { value: "ibuprofen", label: "Ibuprofen" },
];

const patients = [
  { value: "emma-wilson", label: "Emma Wilson" },
  { value: "james-peterson", label: "James Peterson" },
  { value: "sophie-chen", label: "Sophie Chen" },
  { value: "michael-roberts", label: "Michael Roberts" },
];

const PrescriptionQuickForm = () => {
  const [selectedMedication, setSelectedMedication] = useState("");
  const [medicationOpen, setMedicationOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientOpen, setPatientOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Prescription created successfully!");
  };

  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-medical-primary" />
          Quick Prescription
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Popover open={patientOpen} onOpenChange={setPatientOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={patientOpen}
                    className="w-full justify-between"
                  >
                    {selectedPatient
                      ? patients.find((p) => p.value === selectedPatient)?.label
                      : "Select patient..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search patients..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No patients found.</CommandEmpty>
                      <CommandGroup>
                        {patients.map((patient) => (
                          <CommandItem
                            key={patient.value}
                            value={patient.value}
                            onSelect={(currentValue) => {
                              setSelectedPatient(currentValue === selectedPatient ? "" : currentValue);
                              setPatientOpen(false);
                            }}
                          >
                            {patient.label}
                            <Check
                              className={`ml-auto h-4 w-4 ${
                                selectedPatient === patient.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication">Medication</Label>
              <Popover open={medicationOpen} onOpenChange={setMedicationOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={medicationOpen}
                    className="w-full justify-between"
                  >
                    {selectedMedication
                      ? medications.find((m) => m.value === selectedMedication)?.label
                      : "Select medication..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search medications..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No medications found.</CommandEmpty>
                      <CommandGroup>
                        {medications.map((medication) => (
                          <CommandItem
                            key={medication.value}
                            value={medication.value}
                            onSelect={(currentValue) => {
                              setSelectedMedication(currentValue === selectedMedication ? "" : currentValue);
                              setMedicationOpen(false);
                            }}
                          >
                            {medication.label}
                            <Check
                              className={`ml-auto h-4 w-4 ${
                                selectedMedication === medication.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" placeholder="e.g., 500mg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Input id="frequency" placeholder="e.g., Twice daily" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g., 7 days" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any special instructions for the patient..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-primary/90">
            Create Prescription
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PrescriptionQuickForm;
