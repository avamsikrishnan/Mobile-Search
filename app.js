const state = {
  records: [],
  filteredRecords: [],
};

const elements = {
  searchInput: document.getElementById("searchInput"),
  stateFilter: document.getElementById("stateFilter"),
  clearButton: document.getElementById("clearButton"),
  resultCount: document.getElementById("resultCount"),
  directoryBody: document.getElementById("directoryBody"),
};

async function fetchRecords() {
  const response = await fetch("data/deans.json");
  if (!response.ok) {
    throw new Error(`Could not load data: ${response.status}`);
  }
  return response.json();
}

function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}

function createStateOptions(records) {
  const states = Array.from(new Set(records.map((row) => row.state))).sort();
  for (const entry of states) {
    const option = document.createElement("option");
    option.value = entry;
    option.textContent = entry;
    elements.stateFilter.appendChild(option);
  }
}

function matchesSearch(record, searchText) {
  if (!searchText) {
    return true;
  }

  const haystack = [
    record.institution,
    record.dean,
    record.address,
    record.city,
    record.state,
    record.zip,
    record.email,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchText);
}

function filterRecords() {
  const searchText = normalize(elements.searchInput.value);
  const stateText = normalize(elements.stateFilter.value);

  state.filteredRecords = state.records.filter((record) => {
    const stateMatches = !stateText || normalize(record.state) === stateText;
    return stateMatches && matchesSearch(record, searchText);
  });

  renderTable(state.filteredRecords);
}

function renderTable(records) {
  elements.directoryBody.innerHTML = "";

  if (records.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.className = "empty-message";
    cell.textContent = "No matching records found.";
    row.appendChild(cell);
    row.className = "empty-row";
    elements.directoryBody.appendChild(row);
  } else {
    for (const record of records) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${record.institution}</td>
        <td>${record.dean}</td>
        <td>${record.address}</td>
        <td>${record.city}</td>
        <td>${record.state}</td>
        <td>${record.zip}</td>
        <td><a href="mailto:${record.email}">${record.email}</a></td>
      `;

      elements.directoryBody.appendChild(row);
    }
  }

  elements.resultCount.textContent = `${records.length} record${
    records.length === 1 ? "" : "s"
  } shown`;
}

function attachEvents() {
  elements.searchInput.addEventListener("input", filterRecords);
  elements.stateFilter.addEventListener("change", filterRecords);
  elements.clearButton.addEventListener("click", () => {
    elements.searchInput.value = "";
    elements.stateFilter.value = "";
    filterRecords();
  });
}

async function initialize() {
  try {
    state.records = await fetchRecords();
    createStateOptions(state.records);
    attachEvents();
    filterRecords();
  } catch (error) {
    elements.resultCount.textContent =
      "Unable to load records. Please try again later.";
    elements.directoryBody.innerHTML = "";
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.className = "empty-message";
    cell.textContent = error.message;
    row.appendChild(cell);
    row.className = "empty-row";
    elements.directoryBody.appendChild(row);
  }
}

initialize();
