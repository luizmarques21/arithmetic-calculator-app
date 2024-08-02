import styled from 'styled-components'
import { Link } from "react-router-dom"
import { Button } from 'antd'

export const CleanButtonUI = styled.div`
    background: none;
    border: none;
    cursor: pointer;
`

export const OutlinedLinkUi = styled(Link)`
    background: none;
    border: 1px solid #52aafb;
    padding: 0.5em;
    cursor: pointer;
    &:hover {
        border-color: #40a9ff;
        transition: ease-in-out 0.2s;
    }
`

export const FakeLink = styled(Link)`
    background: nonenone;
    border: none;
    padding: 0.5em;
    cursor: pointer;
    transition: 0.3s;
`

export const NewThingsButtonUI = styled(Button)`
    margin-bottom: 1em;
` 

export const FakeButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    color: #1890ff;
`

export const GreenButtonUI = styled.button`
    width: 100%;
    background-color: #2cc59a;
    border-radius: 10px;
    color: #FFF;
    font-weight: bold;
    border: none;
    margin-top: 1em;
    padding: 0.5em;
    min-width: 80px;
    font-size: 13px;
    cursor: pointer;
    transition: ease-in-out 0.4s;
    &:hover {
        background-color: #1f9272;
        transition: ease-in-out 0.4s;
    }
`

export const BlueButtonUI = styled.button`
    width: 100%;
    background-color: #527ECC;
    border-radius: 10px;
    color: #FFF;
    font-weight: bold;
    border: none;
    margin-top: 1em;
    padding: 0.5em;
    min-width: 80px;
    font-size: 13px;
    cursor: pointer;
    transition: ease-in-out 0.4s;
    &:hover {
        background-color: #1b4896;
        transition: ease-in-out 0.4s;
    }
`

export const RedButtonUI = styled.button`
    width: 100%;
    background-color: #ef4646;
    border-radius: 10px;
    color: #FFF;
    font-weight: bold;
    border: none;
    margin-top: 1em;
    padding: 0.5em;
    min-width: 80px;
    font-size: 13px;
    cursor: pointer;
    transition: ease-in-out 0.4s;
    &:hover {
        background-color: rgb(243 38 38);
        transition: ease-in-out 0.4s;
    }
`

export const DisabledButtonUI = styled.button`
    width: 100%;
    border-radius: 10px;
    color: #9a9999;
    background-color: #ededed;
    font-weight: bold;
    border: none;
    margin-top: 1em;
    padding: 0.5em;
    min-width: 80px;
    font-size: 13px;
    cursor: not-allowed;
`
