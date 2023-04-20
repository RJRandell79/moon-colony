import * as React from 'react';
import { Component } from 'react';
import './Refinery.scss';

class Refinery extends Component {

    toggleRefining = (e) => {
        this.setState(prevToggle => {
            this.props.toggleRefinery(e.target.value);
        });
        console.log('selected ' + this.props.refineryActive);
    }

    render() {
        const isActive = this.props.refineryActive;

        return (
            <section className="container">
                <article>
                    <h2>Refinery</h2>
                    <form className="switch">
                        <select onChange={this.toggleRefining} value={isActive}>
                            <option value="0">Off</option>
                            <option value="1">On</option>
                        </select>
                    </form>
                    <table className="elements" cellPadding={0} cellSpacing={0} border={0}>
                        <thead>
                            <tr>
                                <th>Element</th>
                                <th>Amount</th>
                                <th>Rate (per day)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.elements.map(({element, amount, rate}) => {
                                return <tr key={element}><td>{element}</td><td>{amount}</td><td>{rate}</td></tr>
                            })}
                        </tbody>
                    </table>
                </article>
            </section>
        )
    }
}
  
export default Refinery;
