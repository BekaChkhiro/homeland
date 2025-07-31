import React from "react";

export const Favorites: React.FC = () => {
  return (
    <>
      <h2 className="text-xl font-medium mb-4">ფავორიტები</h2>
      <div className="bg-white p-8 rounded-lg border text-center">
        <p className="text-gray-500">თქვენ არ გაქვთ ფავორიტებში დამატებული განცხადებები</p>
      </div>
    </>
  );
};
