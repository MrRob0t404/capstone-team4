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
           img{}
           #welcomeMessage{ background-color: white; color: #272633; padding-top: 20px; padding-bottom: 20px; margin:0; width: 100%;}
           a{background-color: #7FD017; color: #00C1AB; width: 80px; text-decoration: none; }
           footer{background-color: #272633; margin: 0; color: white; font-size: 10px; padding-top: 10px; padding-bottom: 10px;}
           </style> 
       </head>
       <body>
        <div id="container">
            <div id="logo">
                <img src="../../../frontend/src/Logos/full-logo.svg">
            </div>
            <div id="welcomeMessage">
                <h2>Welcome ${user.username}! We're so glad you've decided to join us at Tyro Dev!</h2>
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

const solutionNotification = (problemPoster,problemSolver) => {

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
            .profilePic{ width: 50px; height: 50px; }
            .inline{display: block;}
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
                <h1>Hey ${problemPoster.username}! ${problemSolver.username} posted a solution to your ticket!</h1>
                <a href ='http://localhost:3000/issues/${problemPoster.id}'>Link to question</a>
                    <img class='profilePic inline' src='${problemPoster.profile_pic}' alt="profilepic"/> <p class='inline'>${problemPoster.title}</p> 
                    <img class='profilePic inline'src='${problemSolver.profile_pic}' alt=""/>  
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