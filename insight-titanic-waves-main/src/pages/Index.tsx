
import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DataOverview from "@/components/DataOverview";
import PCAAnalysis from "@/components/PCAAnalysis";
import KMeansAnalysis from "@/components/KMeansAnalysis";
import ClusterDetails from "@/components/ClusterDetails";
import { mockTitanicData, preprocessTitanicData, getDataSummary } from "@/utils/titanicData";
import { standardizeData, performPCA, performKMeans, generateClusterSummaries } from "@/utils/dataProcessing";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [dataSummary, setDataSummary] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [pcaData, setPcaData] = useState(null);
  const [kmeansData, setKmeansData] = useState(null);
  const [clusterSummaries, setClusterSummaries] = useState(null);

  useEffect(() => {
    // Simulate data loading and processing
    const loadData = async () => {
      try {
        // Step 1: Load and preprocess data
        const summary = getDataSummary(mockTitanicData);
        setDataSummary(summary);
        
        const processed = preprocessTitanicData(mockTitanicData);
        setProcessedData(processed);
        
        // Step 2: Perform PCA
        const standardized = standardizeData(processed);
        const pca = performPCA(standardized);
        setPcaData(pca);
        
        // Step 3: Perform K-Means clustering
        const kmeans = performKMeans(pca.transformedData);
        setKmeansData(kmeans);
        
        // Step 4: Generate cluster summaries
        const summaries = generateClusterSummaries(processed, kmeans.clusterLabels, kmeans.optimalK);
        setClusterSummaries(summaries);
      } catch (error) {
        console.error("Error processing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add a small delay to simulate real processing
    setTimeout(loadData, 500);
  }, []);

  // Render appropriate component based on active section
  const renderActiveSection = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Processing Titanic dataset...</p>
          </div>
        </div>
      );
    }
    
    switch (activeSection) {
      case "overview":
        return <DataOverview summary={dataSummary} />;
      case "pca":
        return <PCAAnalysis pcaData={pcaData} />;
      case "kmeans":
        return <KMeansAnalysis kmeansData={kmeansData} pcaTransformedData={pcaData.transformedData} />;
      case "clusters":
        return <ClusterDetails clusterSummaries={clusterSummaries} />;
      default:
        return <DataOverview summary={dataSummary} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 container py-8 space-y-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Simulation Notice</AlertTitle>
          <AlertDescription>
            This is a demonstration using mock Titanic data with simulated PCA and K-Means results. 
            In a real application, these would be calculated using actual machine learning algorithms.
          </AlertDescription>
        </Alert>
        
        <div>
          {renderActiveSection()}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Titanic Data Analysis Dashboard — Unsupervised ML Exploration with PCA and K-Means Clustering
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
