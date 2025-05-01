
import { TitanicPassenger, ProcessedPassenger } from "../types/dataTypes";

// Mock Titanic dataset with a sample of 20 entries
export const mockTitanicData: TitanicPassenger[] = [
  { PassengerId: 1, Survived: 0, Pclass: 3, Name: "Braund, Mr. Owen Harris", Sex: "male", Age: 22, SibSp: 1, Parch: 0, Ticket: "A/5 21171", Fare: 7.25, Cabin: null, Embarked: "S" },
  { PassengerId: 2, Survived: 1, Pclass: 1, Name: "Cumings, Mrs. John Bradley", Sex: "female", Age: 38, SibSp: 1, Parch: 0, Ticket: "PC 17599", Fare: 71.28, Cabin: "C85", Embarked: "C" },
  { PassengerId: 3, Survived: 1, Pclass: 3, Name: "Heikkinen, Miss. Laina", Sex: "female", Age: 26, SibSp: 0, Parch: 0, Ticket: "STON/O2. 3101282", Fare: 7.92, Cabin: null, Embarked: "S" },
  { PassengerId: 4, Survived: 1, Pclass: 1, Name: "Futrelle, Mrs. Jacques Heath", Sex: "female", Age: 35, SibSp: 1, Parch: 0, Ticket: "113803", Fare: 53.1, Cabin: "C123", Embarked: "S" },
  { PassengerId: 5, Survived: 0, Pclass: 3, Name: "Allen, Mr. William Henry", Sex: "male", Age: 35, SibSp: 0, Parch: 0, Ticket: "373450", Fare: 8.05, Cabin: null, Embarked: "S" },
  { PassengerId: 6, Survived: 0, Pclass: 3, Name: "Moran, Mr. James", Sex: "male", Age: null, SibSp: 0, Parch: 0, Ticket: "330877", Fare: 8.46, Cabin: null, Embarked: "Q" },
  { PassengerId: 7, Survived: 0, Pclass: 1, Name: "McCarthy, Mr. Timothy J", Sex: "male", Age: 54, SibSp: 0, Parch: 0, Ticket: "17463", Fare: 51.86, Cabin: "E46", Embarked: "S" },
  { PassengerId: 8, Survived: 0, Pclass: 3, Name: "Palsson, Master. Gosta Leonard", Sex: "male", Age: 2, SibSp: 3, Parch: 1, Ticket: "349909", Fare: 21.07, Cabin: null, Embarked: "S" },
  { PassengerId: 9, Survived: 1, Pclass: 3, Name: "Johnson, Mrs. Oscar W", Sex: "female", Age: 27, SibSp: 0, Parch: 2, Ticket: "347742", Fare: 11.13, Cabin: null, Embarked: "S" },
  { PassengerId: 10, Survived: 1, Pclass: 2, Name: "Nasser, Mrs. Nicholas", Sex: "female", Age: 14, SibSp: 1, Parch: 0, Ticket: "237736", Fare: 30.07, Cabin: null, Embarked: "C" },
  { PassengerId: 11, Survived: 1, Pclass: 3, Name: "Sandstrom, Miss. Marguerite Rut", Sex: "female", Age: 4, SibSp: 1, Parch: 1, Ticket: "PP 9549", Fare: 16.7, Cabin: "G6", Embarked: "S" },
  { PassengerId: 12, Survived: 1, Pclass: 1, Name: "Bonnell, Miss. Elizabeth", Sex: "female", Age: 58, SibSp: 0, Parch: 0, Ticket: "113783", Fare: 26.55, Cabin: "C103", Embarked: "S" },
  { PassengerId: 13, Survived: 0, Pclass: 3, Name: "Saundercock, Mr. William Henry", Sex: "male", Age: 20, SibSp: 0, Parch: 0, Ticket: "A/5. 2151", Fare: 8.05, Cabin: null, Embarked: "S" },
  { PassengerId: 14, Survived: 0, Pclass: 3, Name: "Andersson, Mr. Anders Johan", Sex: "male", Age: 39, SibSp: 1, Parch: 5, Ticket: "347082", Fare: 31.28, Cabin: null, Embarked: "S" },
  { PassengerId: 15, Survived: 0, Pclass: 3, Name: "Vestrom, Miss. Hulda Amanda Adolfina", Sex: "female", Age: 14, SibSp: 0, Parch: 0, Ticket: "350406", Fare: 7.85, Cabin: null, Embarked: "S" },
  { PassengerId: 16, Survived: 1, Pclass: 2, Name: "Hewlett, Mrs. (Mary D Kingcome)", Sex: "female", Age: 55, SibSp: 0, Parch: 0, Ticket: "248706", Fare: 16, Cabin: null, Embarked: "S" },
  { PassengerId: 17, Survived: 0, Pclass: 3, Name: "Rice, Master. Eugene", Sex: "male", Age: 2, SibSp: 4, Parch: 1, Ticket: "382652", Fare: 29.12, Cabin: null, Embarked: "Q" },
  { PassengerId: 18, Survived: 1, Pclass: 2, Name: "Williams, Mr. Charles Eugene", Sex: "male", Age: null, SibSp: 0, Parch: 0, Ticket: "244373", Fare: 13, Cabin: null, Embarked: "S" },
  { PassengerId: 19, Survived: 0, Pclass: 3, Name: "Vander Planke, Mrs. Julius", Sex: "female", Age: 31, SibSp: 1, Parch: 0, Ticket: "345763", Fare: 18, Cabin: null, Embarked: "S" },
  { PassengerId: 20, Survived: 1, Pclass: 3, Name: "Masselmani, Mrs. Fatima", Sex: "female", Age: null, SibSp: 0, Parch: 0, Ticket: "2649", Fare: 7.22, Cabin: null, Embarked: "C" }
];

