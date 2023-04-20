import * as React from 'react';
import './Power.scss';

const Power = ({installPower, powerplants, currentPowerOutput, currentPowerDemand}) => {

    let netPower = (currentPowerOutput - currentPowerDemand);

    return (
        <section className="container">
            <article>
                <h2>Power</h2>
                <p>Current total power output: <span className="supply">{currentPowerOutput}kW</span></p>
                <p>Current demand: <span className="demand">{currentPowerDemand}kW</span></p>
                <p>Net: <span>{netPower}kW</span></p>
                <table className="power" cellPadding={0} cellSpacing={0} border={0}>
                    <thead>
                        <tr>
                            <th>Powerplant</th>
                            <th>Output</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {powerplants.map(({id, powerplant, output, total, installed}) => {
                            let btn = '';
                            if(total >= 1 && !installed) {
                                btn = <button type="button" onClick={() => installPower(id)}>Select</button>;
                            } else if(total >= 1 && installed) {
                                btn = <p className="online">Online</p>
                            }
                            return <tr key={id}><td>{powerplant}</td><td>{output}</td><td>{total}</td>
                            <td>{btn}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </article>
        </section>
    )
}
export default Power;
