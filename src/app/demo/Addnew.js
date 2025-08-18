import React, { useEffect, useState } from 'react';
import './addnew.css';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Addnew = ({ onRepoAdded, userId = 1 }) => { 
  const [repo, setRepo] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [repo_list, setRepoList] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
    window.location.href = "/login";
    return;
  }
    if (token) { 
      try {
        const decoded = jwtDecode(token);
        let user_id = Number(decoded.sub);
        if (!user_id){

          user_id = Number(decoded.user?.id);
        }


        if (!Number.isInteger(user_id)) {
          throw new Error("Invalid user_id");
        }

        if (user_id) {
          setUser(user_id);
        } else {
          console.warn("No user ID found in token");
        }
      } catch (err) {
        console.warn("Failed to decode token:", err);
      }
    }

  }, []);

  const handleSends = async () => {
    if (!repo.trim()) {
      setStatus('Please enter a valid repo URL.');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Cloning repository...');

      const analyzeResponse = await axios.post('https://git-chat.zeabur.app/analyze-repo', {
        repo_path: repo, 
      });
      
      const repoName = analyzeResponse.data.repo_name;
      setRepoList(repoName);

      setStatus('Saving repository...');

      const saveResponse = await axios.post('https://git-chat.zeabur.app/repos/', {
        user_id:user,
        repo_name: repoName,
        repo_link: repo
      });

      setStatus('Analysis complete!');
      
      if (onRepoAdded) {
        onRepoAdded({
          name: repoName,
          repo_link: repo,
          user_id: userId
        });
      }

      setRepo('');
      
      setTimeout(() => {
        setStatus('Repository added successfully!');
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      if (error.response) {
        setStatus(`Error: ${error.response.data.detail || 'Something went wrong'}`);
      } else if (error.request) {
        setStatus('Network error. Please check your connection.');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className='addnewPage'>
      <h2>Hello</h2>
      <h2>What repo would you like to analyze?</h2>

      <div className='newBtndiv'>
        <input
          className='newInput'
          type='text'
          placeholder='Enter GitHub repo path'
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSends()}
        />
        <button onClick={handleSends} disabled={isLoading}>
          <AiOutlineSend className='send' />
        </button>
      </div>

      {status && (
        <p style={{ 
          marginTop: '20px', 
          fontWeight: '500',
          color: status.includes('Error') ? '#ff4444' : '#333'
        }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default Addnew;