// Function to preprocess the Titanic data
export const preprocessTitanicData = (data: TitanicPassenger[]): ProcessedPassenger[] => {
  // 1. Calculate median age for imputation
  const validAges = data.filter(p => p.Age !== null).map(p => p.Age as number);
  const medianAge = validAges.sort((a, b) => a - b)[Math.floor(validAges.length / 2)];
  
  // 2. Calculate mode of embarked for imputation
  const embarkedCounts: {[key: string]: number} = {};
  data.forEach(p => {
    if (p.Embarked) {
      embarkedCounts[p.Embarked] = (embarkedCounts[p.Embarked] || 0) + 1;
    }
  });
  const modeEmbarked = Object.entries(embarkedCounts).reduce(
    (a, b) => a[1] > b[1] ? a : b
  )[0];

  // 3. Process each passenger
  return data.map(passenger => {
    // Impute missing values and convert categorical features
    const processedPassenger: ProcessedPassenger = {
      PassengerId: passenger.PassengerId,
      Pclass: passenger.Pclass,
      Sex_numeric: passenger.Sex === "male" ? 1 : 0,
      Age: passenger.Age !== null ? passenger.Age : medianAge,
      SibSp: passenger.SibSp,
      Parch: passenger.Parch,
      Fare: passenger.Fare,
      Embarked_C: passenger.Embarked === "C" ? 1 : 0,
      Embarked_Q: passenger.Embarked === "Q" ? 1 : 0,
      Embarked_S: passenger.Embarked === "S" || passenger.Embarked === null ? 1 : 0
    };
    
    return processedPassenger;
  });
};

export const getDataSummary = (data: TitanicPassenger[]) => {
  // Calculate basic statistics
  const totalPassengers = data.length;
  const survived = data.filter(p => p.Survived === 1).length;
  const males = data.filter(p => p.Sex === "male").length;
  const females = data.filter(p => p.Sex === "female").length;
  
  const validAges = data.filter(p => p.Age !== null).map(p => p.Age as number);
  const avgAge = validAges.reduce((sum, age) => sum + age, 0) / validAges.length;
  
  const classCounts = {
    "1st Class": data.filter(p => p.Pclass === 1).length,
    "2nd Class": data.filter(p => p.Pclass === 2).length,
    "3rd Class": data.filter(p => p.Pclass === 3).length
  };
  
  const embarkedCounts = {
    "Cherbourg (C)": data.filter(p => p.Embarked === "C").length,
    "Queenstown (Q)": data.filter(p => p.Embarked === "Q").length,
    "Southampton (S)": data.filter(p => p.Embarked === "S").length,
    "Unknown": data.filter(p => p.Embarked === null).length
  };
  
  return {
    totalPassengers,
    survived,
    males,
    females,
    avgAge,
    classCounts,
    embarkedCounts
  };
};

// Export the columns that would be used for analysis
export const featureColumns = [
  "Pclass", "Sex_numeric", "Age", "SibSp", "Parch", "Fare", 
  "Embarked_C", "Embarked_Q", "Embarked_S"
];
