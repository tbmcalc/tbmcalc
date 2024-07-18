//import React from "react";
import PropTypes from 'prop-types';
import "./Form.css";
import "./Result.css";

Result.propTypes = {
    prob: PropTypes.number,
    interp: PropTypes.string,
    calculated: PropTypes.number

};

function Result(props) {
    let prob = props.prob;
    let interp = props.interp;
    let calc = props.calculated;

    if (prob <= 5 ) {
        interp = "Very unlikely to be TBM. Consider another diagnosis in your differential.";
    } else if (prob > 5 && prob < 40) {
        interp = "Possible TBM. Consider further diagnostic testing.";
    } else {
        interp = "Very likely TBM. Consider initiating appropriate therapy.";
    }

    const getTextColor = (prob) => {
        if (prob < 5) {
          return 'blue';
        } else if (prob >= 5 && prob <= 40) {
          return 'yellow';
        } else {
          return 'red';
        }
      };

    if (calc == 0) {
        return (
            <div className="centered-content">
            <strong>
                <p>Probability of TBM: -- %</p>
                <p>Please enter patient data above.</p>
            <br></br>
            <p className="info">The Tuberculous Meningitis (TBM) diagnostic prediction model is the first, broadly generalizable clinical multivariable prediction tool for diagnosing TBM. This diagnostic prediction model was trained from data from 15 individual studies across 9 countries, and contains inputs for values generated from routine procedures such including a blood draw and cerebrospinal fluid (CSF) analysis.</p> 
            <p className="info">This TBM diagnostic prediction model is intended for use only by health care professionals. In the context of suspected TBM, we suggest that the TBM diagnostic prediction model results should be used in conjunction with the experience of the treating clinician to guide immediate decisions about empiric TB treatment and the need for further or repeat testing.</p>
            </strong>
            <p>Statistical analysis performed by Anna Stadelman-Behar PhD, available <a className="link" href="https://www.ajtmh.org/view/journals/tpmd/aop/article-10.4269-ajtmh.23-0789/article-10.4269-ajtmh.23-0789.xml">HERE</a></p>
            <p>WebApp created by <a className="link" href="https://www.mfpullenmd.com">Matthew Pullen MD</a></p>
            </div>
        );
    } else {
        return (
            <div className="result-interp">
                <strong>
                <p>Probability of TBM: <span style={{color:getTextColor(prob)}}>{prob}%</span></p>
                <p style={{color:getTextColor(prob)}}>{interp}</p>
                <br></br>
                <p className="info">The Tuberculous Meningitis (TBM) diagnostic prediction model is the first, broadly generalizable clinical multivariable prediction tool for diagnosing TBM. This diagnostic prediction model was trained from data from 15 individual studies across 9 countries, and contains inputs for values generated from routine procedures such including a blood draw and cerebrospinal fluid (CSF) analysis.</p> 
                <p className="info">This TBM diagnostic prediction model is intended for use only by health care professionals. In the context of suspected TBM, we suggest that the TBM diagnostic prediction model results should be used in conjunction with the experience of the treating clinician to guide immediate decisions about empiric TB treatment and the need for further or repeat testing.</p>
                </strong>
                <p>Statistical analysis performed by Anna Stadelman-Behar PhD, available <a className="link" href="https://www.ajtmh.org/view/journals/tpmd/aop/article-10.4269-ajtmh.23-0789/article-10.4269-ajtmh.23-0789.xml">HERE</a></p>
                <p>WebApp created by <a className="link" href="https://www.mfpullenmd.com">Matthew Pullen MD</a></p>
            </div>
        );
    }
}

export default Result;