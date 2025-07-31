import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const { toast } = useToast();
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "შეცდომა",
        description: "პაროლები არ ემთხვევა ერთმანეთს",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Extract full name from firstName and lastName
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const success = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined
      });
      
      if (success) {
        toast({
          title: "წარმატება!",
          description: "რეგისტრაცია წარმატებით დასრულდა. გთხოვთ, შეხვიდეთ სისტემაში.",
        });
        
        // Redirect to login page after successful registration
        navigate("/login");
      } else {
        setError("რეგისტრაციისას მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "სისტემური შეცდომა";
      setError(`რეგისტრაციის შეცდომა: ${errorMessage}`);
      console.error("Registration error:", err);
      toast({
        title: "შეცდომა",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // Ensure loading state is always turned off
      if (isLoading) {
        // Force loading state off if still loading after error
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-10 px-4 pt-24">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">რეგისტრაცია</CardTitle>
              <CardDescription className="text-center">
                შექმენით ანგარიში HOMEVEND.ge-ზე
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    სახელი
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="შეიყვანეთ სახელი"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    გვარი
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="შეიყვანეთ გვარი"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    ელ-ფოსტა
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="თქვენი ელ-ფოსტის მისამართი"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    პაროლი
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="შეიყვანეთ პაროლი"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    გაიმეორეთ პაროლი
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="გაიმეორეთ პაროლი"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    ტელეფონი (არასავალდებულო)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="ტელეფონის ნომერი"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "მიმდინარეობს..." : "რეგისტრაცია"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                უკვე გაქვთ ანგარიში?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  შესვლა
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
