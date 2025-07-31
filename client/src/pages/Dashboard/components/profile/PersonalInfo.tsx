import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { User, useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api";

interface PersonalInfoProps {
  user: User;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const { toast } = useToast();
  const { user: authUser, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const nameParts = user.fullName?.split(' ') || [];
  const [formData, setFormData] = useState({
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: user.email || '',
    phone: user.phone || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data for API (email is not updatable)
      const updateData = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone
      };
      
      
      // Call API to update user profile
      const response = await apiClient.updateProfile(updateData);
      
      if (response.success) {
        toast({
          title: "წარმატება!",
          description: "პროფილი წარმატებით განახლდა",
        });
        
        // Optionally refresh user data by re-logging in
        // This ensures the latest data is loaded from the server
        if (authUser) {
          // Since we don't store password, we'll just update localStorage with new data
          const updatedUser = {
            ...authUser,
            fullName: updateData.fullName,
            phone: updateData.phone
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Force page refresh to reload user data
          window.location.reload();
        }
      } else {
        toast({
          title: "შეცდომა",
          description: response.error || "პროფილის განახლება ვერ მოხერხდა",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "შეცდომა",
        description: "სისტემური შეცდომა. სცადეთ მოგვიანებით.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">პირადი ინფორმაცია</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">სახელი</Label>
            <Input 
              id="firstName" 
              placeholder="სახელი" 
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="lastName">გვარი</Label>
            <Input 
              id="lastName" 
              placeholder="გვარი" 
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">ელფოსტა</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">ელფოსტის ცვლილება შეუძლებელია</p>
        </div>
        
        <div>
          <Label htmlFor="phone">ტელეფონი</Label>
          <Input 
            id="phone" 
            placeholder={formData.phone ? formData.phone : "+995 5XX XX XX XX"} 
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "შენახვა..." : "შენახვა"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const nameParts = user.fullName?.split(' ') || [];
              setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: user.email || '',
                phone: user.phone || ''
              });
            }}
          >
            გაუქმება
          </Button>
        </div>
      </div>
    </Card>
  );
};