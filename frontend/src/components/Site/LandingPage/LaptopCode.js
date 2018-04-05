import React, { Component } from 'react';

const LaptopCode = () => (
  <div className="laptop-code">
    <div className="line">
      <span className="green">const</span> greeting <span className="light-blue">=</span> <span className="blue">'Hello World!'</span>;
    </div>
    <div className="line">
      <span className="green">const</span> devNames <span className="light-blue">=</span> [<span className="blue">'Monique'</span>, <span className="blue">'Simon'</span>, <span className="blue">'Newton'</span>, <span className="blue">'Elon'</span>, <span className="blue">'Carlo'</span>];
    </div>
    <div className="line">
      <span className="green">const</span> numDevsOnTeam <span className="light-blue">=</span> devNames.length;
    </div>
    <div className="line">
      <span className="green">const</span> appName <span className="light-blue">=</span> <span className="blue">'TyroDev'</span>
    </div>
    <div className="line">
      <span className="green">const</span> allDevsGreet <span className="light-blue">=</span> devNames<span className="blue-gray">.map</span>(value <span className="blue-gray">=></span> <span className="blue">`hi, I'm <span className="blue-gray">{'${'}</span><span className="white">value</span><span className="blue-gray">{'}'}</span>`</span>)<span className="blue-gray">.join</span>(<span className="blue">', '</span>)
    </div>
    <div className="line">
      <span className="green">const</span> message <span className="light-blue">=</span><span className="blue"> `<span className="blue-gray">{'${'}</span><span className="white">allDevsGreet</span><span className="blue-gray">{'}'}</span> and we are </span><span className="blue"> <span className="blue-gray">{'${'}</span><span className="white">appName</span><span className="blue-gray">{'}'}</span>!`</span>
    </div>
    <div className="line">
      <span className="gray">/* hi, I'm Monique, hi, I'm Simon, hi, I'm Newton, hi, I'm Elon, hi, I'm Carlo and we are TyroDev!*/</span>
    </div>
  </div>
)


export default LaptopCode
