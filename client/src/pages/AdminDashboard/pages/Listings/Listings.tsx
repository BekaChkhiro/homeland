import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Listings = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">განცხადებების მართვა</h1>
        <p className="text-gray-600">ყველა განცხადების ნახვა და მართვა</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>განცხადებების სია</CardTitle>
          <CardDescription>ყველა განცხადების ნახვა, დამტკიცება და უარყოფა</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">განცხადებების სრული სია იქ იქნება...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Listings;