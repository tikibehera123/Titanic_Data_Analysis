
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container py-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/320px-RMS_Titanic_3.jpg" 
            alt="Titanic" 
            className="w-8 h-8 object-cover rounded-md"
          />
          <h1 className="text-xl font-bold tracking-tight">Titanic Data Analysis</h1>
        </div>
        
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pca">PCA</TabsTrigger>
            <TabsTrigger value="kmeans">K-Means</TabsTrigger>
            <TabsTrigger value="clusters">Clusters</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Navigation;
