import React, { Component } from 'react';
import history from '../../history';
import ReactDOM from 'react-dom';
import ReactSvgPieChart from "react-svg-piechart"
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import './UserProfile.scss';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        user: {},
        history: [],
        afflictionName: [],
        exercises: [],
    };
  }

  componentWillMount() {
    let history = {};
    this.setState({user: this.props.location.state.user})
    axios.get('http://localhost:4000/history/' + this.props.location.state.user.Login)
    .then((res) => {
        this.setState({history: res.data});
        history = res.data;
        console.log(history);
    });
    setTimeout(() => { axios.get('http://localhost:4000/history//' + history[0].Id)
    .then(res => {
        this.setState({afflictionName: res.data});
    })}, 300);
    axios.get('http://localhost:4000/exercises/' + 'scoliossis')
    .then(res => {
        this.setState({exercises: res.data});
        console.log(this.state);
    });
  }

  navigateToMain = () => {
    const user = this.props.location.state.user
    console.log(user);
    history.push({pathname: "/main", state: {user}});
  }

  logout = () => {
    history.push("/login");
  }

  render() {
    const data = [
        {title: "Wykonany", value: 47, color: "#00FF00"},
        {title: "Niewykonany", value: 53, color: "#ffffff"},
      ]
    return (
        <div className="wrapper">
             <ul id="nav">
                <button className="diagnosis" type="button" onClick={this.navigateToMain}> Diagnosis</button>
                <button className="logout" type="button" onClick={this.logout}> Logout</button>
            </ul>
            <MDBTable>
            <MDBTableHead>
                <tr>
                <th>Schorzenie</th>
                <th>Data wykrycia</th>
                <th>Ćwiczenia</th>
                <th>Postęp</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                { this.state.afflictionName.length !== 0 && this.state.history.map( (item, index) => 
                        <tr>
                            <td>{this.state.afflictionName[index].Name}</td>
                            <td>{item.Creation_Date.slice(0, 10)}</td>
                            <td>{this.state.exercises.map( (item) => <li>{item.Instruction}</li> )}</td>
                            <td className="pie-chart">
                                <ReactSvgPieChart data={data} expandOnHover/>
                            </td>
                        </tr>
                )}
            </MDBTableBody>
        </MDBTable>
        </div>
    );
  }
}