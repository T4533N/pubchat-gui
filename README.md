## User stories 


As a user,  
I want to be able to send messages,  
So that I can communicate with another person.  
  
As a user,  
I want to be able to recieve messages,  
So that I can communicate with another person.  
  
As a user,  
I want to be able to see the name of the person I am chatting with,  
so that I dont send messages to the wrong person.  
  
As a user,  
I want to be able to see what time a message was sent,  
So that I can better track the timeline of a conversation.  



## App screenshot

![Screenshot 2021-02-18 at 21 28 53](https://user-images.githubusercontent.com/71889577/108423859-4ebdf280-7230-11eb-92d7-a1a521fd1817.png)


  
## Instructions to run the project:

1. Clone the GitHub repository

    ```
    git clone https://github.com/savannaelbey/chatApp.git
    ```

1. Navigate to the directory

    ```
    cd chatApp
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

React.  
PubNub Javascript SDK.    
dotenv.  
jest.  
bootstrap.  


## Sources

register with PubNub: https://admin.pubnub.com/#/user/567189/account/567140/home.   
https://reactjs.org/docs/hooks-state.html.  
https://www.pubnub.com/docs/sdks/javascript/. 


