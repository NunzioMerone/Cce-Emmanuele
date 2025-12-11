import React, { useState, useEffect } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { Card } from "../common/Card";
import { Carousel } from "../common/Carousel";
import { Ministry } from "../../types/ministries";
import { ministriesMock } from "../../utils/ministriesMock";
import { storage } from "../../utils/storageUtils";

export const MinistriesSection: React.FC = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    const stored = storage.getMinistries();
    setMinistries(stored || ministriesMock);
  }, []);

  return (
    <section id="ministries" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="I Nostri Ministeri"
          subtitle="Scopri come puoi essere parte attiva della nostra comunità"
        />

        <Carousel>
          {ministries.map((ministry) => (
            <Card key={ministry.id} hover className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={ministry.image}
                    alt={ministry.title}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {ministry.description}
                </p>
              </div>
            </Card>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
