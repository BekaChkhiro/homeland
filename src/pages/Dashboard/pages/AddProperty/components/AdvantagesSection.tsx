import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Waves, Martini, Dumbbell, Flame, ChefHat, Bath, TreePine, Apple, Shield, Warehouse, Fan, Eye } from "lucide-react";

export const AdvantagesSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <Waves className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">უპირატესობები</h3>
      </div>

      <div className="rounded-md border border-border p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: "spa", label: "სპა", icon: <Bath className="h-4 w-4" /> },
            { id: "bar", label: "ბარი", icon: <Martini className="h-4 w-4" /> },
            { id: "gym", label: "სპორტ დარბაზი", icon: <Dumbbell className="h-4 w-4" /> },
            { id: "fireplace", label: "ბუხარი", icon: <Flame className="h-4 w-4" /> },
            { id: "bbq", label: "მაყალი/გრილი", icon: <ChefHat className="h-4 w-4" /> },
            { id: "jacuzzi", label: "ჯაკუზი", icon: <Bath className="h-4 w-4" /> },
            { id: "sauna", label: "საუნა", icon: <Flame className="h-4 w-4" /> },
            { id: "yard-lighting", label: "ეზოს განათება", icon: <TreePine className="h-4 w-4" /> },
            { id: "fruit-trees", label: "ხეხილი", icon: <Apple className="h-4 w-4" /> },
            { id: "alarm", label: "სიგნალიზაცია", icon: <Shield className="h-4 w-4" /> },
            { id: "wine-cellar", label: "მარანი", icon: <Warehouse className="h-4 w-4" /> },
            { id: "ventilation", label: "ვინტილაცია", icon: <Fan className="h-4 w-4" /> },
            { id: "security", label: "დაცვა", icon: <Eye className="h-4 w-4" /> }
          ].map((advantage) => (
            <div key={advantage.id} className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-accent transition-colors">
              <Checkbox id={advantage.id} />
              <Label 
                htmlFor={advantage.id} 
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <span className="text-muted-foreground">{advantage.icon}</span>
                {advantage.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};