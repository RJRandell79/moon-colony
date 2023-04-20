import * as React from 'react';
import { Component } from 'react';
import './Refinery.scss';

class Refinery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [
                { element: 'Aluminum', amount: 0, rate: 0 },
                { element: 'Calcium', amount: 0, rate: 0 },
                { element: 'Hydrogen', amount: 0, rate: 3 },
                { element: 'Iron', amount: 0, rate: 1 },
                { element: 'Magnesium', amount: 0, rate: 0 },
                { element: 'Oxygen', amount: 0, rate: 0 },
                { element: 'Potassium', amount: 0, rate: 0 },
                { element: 'Silicon', amount: 0, rate: 0 },
                { element: 'Sodium', amount: 0, rate: 0 },
                { element: 'Titanium', amount: 0, rate: 0 }
            ]
        }
        this.mineElements = this.mineElements.bind(this);
    }

    toggleRefining = (e) => {
        this.setState(prevToggle => {
            this.props.toggleRefinery(e.target.value);
        });
        console.log('selected ' + this.props.refineryActive);
    }

    mineElements = () => {
        if(this.props.refineryActive !== '0') {
            const updatedElements = this.state.elements.map((element) => {
                return { ...element, amount: element.amount + element.rate }
            });
            this.setState({ elements: updatedElements });
            console.log('mining');
        }
    }

    render() {
        const isActive = this.props.refineryActive;

        setTimeout(() => {
            this.mineElements();
        }, 5000);

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
                            {this.state.elements.map(({element, amount, rate}) => {
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
