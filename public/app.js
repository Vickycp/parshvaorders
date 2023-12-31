
let csvData;
let dockets = [];
let lastValues = {};

// Parse the CSV file using Papa Parse
Papa.parse('data.csv', {
  header: true,
  download: true,
  skipEmptyLines: true,
  complete: function(results) {
    csvData = results.data;

    // Fill empty fields with the value above
    csvData.forEach(row => {
      Object.keys(row).forEach(key => {
        if (!row[key]) {
          row[key] = lastValues[key];
        } else {
          lastValues[key] = row[key];
        }
      });
    });

    // Populate supplier dropdown
    let supplierDropdown = document.getElementById('supplier');
    let uniqueSuppliers = [...new Set(csvData.map(item => item.Supplier))];
    uniqueSuppliers.forEach(supplier => {
        let option = document.createElement("option");
        option.textContent = supplier;
        option.value = supplier;
        supplierDropdown.appendChild(option);
    });
    supplierDropdown.value = "select"; // Replace "Default Supplier Name" with your desired default supplier name

  }
});

// Populate purchase order dropdown based on selected supplier
document.getElementById('supplier').addEventListener('change', (event) => {
  let selectedSupplier = event.target.value;
  let purchaseOrderDropdown = document.getElementById('purchaseOrder');
  purchaseOrderDropdown.innerHTML = ''; // Clear previous options
  let purchaseOrders = csvData.filter(item => item.Supplier === selectedSupplier);
  purchaseOrders.forEach(po => {
      let option = document.createElement("option");
      option.textContent = po['PO Number'];
      option.value = po['PO Number'];
      option.setAttribute('data-description', po.Description);
      purchaseOrderDropdown.appendChild(option);
  });
});

document.getElementById('purchaseOrder').addEventListener('change', (event) => {
  let selectedOption = event.target.selectedOptions[0];
  let description = selectedOption.getAttribute('data-description');

  // Display the description in an element with id 'descriptionDisplay'
  document.getElementById('descriptionDisplay').textContent = description;
});





// Handle form submission to create a docket
document.getElementById('docketForm').addEventListener('submit', (event) => {
  event.preventDefault();
  let selectedPO = document.getElementById('purchaseOrder');
  let description = selectedPO.options[selectedPO.selectedIndex].getAttribute('data-description');

  let docket = {
      name: document.getElementById('name').value,
      startTime: document.getElementById('startTime').value,
      endTime: document.getElementById('endTime').value,
      hoursWorked: document.getElementById('hoursWorked').value,
      ratePerHour: document.getElementById('ratePerHour').value,
      supplier: document.getElementById('supplier').value,
      purchaseOrder: selectedPO.value,
      description: description
  };
  dockets.push(docket);
  saveDocketToDB(docket); 
});

// Function to save docket data to mongodb
function saveDocketToDB(docket) {
  // URL of your API endpoint
const apiUrl = '/events';


fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(docket)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Event saved successfully:', data);
    displayDockets();
  
  })
  .catch(error => {
    console.error('Error:', error);
   
  });
}async function fetchDocketData() {
  const apiUrl = '/events';

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    console.error('Error:', error);
   
    throw error;
  }
}

async function displayDockets() {
  try {
    const data = await fetchDocketData();
    console.log(data);
    let docketTable = document.createElement('table');
    docketTable.classList.add('docket-table');

    let headerRow = docketTable.insertRow();
    let headers = ['Name', 'Start Time', 'End Time', 'Hours Worked', 'Rate per Hour', 'Supplier', 'Purchase Order', 'Description'];
    headers.forEach(headerText => {
      let headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });

    data.events.forEach(docket => {
      let row = docketTable.insertRow();
      let rowData = [docket.name, docket.startTime, docket.endTime, docket.hoursWorked, docket.ratePerHour, docket.supplier, docket.purchaseOrder, docket.description];
      rowData.forEach(text => {
        let cell = row.insertCell();
        cell.textContent = text;
      });
    });

    let docketList = document.getElementById('docketList');
    docketList.innerHTML = '';
    docketList.appendChild(docketTable);
  } catch (error) {
    console.error('Error displaying dockets:', error);
    
  }
}

displayDockets();

