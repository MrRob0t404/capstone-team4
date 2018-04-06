const welcome = (user) => {
    return (`<!doctype html>

    <html>
       <head>
           <meta charset="utf-8">
           <meta http-equiv="x-ua-compatible" content="ie=edge">
           <title>Welcome!</title>
           <meta name="welcome" content="">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   
           <style>
           #container{text-align: center; width: 700px;}
           .logo{ background-color: #272633; width: 100%; margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px;}
           #welcomeMessage{ background-color: grey; padding-top: 20px; padding-bottom: 20px; margin:0; width: 100%;}
           a{background-color: #7FD017;}
           footer{background-color: #272633; margin: 0; color: white; font-size: 12px; padding-top: 20px; padding-bottom: 20px;}
           </style> 
       </head>
       <body>
        <div id="container">
            <div id="logo">
                <img src="../../../frontend/src/Logos/full-logo.svg">
            </div>
            <div id="welcomeMessage">
                <h1>Welcome ${user}! We're so glad you've decided to join us at Tyro Dev</h1>
                <a href ='#'>Click here to visit Tyro Dev!</a>
            </div>
            <div id="footer">    
                <footer>
                    <p>Sent with <3 by the TyroDev Team</p>
                </footer>
            </div>
        </div>
       </body>
   </html>
   `)
}

const solutionNotification = (user, userImg, problemSolver, problemSolverImg, problemDesc, solutionDesc) => {

    return (`<!doctype html>
    <html>
       <head>
           <meta charset="utf-8">
           <meta http-equiv="x-ua-compatible" content="ie=edge">
           <title>Welcome!</title>
           <meta name="welcome" content="">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   
           <style>

           #container{text-align: center; width: 700px;}
           .logo{ background-color: #272633; width: 100%; margin: 0; padding: 0; padding-top: 20px; padding-bottom: 20px;}
           #welcomeMessage{ background-color: grey; padding-top: 20px; padding-bottom: 20px; margin:0; width: 100%;}
           a{background-color: #FFF; display: block; width: 100px; text-align: center; margin-left: 350px;}
           footer{background-color: #272633; margin: 0; color: white; font-size: 12px; padding-top: 20px; padding-bottom: 20px;}
           </style> 
       </head>
       <body>
        <div id="container">
            <div id="logo">
                <img src="../../../frontend/src/Logos/full-logo.svg">
            </div>
            <div id="welcomeMessage">
                <h1>Hey ${user}! ${problemSolver} posted a solution to your ticket!</h1>
                <a href ='#'>
                    <img src=${userImg}/> ${problemDesc} 
                    <img src=${problemSolverImg}/> ${solutionDesc} 
                </a>
            </div>
            <div id="footer">    
                <footer>
                    <p>Sent with <3 by the TyroDev Team</p>
                </footer>
            </div>
        </div>
       </body>
   </html>
   `)
}

module.exports = {
    welcome,
    solutionNotification
}