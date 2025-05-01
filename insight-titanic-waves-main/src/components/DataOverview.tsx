
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface DataOverviewProps {
  summary: {
    totalPassengers: number;
    survived: number;
    males: number;
    females: number;
    avgAge: number;
    classCounts: {
      [key: string]: number;
    };
    embarkedCounts: {
      [key: string]: number;
    };
  };
}

const DataOverview: React.FC<DataOverviewProps> = ({ summary }) => {
  // Prepare data for gender chart
  const genderData = [
    { name: "Male", value: summary.males, color: "#0369a1" },
    { name: "Female", value: summary.females, color: "#f472b6" }
  ];

  // Prepare data for class chart
  const classData = Object.entries(summary.classCounts).map(([key, value]) => ({
    name: key,
    value
  }));

  // Prepare data for embarked chart
  const embarkedData = Object.entries(summary.embarkedCounts)
    .filter(([key]) => key !== "Unknown")
    .map(([key, value]) => ({
      name: key,
      value
    }));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Passengers</CardTitle>
            <CardDescription>Total number of passengers in dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-titanic-600">{summary.totalPassengers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Survival Rate</CardTitle>
            <CardDescription>Percentage of passengers that survived</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-titanic-600">
              {Math.round((summary.survived / summary.totalPassengers) * 100)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Age</CardTitle>
            <CardDescription>Mean passenger age</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-titanic-600">{summary.avgAge.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gender Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Breakdown by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="titanic-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Passenger Class</CardTitle>
            <CardDescription>Distribution by ticket class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="titanic-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Passengers" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Embarked Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Embarkation Port</CardTitle>
            <CardDescription>Where passengers boarded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="titanic-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={embarkedData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Passengers" fill="#0284c7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataOverview;
