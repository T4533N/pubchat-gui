## Pubchat-GUI
A simple React.js chatroom application using Pubnub's realtime chat api. This GUI interface is for those who hates terminal and loves to work with graphical interfaces.

Use [CLI](https://github.com/T4533N/pubchat-cli) instead.

## Features

- send messages
- receive messages
- can see message history for 7 days
- See [pubchat-cli](https://github.com/T4533N/pubchat-cli) messages

## App screenshot

![image](https://user-images.githubusercontent.com/44163644/112882551-ebf12e00-90ee-11eb-81ac-80ff523552b5.png)


## Instructions to run the project:

1. Clone the GitHub repository

   ```
   git clone https://github.com/T4533N/pubchat-gui.git
   ```

1. Navigate to the directory

   ```
   cd pubchat-gui
   ```

1. Install the project.

   ```
   npm install
   ```

1. Start the project. The pubnub publish and subscribe key are stored as environmental variables, you can replace the value for these with your keys from the [PubNub Dashboard](https://dashboard.pubnub.com/).

   ```
   npm start
   ```

   A web browser should automatically open [http://localhost:3000](http://localhost:3000).

   Happy chatting :)

## Dependencies

- React.  
- PubNub Javascript SDK.  
- dotenv.  
- jest.  

## Sources

- https://reactjs.org/docs/hooks-state.html.
- https://www.pubnub.com/docs/sdks/javascript/.
