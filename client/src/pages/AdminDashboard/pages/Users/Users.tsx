import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Users = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">მომხმარებლების მართვა</h1>
        <p className="text-gray-600">მომხმარებლების სია და მართვა</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>მომხმარებლების სია</CardTitle>
          <CardDescription>ყველა რეგისტრირებული მომხმარებლის ნახვა და მართვა</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">მომხმარებლების სრული სია იქ იქნება...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;