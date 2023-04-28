import * as React from 'react';
import './Production.scss';

const Production = ({selectProduction, researchprojects}) => {

    return (
        <section className="container">
            <article>
                <h2>Production</h2>

                <div className="production-list">
                {researchprojects.map(({cid, projects}, index) => {
                    return <ul key={index}>
                    {projects.map(({id, projectname, completed}) => {
                        let project = null;

                        if(completed) {
                            project = <li key={id}><button type="button" onClick={() => selectProduction(cid, id)}>{projectname}</button></li>
                        }

                        return project;
                    })}
                    </ul>
                })}
                </div>
                
            </article>
        </section>
    )
}
export default Production;
