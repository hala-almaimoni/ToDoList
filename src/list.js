import React, { Component } from 'react';
import './App.css';
import Task from './ToDo'
import Done from './Done';

class List extends Component {

    state = {
        taskObject: {},
        taskList: [],

    }
    componentDidMount() {
        // define the local storge
        // dont set if there is local storge 
        if (!localStorage.getItem("taskList")) {
            localStorage.setItem("taskList", JSON.stringify(this.state.taskList))
        }
        // making the state local storge
        localStorage.getItem("taskList") && this.setState({
            taskList: JSON.parse(localStorage.getItem("taskList"))
        });

    }


    updateForm = (event) => {
        const newTask = event.target.value
        const originalState = this.state.taskObject
        var copy = Object.assign({}, originalState)
        const key = event.target.name
        copy[key] = newTask;
        this.setState({ taskObject: copy })

        // localStorage.setItem(key, copy[key]);



    }

    submitForm = (event) => {
        event.preventDefault()
        const copy = this.state.taskList.slice()
        copy.push(this.state.taskObject)
        this.setState({
            taskList: copy,
            taskObject: {
                task: '',
            }
        })
        localStorage.setItem("taskList", JSON.stringify(copy));
        // localStorage.setItem("task", "");
    }





    render() {


        const list = this.state.taskList.map((task, index) => <Task task={task} addToDone={this.addToDone} id={index} />)

        return (
            <div className="cover">
                <div className="containerl">
                    <form className="form-list" onSubmit={this.submitForm}>
                        <input placeholder="To do" type='text' className='input-task' onChange={this.updateForm} name='task' value={this.state.taskObject.task} />
                        <button className="main-button" type='submit'>Add</button>

                    </form>
                    {list}
                    <button className="main-button" onClick={this.clearAll}>Clear All</button>
                </div>

            </div>
        );
    }
    clearAll = () => {
        this.setState({ taskList: [] })
        localStorage.setItem("taskList", []);
    }
    addToDone = task => {
        const copy = this.state.taskList.slice()
        copy.splice(task, 1)
        this.setState({ taskList: copy })
        localStorage.setItem("taskList", JSON.stringify(copy));

    }


}

export default List;
