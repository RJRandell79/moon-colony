import * as React from 'react';
import './Research.scss';

const Research = ({selectProject, researchprojects}) => {

    const currentProject = () => {
        let project = 'No project currently being researched!';

        for (var i = 0; i < researchprojects.length; i++) {
            for (var x = 0; x < researchprojects[i].projects.length; x++) {
                if(researchprojects[i].projects[x].active) {
                    project = 'Researching ' + researchprojects[i].projects[x].projectname;
                    break;
                }
            }
        }
        return <p>{project}</p>
    }

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
                    {researchprojects.map(({cid, category}, index) => {
                        let active = isActive(index);
                        return <li key={cid} className={active}><button type="button" onClick={() => switchCategory(index)}>{category}</button></li>
                    })}
                </ul>

                <div id="projects-list" className="projects-list">
                {researchprojects.map(({cid, projects}, index) => {
                    let active = isActive(index);
                    return <ul key={index} className={`${active}`}>{projects.map(({id, projectname, available}) => {
                        let project = <li key={id}></li>;
                        if(available) {
                            project = <li key={id}><button type="button" onClick={() => selectProject(cid, id)}>{projectname}</button></li>
                        }
                        return project;
                    })}</ul>
                })}
                </div>

                <div className="current-project">
                    {currentProject()}
                </div>
            </article>
        </section>
    )
}
  
export default Research;
