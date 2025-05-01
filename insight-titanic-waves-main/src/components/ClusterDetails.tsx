
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { ClusterSummary } from "../types/dataTypes";
import { Badge } from "@/components/ui/badge";

interface ClusterDetailsProps {
  clusterSummaries: ClusterSummary[];
}

const ClusterDetails: React.FC<ClusterDetailsProps> = ({ clusterSummaries }) => {
  // Colors for clusters
  const clusterColors = ["#0ea5e9", "#f97316", "#8b5cf6", "#10b981", "#ef4444"];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {clusterSummaries.map((cluster, index) => {
          const clusterColor = clusterColors[index % clusterColors.length];
          
          // Prepare data for class distribution
          const classData = Object.entries(cluster.pclassDistribution).map(([key, value]) => ({
            name: `Class ${key}`,
            value
          }));
          
          // Prepare data for sex distribution
          const sexData = Object.entries(cluster.sexDistribution).map(([key, value]) => ({
            name: key,
            value
          }));
          
          // Prepare data for embarked distribution
          const embarkedData = Object.entries(cluster.embarkedDistribution)
            .filter(([_, value]) => value > 0)
            .map(([key, value]) => ({
              name: key,
              value
            }));
          
          return (
            <Card key={`cluster-${index}`} className="overflow-hidden">
              <CardHeader className="pb-2" style={{ backgroundColor: `${clusterColor}20` }}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: clusterColor }}></div>
                    Cluster {cluster.clusterId + 1}
                  </CardTitle>
                  <Badge variant="outline">{cluster.count} passengers</Badge>
                </div>
                <CardDescription>
                  {getClusterDescription(cluster)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Age</p>
                    <p className="text-2xl font-bold">{cluster.averageAge.toFixed(1)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Fare</p>
                    <p className="text-2xl font-bold">£{cluster.averageFare.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Passenger Class</h4>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill={clusterColor} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Gender</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sexData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {sexData.map((entry, i) => (
                              <Cell 
                                key={`cell-${i}`} 
                                fill={i === 0 ? "#0369a1" : "#f472b6"} 
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Embarked</h4>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={embarkedData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {embarkedData.map((entry, i) => (
                              <Cell 
                                key={`cell-${i}`} 
                                fill={clusterColors[(i + 2) % clusterColors.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to generate cluster description
const getClusterDescription = (cluster: ClusterSummary): string => {
  const { sexDistribution, averageAge, pclassDistribution, averageFare } = cluster;
  
  // Determine dominant gender
  const maleCount = sexDistribution.Male || 0;
  const femaleCount = sexDistribution.Female || 0;
  const dominantGender = maleCount > femaleCount ? "male" : "female";
  const genderRatio = maleCount > femaleCount 
    ? `${Math.round((maleCount / (maleCount + femaleCount)) * 100)}% male` 
    : `${Math.round((femaleCount / (maleCount + femaleCount)) * 100)}% female`;
  
  // Determine dominant class
  const classEntries = Object.entries(pclassDistribution);
  classEntries.sort((a, b) => b[1] - a[1]);
  const dominantClass = classEntries[0][0];
  
  // Age category
  let ageCategory = "middle-aged";
  if (averageAge < 18) ageCategory = "young";
  else if (averageAge > 50) ageCategory = "older";
  
  // Fare category
  let fareCategory = "medium fare";
  if (averageFare < 15) fareCategory = "low fare";
  else if (averageFare > 50) fareCategory = "high fare";
  
  return `Predominantly ${genderRatio}, ${ageCategory} ${dominantGender}s, ${fareCategory}, class ${dominantClass}`;
};

export default ClusterDetails;
