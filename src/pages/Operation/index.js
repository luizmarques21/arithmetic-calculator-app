import React, { useState, useEffect } from 'react'
import { getUser } from "../../services/auth"
import api from "../../services/api"
import { toast } from 'react-toastify'
import { registerTitle } from './styles'
import '../../index.css'

const Operation = () => {
    const [balance, setBalance] = useState(0);
    const [type, setType] = useState("addition");
    const [operatorA, setOperatorA] = useState('');
    const [showOperatorB, setShowOperatorB] = useState(true);
    const [operatorB, setOperatorB] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const user = getUser();
        setBalance(user.balance);
    }, []);

    const validateInputs = () => {
        if (type === 'square_root' && (operatorA === '' || operatorA < 0)) {
            throw new Error("The value for Operator A can't be empty or negative");
        } 
        if (type === 'division' && operatorB === 0) {
            throw new Error ("The value for Operator B can't be 0");
        } 
        if (type === 'random_string') {
            if (operatorA < 1 || operatorA > 10000) {
                throw new Error("The value for Operator A must be between 1 and 10000");
            } else if (operatorB < 1 || operatorB > 20) {
                throw new Error ("The value for Operator B must be between 1 and 20");
            }
        } 
        if (type !== 'square_root' && (operatorA === '' || operatorB === '')) {
            throw new Error ("The operators can't be empty");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            validateInputs();

            api.post(`/operation`, { type, operatorA, operatorB }).then(res => {
                const { record } = res;
                setBalance(record.user_balance);
                setResult(record.operation_response);
                setOperatorA('');
                setOperatorB('');
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }

    const checkOperatorsVisibility = (type) => {
        setOperatorA('');
        setOperatorB('');
        setShowOperatorB(type !== 'square_root');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-12 col-md-6">
                    <h2 style={registerTitle}>New operation</h2>
                    <div className="mb-3">
                        <label className='form-label' htmlFor='type'>Type</label>
                        <select 
                            value={type} 
                            onChange={(e) => {
                                setType(e.target.value)
                                checkOperatorsVisibility(e.target.value);
                            }}
                            id='type'
                            className='form-select'
                        >
                            <option value='addition'>Addition</option>
                            <option value='subtraction'>Subtraction</option>
                            <option value='multiplication'>Multiplication</option>
                            <option value='division'>Division</option>
                            <option value='square_root'>Square Root</option>
                            <option value='random_string'>Random String</option>
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className='form-label' htmlFor='operatorA'>
                            Operator A
                        </label>
                        <input
                            id='operatorA'
                            name="operatorA"
                            type="number"
                            value={operatorA}
                            onChange={e => setOperatorA(parseInt(e.target.value))}
                            className="form-control"
                        />
                    </div>
                    {showOperatorB && (
                        <div className="col-md-12 mb-3">
                            <label className='form-label' htmlFor='operatorA'>
                                Operator B
                            </label>
                            <input
                                id='operatorB'
                                name="operatorB"
                                type="number"
                                value={operatorB}
                                onChange={e => setOperatorB(parseInt(e.target.value))}
                                className="form-control"
                            />
                        </div>
                    )}
                    <div className="row my-3">
                        <div className="col-md-12">
                            <button className="btn btn-primary" onClick={event => onSubmit(event)}>
                                Request
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <p>Current balance: {balance}</p>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <h2 style={registerTitle}>Result</h2>
                    <textarea disabled value={result} rows={7} className='form-control'/>
                    <div className="row mt-2">
                        <h4 style={registerTitle}>Legend</h4>
                        <div className='col-6'>
                            <p><b>Addition</b><br/>Operator A + Operator B</p>
                            <p><b>Subtraction</b><br/> Operator A - Operator B</p>
                            <p><b>Multiplication</b><br/> Operator A * Operator B</p>
                        </div>
                        <div className='col-6'>
                            <p><b>Division</b><br/> Operator A / Operator B</p>
                            <p><b>Square Root</b><br/> sqrt(Operator A)</p>
                            <p>
                                <b>Random String</b><br/>
                                Operator A: The number of strings(1-10000)<br/>
                                Operator B: The size of the string(1-20)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Operation;