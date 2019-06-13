import React, { Component } from 'react';
import Switch from "react-switch";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import history from '../../history';
import axios from 'axios';
import './Steps.scss';

export default class Steps extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      step1State: 'active',
      step2State: 'inactive',
      step3State: 'inactive',
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      question6: false,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      questions: [],
      exercises: [],
    };
  }

  componentWillMount() {
    axios.get('http://localhost:4000/questions/' + 'scoliossis')
    .then(res => {
        console.log(res.data, this.props);
        this.setState({questions: res.data});
    });
    axios.get('http://localhost:4000/exercises/' + 'scoliossis')
    .then(res => {
        this.setState({exercises: res.data});
    });
  }

  handleChange1 = (checked) => {
    this.setState({ question1: checked });
  }

  handleChange2 = (checked) => {
    this.setState({ question2: checked });
  }

  handleChange3 = (checked) => {
    this.setState({ question3: checked });
  }

  handleChange4 = (checked) => {
    this.setState({ question4: checked });
  }

  handleChange5 = (checked) => {
    this.setState({ question5: checked });
  }

  handleChange6 = (checked) => {
    this.setState({ question6: checked });
  }

  updateAnswer1 = (event) => {
    this.setState({
      answer1: event.target.value
    });
  }
  
  updateAnswer2 = (event) => {
    this.setState({
      answer2: event.target.value
    });
  }

  updateAnswer3 = (event) => {
    this.setState({
      answer3: event.target.value
    });
  }

  updateAnswer4 = (event) => {
    this.setState({
      answer4: event.target.value
    });
  }
  
  updateAnswer5 = (event) => {
    this.setState({
      answer5: event.target.value
    });
  }

  updateAnswer6 = (event) => {
    this.setState({
      answer6: event.target.value
    });
  }

  getCurrentStep = () => {
     if(this.state.step1State === 'active') {
         return 1;
     } else if(this.state.step2State === 'active') {
         return 2;
     } else {
         return 3;
     }
  }

  goToPreviousStep = () => {
    let current = this.getCurrentStep();
    if(current === 2) {
        this.setState({
            step2State: 'inactive',
            step1State: 'active'
        });
    } else {
        this.setState({
            step3State: 'inactive',
            step2State: 'active'
        });
    }
  }

  goToNextStep = () => {
    let current = this.getCurrentStep();
    if(current === 1) {
        this.setState({
            step1State: 'finished',
            step2State: 'active'
        });
    } else {
        this.setState({
            step2State: 'finished',
            step3State: 'active'
        });
    }
  }

  goToStep(stepNumber) {
    if(stepNumber === 1) {
        this.setState({
            step1State: 'active',
            step2State: 'inactive',
            step3State: 'inactive'
        });
    } else if(stepNumber === 2) {
        this.setState({
            step1State: 'finished',
            step2State: 'active',
            step3State: 'inactive'
        });
    } else {
        this.setState({
            step1State: 'finished',
            step2State: 'finished',
            step3State: 'active'
        });
    }
  }

  getBackButtonState = () => {
      if(this.state.step1State === 'active') {
          return 'disabled';
      } else {
          return 'active';
      }
  }

  getNextButtonState = () => {
    if(this.state.step3State !== 'inactive') {
        return 'disabled';
    } else {
        return 'active';
    }
  }

  logout = () => {
    history.push("/login");
  }

  navigateToProfile = () => {
    const user = this.props.location.state.user
    history.push({pathname: "/profile", state: {user}});
  }

  saveDiagnosis = () => {
    const answers = [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.answer5, this.state.answer6];
    const historyEntry = {
        login: this.props.location.state.user.Login,
        creation_date:  new Date(),
        exercises: this.state.exercises,
        questions: this.state.questions,
        answers: answers,               
    }
    axios.post('http://localhost:4000/history', historyEntry)
      .then(res => console.log(res));
      this.navigateToProfile();
  }

  render() {
    return (
      <div className="main-container">
       <ul id="nav">
            <button className="diagnosis" type="button" onClick={this.navigateToProfile}> Your profile</button>
            <button className="logout" type="button" onClick={this.logout}> Logout</button>
        </ul>
        <div className="questions-container">
            { this.state.step1State === 'active' && this.state.questions.length !== 0 &&  <div className="column">
                <div className="center-space">
                    <div className="question-text">{this.state.questions[0].Question_Text}</div>
                    <Switch onChange={this.handleChange1} checked={this.state.question1} id="normal-switch"/>
                    { this.state.question1 && 
                        <div className="group">
                            <input type="text" value={this.state.answer1} onChange={this.updateAnswer1}/>
                            <span className="highlight" />
                            <span className="bar" />
                            <span className="label">Dodatkowe uwagi</span>
                        </div>}
                </div>
                <div className="center-space">
                    <div className="question-text">{this.state.questions[1].Question_Text}</div>
                    <Switch onChange={this.handleChange2} checked={this.state.question2} id="normal-switch"/>
                    { this.state.question2 && 
                        <div className="group">
                            <input type="text" value={this.state.answer2} onChange={this.updateAnswer2}/>
                            <span className="highlight" />
                            <span className="bar" />
                            <span className="label">Dodatkowe uwagi</span>
                        </div>}
                </div>
                <div className="center-space">
                    <div className="question-text">{this.state.questions[2].Question_Text}</div>
                    <Switch onChange={this.handleChange3} checked={this.state.question3} id="normal-switch"/>
                    { this.state.question3 && 
                        <div className="group">
                            <input type="text" value={this.state.answer3} onChange={this.updateAnswer3}/>
                            <span className="highlight" />
                            <span className="bar" />
                            <span className="label">Dodatkowe uwagi</span>
                        </div>}
                </div>
            </div>}
            { this.state.step2State === 'active' && this.state.questions.length !== 0 &&  <div className="column">
            <div className="center-space">
                <div className="question-text">{this.state.questions[3].Question_Text}</div>
                <Switch onChange={this.handleChange4} checked={this.state.question4} id="normal-switch"/>
                { this.state.question4 && 
                    <div className="group">
                        <input type="text" value={this.state.answer4} onChange={this.updateAnswer4}/>
                        <span className="highlight" />
                        <span className="bar" />
                        <span className="label">Dodatkowe uwagi</span>
                    </div>}
            </div>
            <div className="center-space">
                <div className="question-text">{this.state.questions[4].Question_Text}</div>
                <Switch onChange={this.handleChange5} checked={this.state.question5} id="normal-switch"/>
                { this.state.question5 && 
                    <div className="group">
                        <input type="text" value={this.state.answer5} onChange={this.updateAnswer5}/>
                        <span className="highlight" />
                        <span className="bar" />
                        <span className="label">Dodatkowe uwagi</span>
                    </div>}
            </div>
            <div className="center-space">
                <div className="question-text">{this.state.questions[5].Question_Text}</div>
                <Switch onChange={this.handleChange6} checked={this.state.question6} id="normal-switch"/>
                { this.state.question6 && 
                    <div className="group">
                        <input type="text" value={this.state.answer6} onChange={this.updateAnswer6}/>
                        <span className="highlight" />
                        <span className="bar" />
                        <span className="label">Dodatkowe uwagi</span>
                    </div>}
            </div>
            </div>}
            { this.state.step3State === 'active' && this.state.exercises.length !== 0 &&
            <div>
                <Accordion className="accordion">
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className="acc-bg">
                                Ćwiczenie 1
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="acc-bg">{this.state.exercises[0].Instruction}</div>
                            <div className="acc-bg">Należy ćwiczyć: {this.state.exercises[0].Repetition_Frequency} po {this.state.exercises[0].Repetition_Number} razy.</div>
                            {/* <img src={this.state.exercises[0].Photo_Path} alt="Exercise 1" height="200" width="200" />  */}
                            <div className="image i1"></div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className="acc-bg">
                                Ćwiczenie 2
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                        <div className="acc-bg">{this.state.exercises[1].Instruction}</div>
                        <div className="acc-bg">Należy ćwiczyć: {this.state.exercises[1].Repetition_Frequency} po {this.state.exercises[1].Repetition_Number} razy.</div>
                        {/* <img src={this.state.exercises[1].Photo_Path} alt="Exercise 2" height="200" width="200" />  */}
                        <div className="image i2"></div>
                    </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className="acc-bg">
                                Ćwiczenie 3
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                        <div className="acc-bg">{this.state.exercises[2].Instruction}</div>
                        <div className="acc-bg">Należy ćwiczyć: {this.state.exercises[2].Repetition_Frequency} po {this.state.exercises[2].Repetition_Number} razy.</div>
                        {/* <img src={this.state.exercises[2].Photo_Path} alt="Exercise 3" height="200" width="200" />  */}
                        <div className="image i3"></div>
                    </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                <button className="save" type="button" onClick={this.saveDiagnosis}> Save diagnosis</button>
            </div>
            }
        </div>
        <div className="steps-container">
            <div className="step">
            <button className="step-button" onClick={() => {this.goToStep(1)}}>
                <div className={'icon-container-' + this.state.step1State}>1</div>
                <span className={'text-container-' + this.state.step1State}>Pytania wstępne</span>
            </button>
            </div>
            <span className="line1"></span>
            <div className="step">
            <button className="step-button" onClick={() => {this.goToStep(2)}}>
                <div className={'icon-container-' + this.state.step2State}>2</div>
                <span className={'text-container-' + this.state.step2State}>Pytania zaawansowane</span>
            </button>
            </div>
            <span className="line2"></span>
            <div className="step">
            <button className="step-button" onClick={() => {this.goToStep(3)}}>
                <div className={'icon-container-' + this.state.step3State}>3</div>
                <span className={'text-container-' + this.state.step3State}>Wynik diagnozy</span>
            </button>
            </div>
            <div className="action-buttons">
                <button className={this.getBackButtonState()} onClick={this.goToPreviousStep}>Wstecz</button>
                <button className={this.getNextButtonState()} onClick={this.goToNextStep}>Dalej</button>
            </div>
        </div>
      </div>
    );
  }
}

