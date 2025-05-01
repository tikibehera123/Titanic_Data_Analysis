# Titanic Data Analysis Dashboard

## Overview

This interactive dashboard provides a visual exploration of the famous Titanic dataset using unsupervised machine learning techniques. The application performs Principal Component Analysis (PCA) and K-Means clustering to identify patterns within the passenger data without relying on the "Survived" label.
screenshot![{53A8F8C9-8068-47F7-9503-EB72C43B973C}](https://github.com/user-attachments/assets/bcd75998-17e2-4585-bcd0-4607a213f774)
![{A4B74DBE-AB2E-4015-B7AA-762878648AB4}](https://github.com/user-attachments/assets/530cdb72-5845-4349-bab9-468ecd065ffc)
![{588A8D56-EA43-4DC3-B5FF-A9C9B9C7CC99}](https://github.com/user-attachments/assets/8d34b5aa-8991-460a-bc8b-323b51df23e2)
![{166FB13F-83EE-45AE-B7B1-005DCE67AB83}](https://github.com/user-attachments/assets/57db1df0-5e60-4418-a576-f1b7f757e3de)
![{4C04E008-FC0F-4762-B16D-723EB3C64FC6}](https://github.com/user-attachments/assets/4e6fa0f7-ad7b-4821-b37c-476005c9ca87)
![{5E8A48E2-B051-47CE-BC64-A9C41D3C9B5B}](https://github.com/user-attachments/assets/e929819f-a16e-42a5-8ab9-d62da8310433)

## Features

### 1. Data Overview
- Basic statistics and visualizations of the Titanic dataset
- Passenger demographics (age, gender, class distribution)
- Fare and family size statistics
- Missing data visualization

### 2. Principal Component Analysis (PCA)
- Visualization of explained variance by principal component
- Cumulative variance plot showing information retention
- Interactive scatter plot of passengers projected onto the first two principal components

### 3. K-Means Clustering
- Elbow method visualization for optimal cluster selection
- Interactive cluster visualization in PCA space
- Color-coded clusters with detailed tooltips

### 4. Cluster Details
- Comprehensive profile of each identified passenger cluster
- Demographics analysis per cluster (age, gender, ticket class)
- Embarkation point distribution per cluster
- Comparative visualizations between clusters

## Technical Implementation

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Visualizations**: Recharts for interactive data visualization
- **Data Processing**: Simulated PCA and K-Means algorithms
- **State Management**: React hooks for local state management

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd titanic-data-analysis
```

2. Install dependencies:
```sh
npm install
# or
yarn
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## Project Structure

- `src/components/`: React components including visualizations
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions for data processing and analysis
- `src/pages/`: Main application pages

## Future Enhancements

- Integration with real machine learning algorithms (replacing simulated data)
- Additional visualization techniques (t-SNE, UMAP)
- Supervised learning models for survival prediction
- Feature importance analysis
- Interactive data filtering and selection

## Note

This project currently uses simulated results for PCA and K-Means clustering to demonstrate the UI and interaction patterns. In a production environment, these would be calculated using actual machine learning algorithms.
