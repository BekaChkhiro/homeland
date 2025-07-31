import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Thermometer, Car, Droplets, Building, Waves, Sofa, TreePine, Warehouse } from "lucide-react";

export const PropertyDetailsSection = () => {
  const [hasBalcony, setHasBalcony] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasLivingRoom, setHasLivingRoom] = useState(false);
  const [hasLoggia, setHasLoggia] = useState(false);
  const [hasVeranda, setHasVeranda] = useState(false);
  const [hasYard, setHasYard] = useState(false);
  const [hasStorage, setHasStorage] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <Home className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">განცხადების დეტალები</h3>
      </div>

      {/* Rooms */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">ოთახები</Label>
        <RadioGroup className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <label
              key={num}
              htmlFor={`rooms-${num}`}
              className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={num.toString()} id={`rooms-${num}`} className="sr-only" />
              <span className="group-data-[state=checked]:font-medium">{num}</span>
            </label>
          ))}
          <label
            htmlFor="rooms-10plus"
            className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
          >
            <RadioGroupItem value="10+" id="rooms-10plus" className="sr-only" />
            <span className="group-data-[state=checked]:font-medium">10+</span>
          </label>
        </RadioGroup>
      </div>

      {/* Bedrooms */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">საძინებელი</Label>
        <RadioGroup className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <label
              key={num}
              htmlFor={`bedrooms-${num}`}
              className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={num.toString()} id={`bedrooms-${num}`} className="sr-only" />
              <span className="group-data-[state=checked]:font-medium">{num}</span>
            </label>
          ))}
          <label
            htmlFor="bedrooms-10plus"
            className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
          >
            <RadioGroupItem value="10+" id="bedrooms-10plus" className="sr-only" />
            <span className="group-data-[state=checked]:font-medium">10+</span>
          </label>
        </RadioGroup>
      </div>

      {/* Bathrooms */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium flex items-center gap-2">
          <Droplets className="h-4 w-4 text-muted-foreground" />
          <span>სველი წერტილი</span>
        </Label>
        <RadioGroup className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((num) => (
            <label
              key={num}
              htmlFor={`bathrooms-${num}`}
              className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={num.toString()} id={`bathrooms-${num}`} className="sr-only" />
              <span className="group-data-[state=checked]:font-medium">{num === 3 ? "3+" : num}</span>
            </label>
          ))}
          <label
            htmlFor="bathrooms-shared"
            className="flex items-center justify-center border border-input bg-background rounded-md p-3 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
          >
            <RadioGroupItem value="shared" id="bathrooms-shared" className="sr-only" />
            <span className="group-data-[state=checked]:font-medium">საერთო</span>
          </label>
        </RadioGroup>
      </div>

      {/* Total Floors */}
      <div className="rounded-md border border-border p-5">
        <Label htmlFor="total-floors" className="block mb-3 font-medium">სართულები სულ</Label>
        <Input id="total-floors" type="number" placeholder="მთლიანი სართულების რაოდენობა" className="border-input focus:ring-ring focus:ring-1" />
      </div>

      {/* Building Status */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>სტატუსი</span>
        </Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "old-built", label: "ძველი აშენებული" },
            { value: "new-built", label: "ახალი აშენებული" },
            { value: "under-construction", label: "მშენებარე" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`status-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`status-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Construction Year */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">აშენების წელი</Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "before-1955", label: "<1955" },
            { value: "1955-2000", label: "1955-2000" },
            { value: "after-2000", label: ">2000" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`year-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`year-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Condition */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">მდგომარეობა</Label>
        <RadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "newly-renovated", label: "ახალი გარემონტებული" },
            { value: "old-renovated", label: "ძველი გარემონტებული" },
            { value: "ongoing-renovation", label: "მიმდინარე რემონტი" },
            { value: "needs-renovation", label: "სარემონტო" },
            { value: "white-frame", label: "თეთრი კარკასი" },
            { value: "black-frame", label: "შავი კარკასი" },
            { value: "green-frame", label: "მწვანე კარკასი" },
            { value: "white-plus", label: "თეთრი პლიუსი" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`condition-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`condition-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium text-sm">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Project Type */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">პროექტის ტიპი</Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: "non-standard", label: "არასტანდარტული" },
            { value: "villa", label: "ვილა" },
            { value: "townhouse", label: "თაუნჰაუსი" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`project-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`project-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Ceiling Height */}
      <div className="rounded-md border border-border p-5">
        <Label htmlFor="ceiling-height" className="block mb-3 font-medium">ჭერის სიმაღლე</Label>
        <Input id="ceiling-height" type="number" step="0.1" placeholder="მეტრი" className="border-input focus:ring-ring focus:ring-1" />
      </div>

      {/* Heating */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-muted-foreground" />
          <span>გათბობა</span>
        </Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: "central-heating", label: "ცენტრალური გათბობა" },
            { value: "gas-heater", label: "გაზის გამათბობელი" },
            { value: "electric-heater", label: "დენის გამათბობელი" },
            { value: "central-floor", label: "ცენტრალური+იატაკის გათბობა" },
            { value: "no-heating", label: "გათბობის გარეშე" },
            { value: "individual", label: "ინდივიდუალური" },
            { value: "floor-heating", label: "იატაკის გათბობა" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`heating-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`heating-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium text-sm">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Parking */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium flex items-center gap-2">
          <Car className="h-4 w-4 text-muted-foreground" />
          <span>პარკირება</span>
        </Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: "garage", label: "ავტოფარეხი" },
            { value: "parking-space", label: "პარკინგის ადგილი" },
            { value: "yard-parking", label: "ეზოს პარკინგი" },
            { value: "underground-parking", label: "მიწისქვეშა პარკინგი" },
            { value: "paid-parking", label: "ფასიანი ავტოსადგომი" },
            { value: "no-parking", label: "პარკინგის გარეშე" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`parking-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`parking-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium text-sm">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Hot Water */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium flex items-center gap-2">
          <Droplets className="h-4 w-4 text-muted-foreground" />
          <span>ცხელი წყალი</span>
        </Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: "gas-water-heater", label: "გაზის გამაცხელებელი" },
            { value: "boiler", label: "ავზი" },
            { value: "electric-water-heater", label: "დენის გამაცხელებელი" },
            { value: "solar-heater", label: "მზის გამაცხელებელი" },
            { value: "no-hot-water", label: "ცხელი წყლის გარეშე" },
            { value: "central-hot-water", label: "ცენტრალური ცხელი წყალი" },
            { value: "natural-hot-water", label: "ბუნებრივი ცხელი წყალი" },
            { value: "individual", label: "ინდივიდუალური" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`hot-water-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`hot-water-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium text-sm">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Building Material */}
      <div className="rounded-md border border-border p-5">
        <Label className="block mb-3 font-medium">სამშენებლო მასალა</Label>
        <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: "block", label: "ბლოკი" },
            { value: "brick", label: "აგური" },
            { value: "wood", label: "ხის მასალა" },
            { value: "reinforced-concrete", label: "რკინა-ბეტონი" },
            { value: "combined", label: "კომბინირებული" }
          ].map((option) => (
            <label
              key={option.value}
              htmlFor={`material-${option.value}`}
              className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
            >
              <RadioGroupItem value={option.value} id={`material-${option.value}`} />
              <span className="group-data-[state=checked]:font-medium">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Balcony */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-balcony" 
            checked={hasBalcony} 
            onCheckedChange={setHasBalcony}
          />
          <Label htmlFor="has-balcony" className="font-medium">აივანი</Label>
        </div>
        {hasBalcony && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="balcony-count" className="text-sm mb-2 block">აივნის რაოდენობა</Label>
              <Input id="balcony-count" type="number" placeholder="რაოდენობა" className="border-input focus:ring-ring focus:ring-1" />
            </div>
            <div>
              <Label htmlFor="balcony-area" className="text-sm mb-2 block">აივნის ფართობი (მ²)</Label>
              <Input id="balcony-area" type="number" step="0.1" placeholder="ფართობი" className="border-input focus:ring-ring focus:ring-1" />
            </div>
          </div>
        )}
      </div>

      {/* Pool */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-pool" 
            checked={hasPool} 
            onCheckedChange={setHasPool}
          />
          <Label htmlFor="has-pool" className="font-medium flex items-center gap-2">
            <Waves className="h-4 w-4 text-muted-foreground" />
            <span>აუზი</span>
          </Label>
        </div>
        {hasPool && (
          <div>
            <Label className="text-sm mb-2 block">აუზის ტიპი</Label>
            <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: "outdoor", label: "ღია" },
                { value: "indoor", label: "დახურული" }
              ].map((option) => (
                <label
                  key={option.value}
                  htmlFor={`pool-type-${option.value}`}
                  className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
                >
                  <RadioGroupItem value={option.value} id={`pool-type-${option.value}`} />
                  <span className="group-data-[state=checked]:font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Living Room */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-living-room" 
            checked={hasLivingRoom} 
            onCheckedChange={setHasLivingRoom}
          />
          <Label htmlFor="has-living-room" className="font-medium flex items-center gap-2">
            <Sofa className="h-4 w-4 text-muted-foreground" />
            <span>მისაღები</span>
          </Label>
        </div>
        {hasLivingRoom && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="living-room-area" className="text-sm mb-2 block">მისაღების ფართი (მ²)</Label>
              <Input id="living-room-area" type="number" step="0.1" placeholder="ფართი" className="border-input focus:ring-ring focus:ring-1" />
            </div>
            <div>
              <Label className="text-sm mb-2 block">მისაღების ტიპი</Label>
              <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "separate", label: "გამოყოფილი" },
                  { value: "studio", label: "სტუდიო" }
                ].map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`living-room-type-${option.value}`}
                    className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
                  >
                    <RadioGroupItem value={option.value} id={`living-room-type-${option.value}`} />
                    <span className="group-data-[state=checked]:font-medium">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </div>

      {/* Loggia */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-loggia" 
            checked={hasLoggia} 
            onCheckedChange={setHasLoggia}
          />
          <Label htmlFor="has-loggia" className="font-medium">ლოჯი</Label>
        </div>
        {hasLoggia && (
          <div>
            <Label htmlFor="loggia-area" className="text-sm mb-2 block">ლოჯის ფართი (მ²)</Label>
            <Input id="loggia-area" type="number" step="0.1" placeholder="ფართი" className="border-input focus:ring-ring focus:ring-1" />
          </div>
        )}
      </div>

      {/* Veranda */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-veranda" 
            checked={hasVeranda} 
            onCheckedChange={setHasVeranda}
          />
          <Label htmlFor="has-veranda" className="font-medium">ვერანდა</Label>
        </div>
        {hasVeranda && (
          <div>
            <Label htmlFor="veranda-area" className="text-sm mb-2 block">ვერანდის ფართი (მ²)</Label>
            <Input id="veranda-area" type="number" step="0.1" placeholder="ფართი" className="border-input focus:ring-ring focus:ring-1" />
          </div>
        )}
      </div>

      {/* Yard */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-yard" 
            checked={hasYard} 
            onCheckedChange={setHasYard}
          />
          <Label htmlFor="has-yard" className="font-medium flex items-center gap-2">
            <TreePine className="h-4 w-4 text-muted-foreground" />
            <span>აქვს ეზო</span>
          </Label>
        </div>
        {hasYard && (
          <div>
            <Label htmlFor="yard-area" className="text-sm mb-2 block">ეზოს ფართი (მ²)</Label>
            <Input id="yard-area" type="number" step="0.1" placeholder="ფართი" className="border-input focus:ring-ring focus:ring-1" />
          </div>
        )}
      </div>

      {/* Storage */}
      <div className="rounded-md border border-border p-5">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="has-storage" 
            checked={hasStorage} 
            onCheckedChange={setHasStorage}
          />
          <Label htmlFor="has-storage" className="font-medium flex items-center gap-2">
            <Warehouse className="h-4 w-4 text-muted-foreground" />
            <span>სათავსოს ტიპი</span>
          </Label>
        </div>
        {hasStorage && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="storage-area" className="text-sm mb-2 block">სათავსოს ფართი (მ²)</Label>
              <Input id="storage-area" type="number" step="0.1" placeholder="ფართი" className="border-input focus:ring-ring focus:ring-1" />
            </div>
            <div>
              <Label className="text-sm mb-2 block">სათავსოს ტიპი</Label>
              <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "basement", label: "სარდაფი" },
                  { value: "attic", label: "სხვენი" },
                  { value: "pantry", label: "საკუჭნაო" },
                  { value: "external-storage", label: "გარე სათავსო" },
                  { value: "shared-storage", label: "საერთო სათავსო" },
                  { value: "basement-attic", label: "სარდაფი + სხვენი" }
                ].map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`storage-type-${option.value}`}
                    className="flex items-center space-x-2 border border-input bg-background rounded-md p-4 cursor-pointer hover:bg-accent hover:border-ring transition-colors group data-[state=checked]:border-primary data-[state=checked]:bg-accent"
                  >
                    <RadioGroupItem value={option.value} id={`storage-type-${option.value}`} />
                    <span className="group-data-[state=checked]:font-medium text-sm">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};