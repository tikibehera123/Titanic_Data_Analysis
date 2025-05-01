
import { ProcessedPassenger, PCAData, KMeansData, ClusterSummary } from "../types/dataTypes";
import { featureColumns } from "./titanicData";

// Standardize the data (z-score normalization)
export const standardizeData = (data: ProcessedPassenger[]) => {
  const features = extractFeatures(data);
  const means: { [key: string]: number } = {};
  const stds: { [key: string]: number } = {};

  // Calculate means
  featureColumns.forEach(col => {
    means[col] = features.reduce((sum, row) => sum + row[col], 0) / features.length;
  });

  // Calculate standard deviations
  featureColumns.forEach(col => {
    const squaredDiffs = features.map(row => Math.pow(row[col] - means[col], 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / features.length;
    stds[col] = Math.sqrt(variance);
  });

  // Standardize the data
  return features.map(row => {
    const standardizedRow: { [key: string]: number } = {};
    featureColumns.forEach(col => {
      standardizedRow[col] = (row[col] - means[col]) / (stds[col] || 1); // Avoid division by zero
    });
    return standardizedRow;
  });
};

// Extract features from processed data
const extractFeatures = (data: ProcessedPassenger[]) => {
  return data.map(passenger => {
    const features: { [key: string]: number } = {};
    featureColumns.forEach(col => {
      features[col] = passenger[col as keyof ProcessedPassenger] as number;
    });
    return features;
  });
};

// Mock PCA transformation
export const performPCA = (standardizedData: { [key: string]: number }[]): PCAData => {
  // In a real implementation, we'd use a library like ml-pca
  // For this mock, we'll create plausible PCA results
  
  // Convert data to array format
  const dataMatrix = standardizedData.map(row => 
    featureColumns.map(col => row[col])
  );

  // Mock principal components (2 components for visualization)
  const pcaComponents = [
    [0.3, -0.2, 0.5, 0.1, 0.3, 0.6, 0.1, -0.1, 0.3], // PC1 loadings
    [0.2, 0.5, -0.1, 0.4, 0.3, 0.1, 0.3, 0.4, -0.2]  // PC2 loadings
  ];

  // Mock explained variance
  const explainedVariance = [0.45, 0.22, 0.12, 0.08, 0.05, 0.04, 0.02, 0.01, 0.01];
  const cumulativeVariance = [];
  let cumSum = 0;
  for (const variance of explainedVariance) {
    cumSum += variance;
    cumulativeVariance.push(cumSum);
  }

  // Project data onto PCs (matrix multiplication)
  const transformedData = dataMatrix.map(row => {
    return pcaComponents.map(pc => {
      return pc.reduce((sum, coef, i) => sum + coef * row[i], 0);
    });
  });

  return {
    explainedVariance,
    cumulativeVariance,
    pcaComponents,
    transformedData
  };
};

// Mock K-Means clustering
export const performKMeans = (pcaData: number[][]): KMeansData => {
  // Calculate mock inertia (WCSS) for different K values (1-10)
  const inertiaValues = [
    150, 80, 45, 32, 25, 22, 18, 15, 13, 12
  ];

  // Determine optimal K (for this mock, let's say it's 3)
  const optimalK = 3;

  // Create mock cluster assignments
  const clusterLabels = Array.from({ length: pcaData.length }, (_, i) => {
    // Assign clusters based on position in PCA space
    const x = pcaData[i][0];
    const y = pcaData[i][1];
    
    if (x > 1) return 0;
    if (y > 1) return 1;
    return 2;
  });

  return {
    inertiaValues,
    clusterLabels,
    optimalK
  };
};

// Generate cluster summaries
export const generateClusterSummaries = (
  data: ProcessedPassenger[], 
  clusterLabels: number[],
  optimalK: number
): ClusterSummary[] => {
  const summaries: ClusterSummary[] = [];
  
  for (let i = 0; i < optimalK; i++) {
    // Get all passengers in this cluster
    const clusterPassengers = data.filter((_, index) => clusterLabels[index] === i);
    
    // Calculate statistics
    const count = clusterPassengers.length;
    const averageAge = clusterPassengers.reduce((sum, p) => sum + p.Age, 0) / count;
    const averageFare = clusterPassengers.reduce((sum, p) => sum + p.Fare, 0) / count;
    
    // Class distribution
    const pclassDistribution: {[key: string]: number} = { "1": 0, "2": 0, "3": 0 };
    clusterPassengers.forEach(p => {
      pclassDistribution[p.Pclass.toString()]++;
    });
    
    // Gender distribution
    const sexDistribution: {[key: string]: number} = { 
      "Male": 0, 
      "Female": 0 
    };
    clusterPassengers.forEach(p => {
      if (p.Sex_numeric === 1) sexDistribution["Male"]++;
      else sexDistribution["Female"]++;
    });
    
    // Embarked distribution
    const embarkedDistribution: {[key: string]: number} = { 
      "Cherbourg (C)": 0, 
      "Queenstown (Q)": 0, 
      "Southampton (S)": 0 
    };
    clusterPassengers.forEach(p => {
      if (p.Embarked_C === 1) embarkedDistribution["Cherbourg (C)"]++;
      if (p.Embarked_Q === 1) embarkedDistribution["Queenstown (Q)"]++;
      if (p.Embarked_S === 1) embarkedDistribution["Southampton (S)"]++;
    });
    
    summaries.push({
      clusterId: i,
      count,
      averageAge,
      averageFare,
      pclassDistribution,
      sexDistribution,
      embarkedDistribution
    });
  }
  
  return summaries;
};
