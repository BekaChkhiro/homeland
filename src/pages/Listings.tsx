import { useState } from "react";
import { FilterPanel } from "@/components/FilterPanel";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import type { Property, FilterState } from "@/pages/Index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Sample property data - using the same data as in Index.tsx
const sampleProperties = [
  {
    id: 1,
    title: "ლუქსუსური ბინა ვაკეში",
    price: 250000,
    address: "ვაკე, თბილისი",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "კომფორტული სახლი საბურთალოში",
    price: 180000,
    address: "საბურთალო, თბილისი",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: "სახლები",
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "ახალი ბინა ისანში",
    price: 95000,
    address: "ისანი, თბილისი",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "სასტუმრო ოფისი ვერაში",
    price: 45000,
    address: "ვერა, თბილისი",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    type: "კომერციული ფართები",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 5,
    title: "ვილა მთაწმინდაზე",
    price: 450000,
    address: "მთაწმინდა, თბილისი",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    type: "აგარაკები",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 6,
    title: "თანამედროვე სტუდია ცენტრში",
    price: 65000,
    address: "ძველი თბილისი",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 7,
    title: "ბინა ნაძალადევში",
    price: 120000,
    address: "ნაძალადევი, თბილისი",
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 8,
    title: "პენტჰაუსი ვაკეში",
    price: 380000,
    address: "ვაკე, თბილისი",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 9,
    title: "კოტეჯი დიდ დიღომში",
    price: 220000,
    address: "დიდი დიღომი, თბილისი",
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    type: "სახლები",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 10,
    title: "ბინა ჩუღურეთში",
    price: 85000,
    address: "ჩუღურეთი, თბილისი",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 11,
    title: "კომერციული ფართი მარჯანიშვილზე",
    price: 320000,
    address: "მარჯანიშვილი, თბილისი",
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    type: "კომერციული ფართები",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 12,
    title: "ახალაშენებული ბინა საბურთალოზე",
    price: 175000,
    address: "საბურთალო, თბილისი",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    type: "ბინები",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=500&h=300&fit=crop",
    featured: false
  }
];

const Listings = () => {
  const [properties] = useState<Property[]>(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceMin: "",
    priceMax: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    areaMin: "",
    areaMax: ""
  });
  const [searchInput, setSearchInput] = useState("");

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Apply filters
    const filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                          property.address.toLowerCase().includes(newFilters.search.toLowerCase());
      
      const matchesPriceMin = !newFilters.priceMin || property.price >= parseInt(newFilters.priceMin);
      const matchesPriceMax = !newFilters.priceMax || property.price <= parseInt(newFilters.priceMax);
      
      const matchesLocation = !newFilters.location || 
                            property.address.toLowerCase().includes(newFilters.location.toLowerCase());
      
      const matchesType = !newFilters.propertyType || property.type === newFilters.propertyType;
      
      const matchesBedrooms = !newFilters.bedrooms || property.bedrooms === parseInt(newFilters.bedrooms);
      
      const matchesAreaMin = !newFilters.areaMin || property.area >= parseInt(newFilters.areaMin);
      const matchesAreaMax = !newFilters.areaMax || property.area <= parseInt(newFilters.areaMax);
      
      return matchesSearch && matchesPriceMin && matchesPriceMax && matchesLocation && 
             matchesType && matchesBedrooms && matchesAreaMin && matchesAreaMax;
    });
    
    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    handleFilterChange({...filters, search: searchInput});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
      
      {/* Page Header with Search */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">უძრავი ქონების განცხადებები</h1>
          <div className="flex gap-2 max-w-lg">
            <Input 
              placeholder="ძებნა სათაურით ან მისამართით..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              ძებნა
            </Button>
          </div>
        </div>
      </div>
      
      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner type="horizontal" />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            
            {/* Sidebar Ad Banner */}
            <div className="mt-6">
              <AdBanner type="vertical" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <PropertyGrid properties={filteredProperties} />
            
            {/* Bottom Ad Banner */}
            <div className="mt-8">
              <AdBanner type="horizontal" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default Listings;
