const xValues = ['Sales', 'Marketing', 'Design', 'HR', 'Legal', 'IT', 'OPS'];
const yValues = [50, 57, 83, 78, 92, 23, 43];
const barColors = ["orange", "blue", "green", "red", "blue", "orange", "green"];



let chart;

function updateTable(selectedDepartment) {
  const departmentData = {
    'Department A': { total: 10, yetToStart: 3, inProgress: 4, completed: 3, averageProgress: 55, averageSpendTime: 5 },
    'Department B': { total: 15, yetToStart: 5, inProgress: 6, completed: 4, averageProgress: 67, averageSpendTime: 7 },
    'Department C': { total: 8, yetToStart: 2, inProgress: 3, completed: 3, averageProgress: 78, averageSpendTime: 6 },
    'Department D': { total: 12, yetToStart: 4, inProgress: 5, completed: 3, averageProgress: 63, averageSpendTime: 5.5 },
    'Department E': { total: 18, yetToStart: 6, inProgress: 8, completed: 4, averageProgress: 75, averageSpendTime: 8 },
    'Department F': { total: 7, yetToStart: 1, inProgress: 2, completed: 4, averageProgress: 42, averageSpendTime: 4 },
    'Department G': { total: 11, yetToStart: 3, inProgress: 5, completed: 3, averageProgress: 58, averageSpendTime: 6.2 },
  };

  const tbody = document.getElementById('departmentTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";

  if (selectedDepartment !== 'Select Department' && departmentData[selectedDepartment]) {
    const rowData = Object.values(departmentData[selectedDepartment]);
    const row = tbody.insertRow();
    rowData.forEach((data, index) => {
      const cell = row.insertCell(index);
      if (index === rowData.length - 1) {
       
        const hours = Math.floor(data);
        const minutes = Math.round((data - hours) * 60);
        cell.textContent = `${hours} hours ${minutes} minutes`;
      } else {
        cell.textContent = data;
      }
    });
  }

  updateReportValues(selectedDepartment);
}
function updateChart(selectedPercentageRange) {
const chartData = {
'0-50%': [50, 57, 83, 78, 92, 23, 43],
'51-75%': [60, 67, 73, 68, 82, 33, 53],
'76-100%': [70, 77, 93, 88, 102, 43, 63],
};

if (chart) {
chart.destroy();
}

chart = new Chart("myChart", {
type: "bar",
data: {
  labels: xValues,
  datasets: [{
    backgroundColor: barColors,
    
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 3,
    data: chartData[selectedPercentageRange]
  }]
},
options: {
  plugins: {
    title: {
      display: true,
      text: `Department Performance`,
      color: 'black',
       
      font: {
        weight: 'bold',
        
      },
      align: 'start', 
     
    },
    selectedPercentage: { 
      display: true,
      text: `Selected Percentage: ${selectedPercentageRange}`,
      font: {
        weight: 'bold'
      },
    
     
    }
  },
  legend: {
    display: false
  },
  scales: {
    y: {
      ticks: {
        color: 'black',
        font: {
          weight: 'bold',
          
        }
      }
    },
    x: {
      ticks: {
        color:"black",
        font: {
          weight: 'bold',
          color: 'black'
        }
      }
    }
  }
}
});
}







document.getElementById('departmentDropdown').addEventListener('change', function () {
  const selectedDepartment = this.value;
  updateTable(selectedDepartment);
});

document.getElementById('percentageDropdown').addEventListener('change', function () {
  const selectedPercentageRange = this.value;
  updateChart(selectedPercentageRange);
});

updateChart('0-50%');

function updateReportValues(selectedDepartment) {
  const totalEnvironmentsElement = document.getElementById('totalEnvironments');
  const yetToStartElement = document.getElementById('yetToStart');
  const inProgressElement = document.getElementById('inProgress');
  const completedElement = document.getElementById('completed');
  const averageProgressElement = document.getElementById('averageProgress');
  const averageSpendElement = document.getElementById('averageSpend');

  const departmentData = {
    'Department A': { total: 10, yetToStart: 3, inProgress: 4, completed: 3, averageProgress: 55, averageSpendTime: 5 },
    'Department B': { total: 15, yetToStart: 5, inProgress: 6, completed: 4, averageProgress: 67, averageSpendTime: 7 },
    'Department C': { total: 8, yetToStart: 2, inProgress: 3, completed: 3, averageProgress: 78, averageSpendTime: 6 },
    'Department D': { total: 12, yetToStart: 4, inProgress: 5, completed: 3, averageProgress: 63, averageSpendTime: 5.5 },
    'Department E': { total: 18, yetToStart: 6, inProgress: 8, completed: 4, averageProgress: 75, averageSpendTime: 8 },
    'Department F': { total: 7, yetToStart: 1, inProgress: 2, completed: 4, averageProgress: 42, averageSpendTime: 4 },
    'Department G': { total: 11, yetToStart: 3, inProgress: 5, completed: 3, averageProgress: 58, averageSpendTime: 6.2 },
  };

  const selectedData = departmentData[selectedDepartment];

  totalEnvironmentsElement.textContent = selectedData.total;
  yetToStartElement.textContent = selectedData.yetToStart;
  inProgressElement.textContent = selectedData.inProgress;
  completedElement.textContent = selectedData.completed;
  averageProgressElement.textContent = selectedData.averageProgress + "%";
  const hours = Math.floor(selectedData.averageSpendTime);
  const minutes = Math.round((selectedData.averageSpendTime - hours) * 60);
  averageSpendElement.textContent = `${hours} hours ${minutes} minutes`;
}