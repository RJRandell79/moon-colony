import * as React from 'react';
import './Support.scss';

const Support = ({currentPopulation}) => {

    return (
        <section className="container">
            <article>
                <h2>Support</h2>
                <table className="population" cellPadding={0} cellSpacing={0} border={0}>
                    <thead>
                        <tr>
                            <th>Population</th>
                            <th>Rate (per day)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>{Math.trunc(currentPopulation.population)}</td><td>{currentPopulation.rate}</td></tr>
                    </tbody>
                </table>
            </article>
        </section>
    )
}
  
export default Support;
