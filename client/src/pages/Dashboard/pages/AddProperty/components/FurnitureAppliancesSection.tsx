import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sofa, Bed, Table, ChefHat, Wind, Refrigerator, WashingMachine, Utensils } from "lucide-react";

export const FurnitureAppliancesSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <Sofa className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">ავეჯი და ტექნიკა</h3>
      </div>

      <div className="rounded-md border border-border p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: "furniture", label: "ავეჯი", icon: <Sofa className="h-4 w-4" /> },
            { id: "bed", label: "საწოლი", icon: <Bed className="h-4 w-4" /> },
            { id: "sofa", label: "დივანი", icon: <Sofa className="h-4 w-4" /> },
            { id: "table", label: "მაგიდა", icon: <Table className="h-4 w-4" /> },
            { id: "chairs", label: "სკამები", icon: <Table className="h-4 w-4" /> },
            { id: "stove-gas", label: "ქურა (გაზის)", icon: <ChefHat className="h-4 w-4" /> },
            { id: "stove-electric", label: "ქურა (ელექტრო)", icon: <ChefHat className="h-4 w-4" /> },
            { id: "oven", label: "ღუმელი", icon: <ChefHat className="h-4 w-4" /> },
            { id: "air-conditioner", label: "კონდიციონერი", icon: <Wind className="h-4 w-4" /> },
            { id: "refrigerator", label: "მაცივარი", icon: <Refrigerator className="h-4 w-4" /> },
            { id: "washing-machine", label: "სარეცხი მანქანა", icon: <WashingMachine className="h-4 w-4" /> },
            { id: "dishwasher", label: "ჭურჭლის სარეცხი მანქანა", icon: <Utensils className="h-4 w-4" /> }
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-accent transition-colors">
              <Checkbox id={item.id} />
              <Label 
                htmlFor={item.id} 
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                <span className="text-muted-foreground">{item.icon}</span>
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};