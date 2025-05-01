
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";

interface KMeansAnalysisProps {
  kmeansData: {
    inertiaValues: number[];
    clusterLabels: number[];
    optimalK: number;
  };
  pcaTransformedData: number[][];
}

const KMeansAnalysis: React.FC<KMeansAnalysisProps> = ({ kmeansData, pcaTransformedData }) => {
  // Prepare data for elbow plot
  const elbowData = kmeansData.inertiaValues.map((inertia, index) => ({
    k: index + 1,
    inertia
  }));

  // Prepare data for cluster visualization
  const clusterColors = ["#0ea5e9", "#f97316", "#8b5cf6", "#10b981", "#ef4444"];
  
  const clusterData = pcaTransformedData.map((point, index) => ({
    x: point[0],
    y: point[1],
    cluster: kmeansData.clusterLabels[index],
  }));

  // Separate data by cluster for visualization
  const clusterGroups = Array.from(
    { length: kmeansData.optimalK },
    (_, i) => ({
      name: `Cluster ${i + 1}`,
      data: clusterData.filter(point => point.cluster === i),
      color: clusterColors[i % clusterColors.length]
    })
  );

  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>K-Means Elbow Method</CardTitle>
          <CardDescription>Within-cluster sum of squares (WCSS) for different K values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="titanic-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={elbowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="k" label={{ value: "Number of Clusters (K)", position: "bottom", offset: 0 }} />
                <YAxis label={{ value: "WCSS / Inertia", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="inertia" 
                  name="Within-Cluster Sum of Squares" 
                  stroke="#0ea5e9" 
                  activeDot={{ r: 8 }}
                  dot={{ stroke: '#0ea5e9', strokeWidth: 2 }}
                />
                {/* Highlight the optimal K value */}
                <Line 
                  type="monotone" 
                  data={[{ k: kmeansData.optimalK, inertia: elbowData[kmeansData.optimalK - 1].inertia }]} 
                  dataKey="inertia" 
                  name={`Optimal K = ${kmeansData.optimalK}`} 
                  stroke="#ef4444" 
                  strokeWidth={0} 
                  dot={{ r: 8, stroke: '#ef4444', strokeWidth: 2, fill: '#ef4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>K-Means Clustering Results</CardTitle>
          <CardDescription>Clusters visualized in PCA space (PC1 vs PC2)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="titanic-chart-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="PC1" label={{ value: "Principal Component 1", position: "bottom", offset: 0 }} />
                <YAxis type="number" dataKey="y" name="PC2" label={{ value: "Principal Component 2", angle: -90, position: "insideLeft" }} />
                <ZAxis type="number" range={[60]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                {clusterGroups.map((cluster, index) => (
                  <Scatter 
                    key={`cluster-${index}`}
                    name={cluster.name} 
                    data={cluster.data} 
                    fill={cluster.color}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KMeansAnalysis;
