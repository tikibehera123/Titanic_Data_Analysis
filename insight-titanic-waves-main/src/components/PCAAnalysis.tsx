
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";

interface PCAAnalysisProps {
  pcaData: {
    explainedVariance: number[];
    cumulativeVariance: number[];
    transformedData: number[][];
  };
}

const PCAAnalysis: React.FC<PCAAnalysisProps> = ({ pcaData }) => {
  // Prepare data for variance plot
  const varianceData = pcaData.explainedVariance.map((variance, index) => ({
    component: `PC${index + 1}`,
    variance: variance * 100
  }));

  // Prepare data for cumulative variance plot
  const cumulativeData = pcaData.cumulativeVariance.map((cumulative, index) => ({
    component: `PC${index + 1}`,
    cumulative: cumulative * 100
  }));

  // Prepare data for PCA scatter plot
  const scatterData = pcaData.transformedData.map((point, index) => ({
    x: point[0],
    y: point[1],
    id: index
  }));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Explained Variance by Component</CardTitle>
            <CardDescription>Percentage of variance explained by each principal component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="titanic-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={varianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="component" />
                  <YAxis label={{ value: "Variance (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => {
                    // Ensure value is a number before calling toFixed
                    return [typeof value === 'number' ? `${value.toFixed(1)}%` : `${value}%`, "Explained Variance"];
                  }} />
                  <Legend />
                  <Line type="monotone" dataKey="variance" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumulative Explained Variance</CardTitle>
            <CardDescription>Total variance explained as components are added</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="titanic-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="component" />
                  <YAxis domain={[0, 100]} label={{ value: "Cumulative Variance (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => {
                    // Ensure value is a number before calling toFixed
                    return [typeof value === 'number' ? `${value.toFixed(1)}%` : `${value}%`, "Cumulative Variance"];
                  }} />
                  <Legend />
                  <Line type="monotone" dataKey="cumulative" stroke="#0284c7" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PCA Projection (PC1 vs PC2)</CardTitle>
          <CardDescription>Passenger data projected onto first two principal components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="titanic-chart-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="PC1" label={{ value: "Principal Component 1", position: "bottom", offset: 0 }} />
                <YAxis type="number" dataKey="y" name="PC2" label={{ value: "Principal Component 2", angle: -90, position: "insideLeft" }} />
                <ZAxis type="number" range={[60]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value) => {
                  // Ensure value is a number before calling toFixed
                  return typeof value === 'number' ? value.toFixed(2) : value;
                }} />
                <Legend />
                <Scatter name="Passengers" data={scatterData} fill="#0ea5e9" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PCAAnalysis;
