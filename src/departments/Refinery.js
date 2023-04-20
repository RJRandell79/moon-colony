import * as React from 'react';
import './Refinery.scss';

const Refinery = ({toggleRefining, refineryActive, elements}) => {

    return (
        <section className="container">
            <article>
                <h2>Refinery</h2>
                <form className="switch">
                    <select onChange={e => toggleRefining(e.target.value)} value={refineryActive}>
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
                        {elements.map(({element, amount, rate}) => {
                            return <tr key={element}><td>{element}</td><td>{amount}</td><td>{rate}</td></tr>
                        })}
                    </tbody>
                </table>
            </article>
        </section>
    )
}
  
export default Refinery;
