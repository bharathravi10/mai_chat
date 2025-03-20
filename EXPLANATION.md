# **Real-Time Chat Application**

This document explains the design choices, challenges faced, solutions implemented, and future improvements for the real-time chat application built using **Next.js (frontend)** and **Express.js with WebSocket (backend).**

---

## **Design Choices**

### 1. **Component-Based Structure**

- The application follows a **modular structure** using React functional components to improve code readability and maintainability.
- The main components are:
  - `Chat.tsx` – Manages state and WebSocket connection.
  - `UsernameInput.tsx` – Handles the user input for the username.
  - `MessageDisplay.tsx` – Displays chat messages and typing notifications.
  - `MessageInput.tsx` – Handles message input and sending.

### 2. **Styling**

- Used **Tailwind CSS** for styling to ensure fast development and consistent design.
- Followed a **WhatsApp-like theme** with green highlights and rounded edges for a modern look.

### 3. **WebSocket for Real-Time Communication**

- Established a persistent WebSocket connection between client and server.
- Events handled:
  - `message` – For sending and receiving messages.
  - `typing` – For displaying typing notifications.

### 4. **State Management**

- Used React `useState` and `useRef` to manage state effectively:
  - Messages stored in state for quick rendering.
  - `useRef` for persistent WebSocket reference across renders.

---

## **Challenges and Solutions**

### 1. **Preventing Empty Messages**

**Challenge:**  
Users could send empty messages or names, leading to inconsistent data.

**Solution:**

- Implemented a validation check before sending messages:
  - Prevent sending if either the message or username is empty.
  - Used a toast-style notification to inform the user.

---

### 2. **Connection Loss and Auto-Reconnection**

**Challenge:**  
WebSocket connection could be lost due to network issues or server downtime.

**Solution:**

- Implemented automatic reconnection using `setTimeout()`:
  - When the connection is lost, a reconnection attempt starts after 2 seconds.
  - Updated UI to notify the user about the connection status.

---

### 3. **Capitalization of Name and Message**

**Challenge:**  
Usernames and messages appeared inconsistent due to inconsistent casing.

**Solution:**

- Created a `capitalize()` utility function:
  - Ensured that the first letter of every word is capitalized before displaying.

---

### 4. **Notification for Errors and Connection Status**

**Challenge:**  
Browser `alert()` was disrupting the user experience.

**Solution:**

- Replaced `alert()` with a custom toast-style notification:
  - Displayed using state and `setTimeout()` for auto-dismissal.
  - Ensured a consistent user experience with modern UI.

---

## **Future Improvements**

### 1. **Message Delivery Status**

- Add double-tick indicators to show message delivery and read status.

---

### 2. **User Online Status**

- Display a green dot next to the username when a user is online.

---

### 3. **File and Image Sharing**

- Add support for file and image uploads in the chat.

---

### 4. **End-to-End Encryption**

- Implement encryption for secure message delivery.

---

### 5. **User Profile and Avatars**

- Allow users to upload and display profile pictures.

---

### 6. **Group Chat**

- Add support for creating and managing group chats.

---

## **Conclusion**

The real-time chat application is now functional with core features like real-time messaging, typing notifications, and connection management. The current implementation is scalable and easy to extend with future improvements like message status, file sharing, and encryption.
