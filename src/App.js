import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /* List Repositories */
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  /* Create a New Repo */
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto - ${Date.now()}`,
      url: `https://www.github.com/talvanes/novo-projeto-${Date.now()}`,
      techs: ['Node.js', 'React'],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const currentRepos = repositories.filter(repo => repo.id !== id);
    setRepositories(currentRepos);
  }

  return (
    <div className="container back-default">
      <ul className="repo-list" data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li className="repo-item back-light" key={repo.id}>
              <div className="panel-left">
                <span className="repo-title repo-full-width">{repo.title}</span>
                <span className="repo-skills repo-full-width">{repo.techs.join(', ')}</span>
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-link repo-full-width">{repo.url}</a>
              </div>

              <div className="panel-right">
                <button className="button button-remove" onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="panel-full">
        <button className="button button-add" onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
