import React from 'react';
import '../.././CSS/Issues.css';

class Issues extends React.Component {
  constructor() {
      super()
  }

  render () {
      return (
        <div id="issues">
          <nav id="issues-filter">
            <button>Open</button>
            <button>Solved</button>
            <button>All</button>
          </nav>
          <div id="issues-container">
            <div class="issue">
              <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} />
              <p>{`name`}</p>
              <p>{`date`}</p>
              <h3>{`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos numquam modi aliquam!`}</h3>
              <p>{`# Responses`}</p>
              <p>{`Open`}</p>
            </div>
            <div class="issue">
              <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} />
              <p>{`name`}</p>
              <p>{`date`}</p>
              <h3>{`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos numquam modi aliquam!`}</h3>
              <p>{`# Responses`}</p>
              <p>{`Open`}</p>
            </div>
            <div class="issue">
              <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} />
              <p>{`name`}</p>
              <p>{`date`}</p>
              <h3>{`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos numquam modi aliquam!`}</h3>
              <p>{`# Responses`}</p>
              <p>{`Open`}</p>
            </div>
          </div>
        </div>
      )
    }
}

export default Issues;
