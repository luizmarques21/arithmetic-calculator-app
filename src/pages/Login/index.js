import React, { useState, useEffect } from 'react'
import { Col, Row, Input } from 'antd'
import validator from 'validator'
import { login, isAuthenticated } from "../../services/auth"
import api from "../../services/api"
import { toast } from 'react-toastify'
import { BlueButtonUI } from '../../components/UIButtons'
import Logo from '../../assets/calculator-logo.jpg'

import '../../index.css'

const Login = () => {
    useEffect(() => {
        if (isAuthenticated()) {
            window.location.href = "/operation";
        }
    }, [])

    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        let error = {}
        if (!email) {
            error.mail = "Please inform your email"
            isValid = false;
        } else if (!validator.isEmail(email)) {
            error.mail = "The email is invalid"
            isValid = false;
        }
        if (!password) {
            error.password = "Please inform your password"
            isValid = false;
        }
        setErrors(error)
        if (isValid)
            api.post(`/login`, { username: email, password }).then(res => {
                if (res.success) {
                    login(res);
                    window.location.href = `/operation`
                } else {
                    toast.error(res.message)
                    setErrors({ ...errors, serverSide: res.error })
                }
            }).catch((err) => {
                console.log(err)
                if (err.response.status !== 500) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('Ops, something went wrong')
                }                
            })
    }

    const pageStyles = {
        display: "flex",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center"
    }

    const errorsDisplay = {
        textAlign: "center",
        margin: "1em",
        color: "#FF4040"
    }

    return (
        <div style={pageStyles}>
            {errors.serverSide && (<p style={{ color: "#FF4040" }}>{errors.serverSide}</p>)}
            <form onSubmit={(event) => onSubmit(event)}>
                <div style={{ marginBottom: "20px" }}>
                    <img width="auto" height="180px" src={Logo} alt="Logo AMTFinder" />
                    <h2 style={{ marginTop: "20px" }}>Arithmetic calculator</h2>
                </div>
                <div style={{ width: "300px" }}>
                    {errors.mail && (<p style={errorsDisplay}> {errors.mail} </p>)}
                    {errors.password && (<p style={errorsDisplay}> {errors.password} </p>)}
                    <div style={{ marginBottom: "10px"}}>
                        <Input
                            id="emailId"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="E-mail"
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <Input
                            id="passwordId"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    

                    <Row gutter={16}>   
                        <Col span={24}>
                            <BlueButtonUI type="submit">Login</BlueButtonUI>
                        </Col>
                    </Row>
                </div>
            </form>
        </div>
    )


};

export default Login;