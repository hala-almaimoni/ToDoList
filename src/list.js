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
        this.hydrateStateWithLocalStorage();

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    updateForm = (event) => {
        const newTask = event.target.value
        const originalState = this.state.taskObject
        var copy = Object.assign({}, originalState)
        const key = event.target.name
        copy[key] = newTask;
        this.setState({ taskObject: copy })

        localStorage.setItem(key, copy[key]);



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
        localStorage.setItem("task", "");
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
    clearAll = () => this.setState({ taskList: [] })
    addToDone = task => {
        const copy = this.state.taskList.slice()
        copy.splice(task, 1)
        this.setState({ taskList: copy })
        localStorage.setItem("taskList", JSON.stringify(copy));

    }


}

export default List;
