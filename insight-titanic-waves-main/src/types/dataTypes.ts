
export interface TitanicPassenger {
  PassengerId: number;
  Survived: number;
  Pclass: number;
  Name: string;
  Sex: string;
  Age: number;
  SibSp: number;
  Parch: number;
  Ticket: string;
  Fare: number;
  Cabin: string | null;
  Embarked: string | null;
}

export interface ProcessedPassenger {
  PassengerId: number;
  Pclass: number;
  Sex_numeric: number;
  Age: number;
  SibSp: number;
  Parch: number;
  Fare: number;
  Embarked_C: number;
  Embarked_Q: number;
  Embarked_S: number;
}

export interface PCAData {
  explainedVariance: number[];
  cumulativeVariance: number[];
  pcaComponents: number[][];
  transformedData: number[][];
}

export interface KMeansData {
  inertiaValues: number[];
  clusterLabels: number[];
  optimalK: number;
}

export interface ClusterSummary {
  clusterId: number;
  count: number;
  averageAge: number;
  averageFare: number;
  pclassDistribution: { [key: string]: number };
  sexDistribution: { [key: string]: number };
  embarkedDistribution: { [key: string]: number };
}
