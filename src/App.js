/* eslint-disable no-unused-vars */
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import React, { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [channels, setChannel] = useState("");
  const [view, setView] = useState(false);

  //initializing a pubnub object:
  const pubnub = new PubNub({
    publishKey: process.env.REACT_APP_PUBNUB_PUB_KEY,
    subscribeKey: process.env.REACT_APP_PUBNUB_SUB_KEY,
    uuid: username,
  });

  return (
    <PubNubProvider client={pubnub}>
      <>
        {view ? (
          <Chat channelName={channels} username={username} />
        ) : (
          <div style={pageStyles}>
            <h1 style={{ color: "white" }}>Chat App</h1>
            <div
              style={{
                padding: "2rem",
                borderRadius: "1rem",
                background: "#341046",
                border: "2px solid white",
                width: "23rem",
                marginBottom: "7rem",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setView(true);
                  console.log("username:" + username, "channel:" + channels);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontStyle: "italic" }} htmlFor="username">
                    Username:
                  </label>
                  <input
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "2px solid #8555e8",
                    }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Sherlock"
                  />
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={{ fontStyle: "italic" }} htmlFor="channel">
                    Channel Name:
                  </label>
                  <input
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "2px solid #8555e8",
                    }}
                    onChange={(e) => {
                      setChannel([e.target.value]);
                    }}
                    type="text"
                    id="channel"
                    name="channel"
                    placeholder="general"
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <input
                    style={{
                      marginTop: "1rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      width: "6rem",
                      border: "2px solid #8555e8",
                      fontWeight: "600",
                      color: "#280d2e",
                    }}
                    type="submit"
                    value="Join"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </PubNubProvider>
  );
}

function Chat({ channelName, username }) {
  const pubnub = usePubNub();
  //declaring state variables using the state hook
  const [channels, setChannel] = useState([channelName]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  //adding event handler - function expression
  const handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, text]);
    }
  };

  const formattedMessage = `${pubnub.getUUID()}: ${message}`;

  //publishing a message - function expression
  const sendMessage = (message) => {
    if (message) {
      pubnub
        .publish({ channel: channels[0], message: formattedMessage })
        .then(() => setMessage(""))
        .catch((err) => {
          pubnub.setUUID(username);

          console.log("err: ", err);
        });
    }
  };

  //message listener (subscribing to a channel)
  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  // returning message history
  useEffect(() => {
    pubnub.fetchMessages(
      {
        channels: [channelName],
        count: 100,
      },
      (status, response) => {
        setMessageHistory(response?.channels[channelName]);
      }
    );
  }, [channelName, message, messages, pubnub]);

  console.log(messageHistory);
  return (
    <div style={pageStyles}>
      <div style={chatStyles}>
        <div style={headerStyles}>Chat App</div>
        <div style={listStyles}>
          {messageHistory?.map((r, index) => {
            return (
              <div key={`message-${index}`} style={messageStyles}>
                <span>{r.message}</span>
              </div>
            );
          })}
        </div>
        <div style={footerStyles}>
          <input
            type="text"
            style={inputStyles}
            placeholder="Type your message"
            value={message}
            onKeyPress={(e) => {
              if (e.key !== "Enter") return;
              sendMessage(message);
            }}
            onChange={(e) => setMessage(`${e.target.value}`)}
          />
          <button
            style={buttonStyles}
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const pageStyles = {
  alignItems: "center",
  background: "#280d2e",
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  flexDirection: "column",
  overflow: "hidden",
};

const chatStyles = {
  display: "flex",
  flexDirection: "column",
  height: "50vh",
  width: "50%",
};

const headerStyles = {
  background: "#7434eb",
  color: "white",
  fontSize: "1.4rem",
  padding: "10px 15px",
};

const listStyles = {
  alignItems: "flex-start",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  padding: "10px",
};

const messageStyles = {
  backgroundColor: "#d9d9d9",
  borderRadius: "5px",
  color: "#333",
  fontSize: "1.1rem",
  margin: "5px",
  padding: "8px 15px",
};

const footerStyles = {
  display: "flex",
};

const inputStyles = {
  flexGrow: 1,
  fontSize: "1.1rem",
  padding: "10px 15px",
};

const buttonStyles = {
  backgroundColor: "#3a86ff",
  fontSize: "1.1rem",
  padding: "10px 15px",
  color: "white",
};

export default App;
