import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MyProperties: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <h2 className="text-xl font-medium mb-4">ჩემი განცხადებები</h2>
      <div className="bg-white mb-4 p-4 rounded-lg border">
        <div className="flex gap-2 overflow-auto pb-2">
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            ყველა <span className="ml-1 text-gray-500">0</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            შესაბამისობა <span className="ml-1 text-gray-500">0</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            დეტალურად <span className="ml-1 text-gray-500">0</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            ფავორიტებში <span className="ml-1 text-gray-500">0</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            გაყიდულია <span className="ml-1 text-gray-500">0</span>
          </Button>
          <Button variant="outline" size="sm" className="text-xs rounded-full">
            არააქტიური <span className="ml-1 text-gray-500">0</span>
          </Button>
        </div>
      </div>
      
      {/* ცარიელი მდგომარეობა */}
      <div className="bg-white p-8 rounded-lg border text-center">
        <div className="max-w-xs mx-auto">
          <div className="mb-4">
            <img 
              src="/placeholder.svg" 
              alt="No properties" 
              className="mx-auto w-32 h-32 opacity-50"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">თქვენ არ გაქვთ განცხადებები დამატებული</h3>
          <p className="text-sm text-gray-500 mb-4">
            დაამატეთ თქვენი პირველი განცხადება და გაზარდეთ გაყიდვების შანსები
          </p>
          <Button 
            className="flex items-center mx-auto"
            onClick={() => navigate('/dashboard/add-property')}
          >
            <Plus className="h-4 w-4 mr-1" />
            განცხადების დამატება
          </Button>
        </div>
      </div>
    </>
  );
};
