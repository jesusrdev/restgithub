import { useState } from "react";
import "./App.css";
import axios from "axios";

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const handleClick = async () => {
    try {
      const response = await axios.get<{ items: Repository[] }>(
        `https://api.github.com/search/repositories?q=${keyword}`
      );

      setRepodata(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleClick}>Fetch</button>

      {repodata.length === 0 ? (
        <p>No results found</p>
      ) : (
        <table>
          <tbody>
            {repodata.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
