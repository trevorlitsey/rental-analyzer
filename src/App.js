import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    // Purchase Details
    cprice: "300000",
    cuseloan: "yes",
    cdownpayment: "20",
    cinterest: "6",
    cloanterm: "30",
    cothercost: "6000",
    cneedrepair: "no",
    crepaircost: "20000",
    cafterrepairvalue: "260000",

    // Operating Expenses
    ctax: "3900",
    ctaxincrease: "3",
    cinsurance: "2700",
    cinsuranceincrease: "3",
    choa: "0",
    choaincrease: "3",
    cmaintenance: "3000",
    cmaintenanceincrease: "3",
    cother: "500",
    cotherincrease: "3",

    // Income
    crent: "2000",
    crentincrease: "3",
    cotherincome: "0",
    cotherincomeincrease: "3",
    cvacancy: "5",
    cmanagement: "0",

    // Selling
    cknowsellprice: "no",
    cappreciation: "3",
    csellprice: "400000",
    cholding: "10",
    csellcost: "8",
    printit: "0",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
    };

    // Auto-calculate property tax, insurance, and maintenance when purchase price changes
    if (name === "cprice") {
      const purchasePrice = parseFloat(value) || 0;
      const propertyTax = Math.round(purchasePrice * 0.013); // 1.30%
      const insurance = Math.round(purchasePrice * 0.009); // 0.90%
      const maintenance = Math.round(purchasePrice * 0.01); // 1.00%
      newFormData.ctax = propertyTax.toString();
      newFormData.cinsurance = insurance.toString();
      newFormData.cmaintenance = maintenance.toString();
    }

    setFormData(newFormData);
  };

  const buildCalculatorURL = () => {
    const baseURL =
      "https://www.calculator.net/rental-property-calculator.html";
    const params = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        params.append(key, value);
      }
    });

    return `${baseURL}?${params.toString()}&x=Calculate`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildCalculatorURL();
    window.open(url, "_blank");
  };

  const inputGroups = [
    {
      title: "Purchase Details",
      fields: [
        {
          name: "cprice",
          label: "Purchase Price ($)",
          type: "number",
          placeholder: "300000",
          step: 10000,
        },
        {
          name: "cdownpayment",
          label: "Down Payment (%)",
          type: "number",
          placeholder: "20",
        },
        {
          name: "cinterest",
          label: "Interest Rate (%)",
          type: "number",
          step: "0.01",
          placeholder: "6",
        },
        {
          name: "cloanterm",
          label: "Loan Term (years)",
          type: "number",
          placeholder: "30",
        },
        {
          name: "cothercost",
          label: "Closing Cost ($)",
          type: "number",
          placeholder: "6000",
          step: 1000,
        },
        {
          name: "cneedrepair",
          label: "Need Repairs?",
          type: "select",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          name: "crepaircost",
          label: "Repair Cost ($)",
          type: "number",
          placeholder: "20000",
          conditional: "cneedrepair",
          showWhen: "yes",
        },
        {
          name: "cafterrepairvalue",
          label: "Value After Repairs ($)",
          type: "number",
          placeholder: "260000",
          conditional: "cneedrepair",
          showWhen: "yes",
        },
      ],
    },
    {
      title: "Operating Expenses (Annual)",
      fields: [
        {
          name: "ctax",
          label: "Property Tax ($) - 1.30% of Purchase Price",
          type: "number",
          placeholder: "3900",
          step: 100,
          calculated: true,
        },
        {
          name: "ctaxincrease",
          label: "Tax Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cinsurance",
          label: "Insurance ($) - 0.90% of Purchase Price",
          type: "number",
          step: 100,
          placeholder: "2700",
          calculated: true,
        },
        {
          name: "cinsuranceincrease",
          label: "Insurance Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cmaintenance",
          label: "Maintenance ($) - 1.00% of Purchase Price",
          type: "number",
          step: 100,
          placeholder: "3000",
          calculated: true,
        },
        {
          name: "cmaintenanceincrease",
          label: "Maintenance Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cother",
          label: "Other Costs ($)",
          type: "number",
          placeholder: "500",
        },
        {
          name: "cotherincrease",
          label: "Other Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
      ],
    },
    {
      title: "Income",
      fields: [
        {
          name: "crent",
          label: "Monthly Rent ($)",
          type: "number",
          placeholder: "2000",
        },
        {
          name: "crentincrease",
          label: "Rent Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cotherincome",
          label: "Other Monthly Income ($)",
          type: "number",
          placeholder: "0",
        },
        {
          name: "cotherincomeincrease",
          label: "Other Income Increase (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cvacancy",
          label: "Vacancy Rate (%)",
          type: "number",
          step: "0.01",
          placeholder: "5",
        },
        {
          name: "cmanagement",
          label: "Management Fee (%)",
          type: "number",
          step: "0.01",
          placeholder: "0",
        },
      ],
    },
    {
      title: "Selling",
      fields: [
        {
          name: "cappreciation",
          label: "Appreciation (%)",
          type: "number",
          step: "0.01",
          placeholder: "3",
        },
        {
          name: "cholding",
          label: "Holding Period (years)",
          type: "number",
          placeholder: "10",
        },
        {
          name: "csellcost",
          label: "Sell Cost (%)",
          type: "number",
          step: "0.01",
          placeholder: "8",
        },
      ],
    },
  ];

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Rental Property Calculator</h1>
          <p>
            Analyze your real estate investment potential with detailed
            calculations
          </p>
        </header>

        <form onSubmit={handleSubmit} className="calculator-form">
          {inputGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="input-group">
              <h2 className="group-title">{group.title}</h2>
              <div className="fields-grid">
                {group.fields.map((field) => {
                  // Check if field should be shown based on conditional logic
                  const shouldShow = field.conditional
                    ? formData[field.conditional] === field.showWhen
                    : true;

                  if (!shouldShow) return null;

                  return (
                    <div key={field.name} className="field">
                      <label htmlFor={field.name} className="field-label">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className="field-input"
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          step={field.step}
                          readOnly={field.readOnly}
                          className={`field-input ${
                            field.calculated ? "calculated-field" : ""
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="submit-section">
            <button type="submit" className="calculate-button">
              <span>Calculate Investment</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <p className="submit-note">
              This will open the calculator.net rental property calculator in a
              new tab with your inputs
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
