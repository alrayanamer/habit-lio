import { useState } from "react";
import { UserRoundPlus, Search, UserRoundCheck, UserRoundX } from "lucide-react";
import './index.css';
import './FriendsPage.css';

const friends = [
  { uid: 1, name: "Alex Rivera",  username: "alexrivera"  },
  { uid: 2, name: "Jordan Kim",   username: "jordankim"   },
  { uid: 3, name: "Sam Patel",    username: "sampatel"    },
  { uid: 4, name: "Casey Morgan", username: "caseymorgan" },
];

const INITIAL_REQUESTS = [
  { uid: 5,  name: "Taylor Swift", username: "taylorswift" },
  { uid: 6,  name: "Chris Wu",     username: "chriswu"     },
  { uid: 7,  name: "Dana Lee",     username: "danalee"     },
  { uid: 8,  name: "Morgan Gray",  username: "morgangray"  },
  { uid: 9,  name: "Jamie Cole",   username: "jamiecole"   },
  { uid: 10, name: "Reese Park",   username: "reesepark"   },
];

const ALL_USERS = [
  { uid: 1,  name: "Alex Rivera",  username: "alexrivera"  },
  { uid: 2,  name: "Jordan Kim",   username: "jordankim"   },
  { uid: 3,  name: "Sam Patel",    username: "sampatel"    },
  { uid: 4,  name: "Casey Morgan", username: "caseymorgan" },
  { uid: 5,  name: "Taylor Swift", username: "taylorswift" },
  { uid: 6,  name: "Chris Wu",     username: "chriswu"     },
  { uid: 7,  name: "Dana Lee",     username: "danalee"     },
  { uid: 8,  name: "Morgan Gray",  username: "morgangray"  },
  { uid: 9,  name: "Jamie Cole",   username: "jamiecole"   },
  { uid: 10, name: "Reese Park",   username: "reesepark"   },
  { uid: 11, name: "Priya Nair",   username: "priyanair"   },
  { uid: 12, name: "Luca Bianchi", username: "lucabianchi" },
  { uid: 13, name: "Sofia Reyes",  username: "sofiareyes"  },
  { uid: 14, name: "Ethan Brooks", username: "ethanbrooks" },
  { uid: 15, name: "Mei Tanaka",   username: "meitanaka"   },
];



const FriendCard = ({ friend, onClick }) => (
    <button className="friend-card" onClick={() => onClick(friend)}>
        {/* <ProfilePicture /> */}
        <div>
        <div className="friend-card-name">{friend.name}</div>
        <div className="friend-card-username">@{friend.username}</div>
        </div>
    </button>
);



// -- Friends List/Search -------------------------------------------------------------
const FriendsList = ({ onFriendClick, onRequestsClick, requestCount }) => {
  const [search, setSearch] = useState("");

  const hasInput = search.trim().length > 0;

  const searchResults = hasInput
    ? ALL_USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div id="friends-page">

      <div id="search-bar-wrapper">
        <div id="search-bar">
          <button id="search-bar-requests-btn" onClick={onRequestsClick}>
            <UserRoundPlus />
            {requestCount > 0 && (
              <span id="search-bar-requests-count">{requestCount}</span>
            )}
          </button>

          <input
            id="search-bar-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search to add friends!"
          />

          <span id="search-bar-icon"><Search /></span>
        </div>

        {hasInput && (
          <div id="search-dropdown">
            {searchResults.length > 0 ? (
              searchResults.map(user => (
                <button
                  key={user.uid}
                  className="search-dropdown-item"
                  onClick={() => { onFriendClick(user); setSearch(""); }}
                >

                  <div className="search-dropdown-info">
                    <div className="search-dropdown-name">{user.name}</div>
                    <div className="search-dropdown-username">@{user.username}</div>
                  </div>
                </button>
              ))
            ) : (
              <div id="search-dropdown-empty">No users found</div>
            )}
          </div>
        )}
      </div>

      <div id="friends-grid">
        {friends.map(friend => (
          <FriendCard key={friend.uid} friend={friend} onClick={onFriendClick} />
        ))}
      </div>

    </div>
  );
};

// -- FriendRequestsModal -------------------------------------------------------------

const FriendRequestsModal = ({ requests, onClose, onFriendClick, onAccept, onDecline }) => (
    <div id="modal-overlay">
        <div id="requests-modal">
            <div id="requests-modal-header">
                <span id="requests-modal-title">Friend Requests</span>
                <button id="requests-modal-close" onClick={onClose}>x</button>
            </div>

            <div id="requests-grid">
                {requests.map(req =>  (
                    <button 
                        key={req.uid}
                        className="request-card"
                        onClick={() => onFriendClick(req)}
                    >
                        <div id="request-card-top">
                            <div id="request-card-name">{req.name}</div>
                            <div id="request-card-username">@{req.username}</div>
                        </div>

                        <div id="request-card-actions">
                            <button
                                id="request-card-accept"
                                onClick={e => { e.stopPropagation(); onAccept(req.uid); }}
                            >
                                <UserRoundCheck /> 
                            </button>
                            <button
                                id="request-card-decline"
                                onClick={e => { e.stopPropagation(); onDecline(req.uid); }}
                            >
                                <UserRoundX /> 
                            </button>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

function FriendsPage() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showRequests, setShowRequests] = useState(false);
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    
    const handleAccept  = id => setRequests(r => r.filter(req => req.id !== id));
    const handleDecline = id => setRequests(r => r.filter(req => req.id !== id));

    return (
        <div style={{ minWidth: "75vh" }}>
        <FriendsList
           // onFriendClick={setSelectedFriend}
            onRequestsClick={() => setShowRequests(true)}
            requestCount={INITIAL_REQUESTS.length}
        />

        {showRequests && (
            <FriendRequestsModal
                requests={requests}
                onClose={() => setShowRequests(false)}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
        )}
        </div>
    );
}

export default FriendsPage;