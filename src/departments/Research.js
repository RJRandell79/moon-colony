import * as React from 'react';
import './Research.scss';

const Research = ({researchprojects}) => {

    const isActive = (idx) => {
        let isActive = '';
        if(idx === 0) {
            isActive = 'active';
        }
        return isActive;
    }

    const switchCategory = (idx) => {
        const project_categories = document.getElementById('project-categories');
        const project_lists = document.getElementById('projects-list');

        const categories_lis = project_categories.getElementsByTagName('li');
        const project_uls = project_lists.getElementsByTagName('ul');

        for (var i = 0; i < categories_lis.length; i++) {
            categories_lis[i].classList.remove('active');
            project_uls[i].classList.remove('active');
        }
        categories_lis[idx].classList.add('active');
        project_uls[idx].classList.add('active');
    }

    return (
        <section className="container">
            <article>
                <h2>Research</h2>
                <ul id="project-categories" className="project-categories">
                    {researchprojects.map(({id, category}, index) => {
                        let active = isActive(index);
                        return <li key={id} className={active}><button type="button" onClick={() => switchCategory(index)}>{category}</button></li>
                    })}
                </ul>

                <div id="projects-list" className="projects-list">
                {researchprojects.map(({id, projects}, index) => {
                    let active = isActive(index);
                    return <ul key={id} className={`${active}`}>{projects.map(({id, projectname, available}) => {
                        let project = <li key={id}></li>;
                        if(available) {
                            project = <li key={id}><button type="button">{projectname}</button></li>
                        }
                        return project;
                    })}</ul>
                })}
                </div>

                <div className="current-project">
                    <p>No project currently being researched!</p>
                </div>
            </article>
        </section>
    )
}
  
export default Research;
