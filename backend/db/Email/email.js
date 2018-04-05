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
            </style> 
        </head>
        <body>
            <h1>Welcome to tyrodev!</h1>
            <p>Hey${user.username}, thanks for joining Tyro Dev. You will not regret it </p>
        </body>
    </html>
    `)
}

const solutionNotification = (problemPoster, problemSolver) => {
    return (`<!doctype html>
    <html>
       <head>
           <meta charset="utf-8">
           <meta http-equiv="x-ua-compatible" content="ie=edge">
           <title>Welcome!</title>
           <meta name="welcome" content="">
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   
           <style>

           </style> 
       </head>
       <body>
           <h1>Hey ${problemPoster.username}</h1>, 
           <p>So and so answered your question about ${problemPoster.title}Check it out @ <a href='http://localhost:3000/issues/${problemPoster.id}'>My Problem</a></p>
        
       </body>
   </html>
   `)
}

module.exports = {
    welcome,
    solutionNotification
}