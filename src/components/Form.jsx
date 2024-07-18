import "./Form.css";
import {useState} from "react";
//import React, { Component } from 'react';
import Select from 'react-select';
import Result from "./Result";

function CalculationForm() {
    const [enteredCsfWbc, setCsfWbc] = useState("0");
    const [enteredDiff, setDiff] = useState("");
    const [enteredCsfGluc, setCsfGluc] = useState("0");
    const [enteredBloodGluc, setBloodGluc] = useState("0");
    const [enteredCrag, setCrag] = useState("");
    const [enteredFever, setFever] = useState("");
    const [enteredHIV, setHIV] = useState("");
    const [finalProb, setProb] = useState(0);
    const [calculated, setCalc] = useState(0);

    let prob;
    let interp = "";

    const optionsDiff = [
        {value: "none", label: "No predominant cell type"},
        {value: "pmn", label: "Neutrophilic"},
        {value: "lympho", label: "Lymphocytic"}
    ];

    const optionsCrag = [
        {value: "none", label: "Not tested"},
        {value: "no", label: "Negative"},
        {value: "yes", label: "Positive"}
    ];

    const optionsFever = [
        {value: "yes", label: "Yes"},
        {value: "no", label: "No"}
    ]

    const optionsHIV = [
        {value: "none", label: "Not tested"},
        {value: "no", label: "Negative"},
        {value: "yes", label: "Positive"}
    ]

    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "#023950",
          // match with the menu
          borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "yellow" : "green",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "red" : "blue"
          }
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          marginTop: 0
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
      };
      
    function csfWbcChangeHandler(event) {
        setCsfWbc(event.target.value);
    }

    function diffChangeHandler(event) {
        setDiff(event.value);
    }

    function csfGlucChangeHandler(event) {
        setCsfGluc(event.target.value);
    }

    function bloodGlucChangeHandler(event) {
        setBloodGluc(event.target.value);
    }

    function cragChangeHandler(event) {
        setCrag(event.value);
    }

    function feverChangeHandler(event) {
        setFever(event.value);
    }

    function hivChangeHandler(event) {
        setHIV(event.value);
    }

    function submitHandler(event){
        event.preventDefault();

        const patientData = {
            csfWbc: parseInt(enteredCsfWbc),
            diff: enteredDiff,
            csfGluc: parseInt(enteredCsfGluc),
            bloodGluc: parseInt(enteredBloodGluc),
            crag: enteredCrag,
            fever: enteredFever,
            hiv: enteredHIV
        };

        if (parseInt(patientData.csfWbc) < 5) {
            patientData.csfWbc = 2.5 * (-0.0007810009)
        } else {
            patientData.csfWbc = patientData.csfWbc * (-0.0007810009)
        }
        
        if (patientData.diff == "lympho") {
            patientData.diff = 1.556377121;
        } else if (patientData.diff == "pmn") {
            patientData.diff = 1.51411468
        } else {
            patientData.diff = 0;
        }

        if (patientData.csfGluc < 20) {
            patientData.csfGluc = 5.5 * (-0.0407057558);
        } else {
            patientData.csfGluc = patientData.csfGluc * (-0.0407057558);
        }

        if (patientData.bloodGluc < 11) {
            patientData.bloodGluc = 5.5 * (0.0060103239);
        } else {
            patientData.bloodGluc = patientData.bloodGluc * (0.0060103239);
        }

        if (patientData.crag == "yes") {
            patientData.crag = -3.502162269;
        } else {
            patientData.crag = 0;
        }

        if (patientData.fever == "yes") {
            patientData.fever = 0.4718978543;
        } else {
            patientData.fever = 0;
        }

        if (patientData.hiv == "yes") {
            patientData.hiv = 0.1284248176;
        } else {
            patientData.hiv = 0;
        }

        console.log(patientData);

        let odds = Math.exp(patientData.csfWbc + patientData.diff + patientData.csfGluc + patientData.bloodGluc + patientData.crag + patientData.fever + patientData.hiv + (-0.6318415877));
        console.log(odds);
        prob = Math.floor((odds/(1+odds) * 100));
        console.log(prob);

        setProb(prob);
        setCalc(1);

    }

    return (
        <div className="sized">
            <form onSubmit = {submitHandler}>
                <div className="form__controls">
                    <div className="form__control">
                        <label>CSF WBC (cells/mm3)</label>
                        <input type="number" min="0" step="1" value={enteredCsfWbc} onChange={csfWbcChangeHandler} />
                    </div>
                    <div className="form__control">
                        <label>CSF Cell Differential</label>
                        <Select className="react-select-container" options = {optionsDiff} value={optionsDiff.find(obj => obj.value === enteredDiff)} onChange={diffChangeHandler} />                </div>
                    <div className="form__control">
                        <label>CSF Glucose (mg/dL)</label>
                        <input type="number" min="0" step="1" value={enteredCsfGluc} onChange={csfGlucChangeHandler} />
                    </div>
                    <div className="form__control">
                        <label>Blood Glucose (mg/dL)</label>
                        <input type="number" min="0" step="1" value={enteredBloodGluc} onChange={bloodGlucChangeHandler} />
                    </div>
                    <div className="form__control">
                        <label>CrAg Antigen Positive?</label>
                        <Select  className="react-select-container" options = {optionsCrag} style={customStyles} value={optionsCrag.find(obj => obj.value === enteredCrag)} onChange={cragChangeHandler} />
                    </div>
                    <div className="form__control">
                        <label>Fever? (&gt;=38.7C)</label>
                        <Select className="react-select-container" options={optionsFever} style={customStyles} value={optionsFever.find(obj => obj.value === enteredFever)} onChange={feverChangeHandler} />
                    </div>
                    <div className="form__control">
                        <label>HIV Status</label>
                        <Select className="react-select-container" options={optionsHIV} style={customStyles} value={optionsHIV.find(obj => obj.value === enteredHIV)} onChange={hivChangeHandler} />
                    </div>
                </div>
                <div className="form__actions">
                    <button type="submit">Calculate</button>
                </div>
            </form>
            <Result prob = {finalProb} interp = {interp} calculated = {calculated}/>
        </div>
    );
}

export default CalculationForm;