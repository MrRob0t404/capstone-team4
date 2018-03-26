import React, { Component } from 'react';

const LaptopCode = () => (
  <div>
    <div className="line">
      <span className="keyword">const</span> greeting <span className="operator">=</span> <span className="string">'Hello World!'</span>;
    </div>
    <div className="line">
      <span className="keyword">const</span> devNames <span className="operator">=</span> [<span className="string">'Monique'</span>, <span className="string">'Simon'</span>, <span className="string">'Newton'</span>, <span className="string">'Elon'</span>, <span className="string">'Carlo'</span>];
    </div>
    <div className="line">
      <span className="keyword">const</span> numDevsOnTeam <span className="operator">=</span> devNames.length;
    </div>
    <div className="line">
      <span className="keyword">const</span> appName <span className="operator">=</span> <span className="string">'TyroDev'</span>
    </div>
    <div className="line">
      <span className="keyword">const</span> allDevsGreet <span className="operator">=</span> devNames<span className="function">.map</span>(value <span className="function">=></span> <span className="string">`hi, I'm <span className="function">{'${'}</span><span className="regular">value</span><span className="function">{'}'}</span>`</span>)<span className="function">.join</span>(<span className="string">', '</span>)
    </div>
    <div className="line">
      <span className="keyword">const</span> message <span className="operator">=</span><span className="string"> `<span className="function">{'${'}</span><span className="regular">allDevsGreet</span><span className="function">{'}'}</span> and we are </span><span className="string"> <span className="function">{'${'}</span><span className="regular">appName</span><span className="function">{'}'}</span>!`</span>
    </div>
    <div className="line">
      <span className="comment">/* hi, I'm Monique, hi, I'm Simon, hi, I'm Newton, hi, I'm Elon, hi, I'm Carlo and we are TyroDev!*/</span>
    </div>
  </div>
)


export default LaptopCode
