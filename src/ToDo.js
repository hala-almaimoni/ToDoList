import React, { Component } from 'react';

class ToDo extends Component {
    state = {
        clicked: 'false',
        done: {
            task: ''
        }

    }
    markToDone = (event) => {
        if (this.state.clicked === 'false') {
            this.setState({ clicked: 'clicked' })
        } else {
            this.setState({ clicked: 'false' })
        }

    }

    // addToDone = (event) => {
    //     let checked = event.target.value
    //     var originalState = this.state.done
    //     var copy = Object.assign({}, originalState)


    //     if (event.target.checked === true) {
    //         copy.task = checked
    //         this.setState({ done: copy })
    //         console.log(copy)
    //     }
    // }
    passVlue = (event) => {
        event.preventDefault()
        this.props.addToDone(this.props.id)
    }

    render() {
        return (
            <div>
                <form>
                    <label className="container">
                        <h3 className={this.state.clicked}>
                            <input onChange={this.markToDone} name='checkboxlist' type='checkbox' value={this.props.task.task} />
                            <span class="checkmark"></span>
                            {this.props.task.task}
                            <button className="add-button" onClick={this.passVlue} value={this.props.task.task}>X</button></h3>

                    </label>
                </form>

            </div>
        );
    }
}

export default ToDo;
