// Define all functions in the global scope
document.addEventListener("DOMContentLoaded", () => {
  const extractEmail = (data) => {
    const match = data.match(
      /(?:<)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?:>)?/
    );
    return match ? match[1] : null;
  };

  // Function to fetch and categorize emails
  async function fetchEmails() {
    try {
      const response = await fetch(
        "https://reachinbox-qhse.onrender.com/api/emails"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const emails = await response.json();

      const interestedList = document.getElementById("interested-list");
      const notInterestedList = document.getElementById("not-interested-list");
      const moreInfoList = document.getElementById("more-info-list");

      // Clear existing lists
      interestedList.innerHTML = "";
      notInterestedList.innerHTML = "";
      moreInfoList.innerHTML = "";

      emails.forEach((email) => {
        const emailItem = document.createElement("div");
        emailItem.classList.add("email-item");
        emailItem.innerHTML = `
            <div class="email-summary">
              <strong>From:</strong> ${email.from}<br>
              <strong>Subject:</strong> ${email.subject}<br>
              <button onclick="viewEmail('${email.id}')">View</button>
            </div>
          `;

        if (email.category === "Interested") {
          interestedList.appendChild(emailItem);
        } else if (email.category === "Not Interested") {
          notInterestedList.appendChild(emailItem);
        } else {
          moreInfoList.appendChild(emailItem);
        }
      });
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  }

  // Function to view email details
  window.viewEmail = async function (emailId) {
    try {
      const response = await fetch(
        `https://reachinbox-qhse.onrender.com/email/${emailId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const email = await response.json();
      let emailArray = [];
      let emid = extractEmail(email.from); // Extract email ID from "From" field
      emailArray.push(emid);
      document.getElementById("email-content").innerHTML = `
        <h2>${email.subject}</h2>
        <p><strong>From:</strong> ${emid}</p>
        <div>${email.body}</div>
        <h3>Suggested Response</h3>
        <div id="suggested-response"></div>
        <button id="send-response-btn" onclick="sendResponse('${emid}')">Send Response</button>
      `;

      // Get suggested response
      getSuggestion(email.body);
    } catch (error) {
      console.error("Error fetching email details:", error);
    }
  };

  // Function to get response suggestion from OpenAI
  async function getSuggestion(emailContent) {
    try {
      const response = await fetch(
        "https://reachinbox-qhse.onrender.com/suggest-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: emailContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      document.getElementById("suggested-response").innerText = data.suggestion;
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  }

  // Function to send response
  window.sendResponse = async function (email) {
    // Get suggested response
    const suggestedResponse =
      document.getElementById("suggested-response").innerText;

    try {
      const response = await fetch(
        "https://reachinbox-qhse.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, response: suggestedResponse }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Response sent successfully!");
    } catch (error) {
      console.log("Error sending response:", error);
    }
  };

  // Initial fetch of emails
  fetchEmails();
});
