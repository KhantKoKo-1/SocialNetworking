document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const tagFriendsInput = document.getElementById("tagFriends");
    const friendsDropdown = document.getElementById("friendsDropdown");
    const friends = ["John", "Doe", "Jane", "Alice", "Bob"]; // Example friend list
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const postsContainer = document.getElementById("postsContainer");
    const mediaUpload = document.getElementById("mediaUpload");
    const mediaPreviewContainer = document.getElementById("mediaPreviewContainer");

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", () => {
        const darkModeEnabled = document.body.classList.toggle("dark-mode");

        // Change navbar styles
        const container = document.querySelector(".container");
        container.classList.toggle("bg-dark", darkModeEnabled);
        container.classList.toggle("navbar-light", !darkModeEnabled);

        // Change the button text
        toggleDarkMode.textContent = darkModeEnabled ? "Light Mode" : "Dark Mode";

        // Toggle text color for all text elements
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach((element) => {
            element.style.color = darkModeEnabled ? "#ffffff" : "#000000"; // Adjust text color
        });
    });

    // Media Upload and Preview
    mediaUpload.addEventListener("change", function () {
        mediaPreviewContainer.innerHTML = ""; // Clear existing previews
        Array.from(this.files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Create a wrapper for the preview with a close button
                const previewWrapper = document.createElement("div");
                previewWrapper.style.position = "relative";
                previewWrapper.style.display = "inline-block";
                previewWrapper.style.margin = "5px";

                // Determine if the file is an image or video
                const mediaElement = document.createElement(file.type.startsWith("image/") ? "img" : "video");
                mediaElement.src = e.target.result;
                mediaElement.className = "rounded shadow-sm";
                mediaElement.style.width = "100px";
                mediaElement.style.height = "100px";
                mediaElement.style.objectFit = "cover";

                // Add controls if it's a video
                if (file.type.startsWith("video/")) {
                    mediaElement.controls = true;
                }

                // Create a cross button
                const removeButton = document.createElement("button");
                removeButton.textContent = "✖";
                removeButton.style.position = "absolute";
                removeButton.style.top = "5px";
                removeButton.style.right = "5px";
                removeButton.style.backgroundColor = "red";
                removeButton.style.color = "white";
                removeButton.style.border = "none";
                removeButton.style.borderRadius = "50%";
                removeButton.style.cursor = "pointer";

                // Add event listener to remove the preview
                removeButton.addEventListener("click", () => {
                    previewWrapper.remove();
                });

                // Append media element and remove button to the wrapper
                previewWrapper.appendChild(mediaElement);
                previewWrapper.appendChild(removeButton);

                // Append the wrapper to the preview container
                mediaPreviewContainer.appendChild(previewWrapper);
            };
            reader.readAsDataURL(file); // Read file as a data URL
        });
    });

    // Friend Tagging Input
    tagFriendsInput.addEventListener("input", () => {
        const query = tagFriendsInput.value.trim().toLowerCase();
        friendsDropdown.innerHTML = "";
        if (query) {
            const matchedFriends = friends.filter((f) => f.toLowerCase().includes(query));
            if (matchedFriends.length) {
                friendsDropdown.style.display = "block";
                matchedFriends.forEach((friend) => {
                    const li = document.createElement("li");
                    li.className = "dropdown-item";
                    li.textContent = friend;
                    li.addEventListener("click", () => {
                        tagFriendsInput.value = friend;
                        friendsDropdown.style.display = "none";
                    });
                    friendsDropdown.appendChild(li);
                });
            } else {
                friendsDropdown.style.display = "none";
            }
        } else {
            friendsDropdown.style.display = "none";
        }
    });

    // Post Button Logic
    postButton.addEventListener("click", () => {
        const content = postContent.value.trim();
        const taggedFriend = tagFriendsInput.value.trim();
        const images = Array.from(mediaUpload.files);

        if (!content && !images.length) {
            alert("Please add content or upload images.");
            return;
        }

        const postHTML = `
    <div class="card post-card shadow-sm">
        <div class="card-body">
            <div class="d-flex align-items-center mb-3">
                <img src="images/profile-pic.png" alt="Profile Picture" class="rounded-circle me-3" style="width: 50px; height: 50px;">
                <h6 class="card-subtitle mb-2 text-muted">Anonymous <span class="text-primary">• Just now</span></h6>
            </div>
            <p class="card-text truncated">${content}</p>
            <button class="btn btn-link see-more-btn p-0" style="display: none;">See More</button>
            ${
                images.length
                    ? `<div class="image-gallery facebook-grid facebook-grid-${Math.min(images.length, 3)}">
                        ${images
                            .slice(0, 3)
                            .map((img, index) => `
                                <div class="grid-item ${
                                    images.length === 2 ? "big" : index === 0 ? "big" : "small"
                                }">
                                    <img src="${URL.createObjectURL(img)}" class="img-fluid rounded">
                                </div>
                            `)
                            .join("")}
                        ${
                            images.length > 3
                                ? `<div class="see-more-overlay">+${images.length - 3}</div>`
                                : ""
                        }
                    </div>`
                    : ""
            }
            ${
                friends
                    ? `<p class="card-text text-muted"><strong>Tagged:</strong> ${friends}</p>`
                    : ""
            }
            <div class="reaction-bar d-flex justify-content-start align-items-center">
                <button class="btn btn-light react-btn me-2">👍</button>
                <button class="btn btn-light react-btn me-2">❤️</button>
                <span class="reaction-count ms-auto">Reactions: 0</span>
            </div>
        </div>
    </div>
`;

        postsContainer.insertAdjacentHTML("afterbegin", postHTML);

        // Apply truncation logic to the new post
        document.querySelectorAll(".card-text.truncated").forEach((element) => {
            const seeMoreBtn = element.nextElementSibling;
            if (element.scrollHeight > element.clientHeight) {
                seeMoreBtn.style.display = "inline";
                seeMoreBtn.addEventListener("click", () => {
                    element.classList.remove("truncated");
                    seeMoreBtn.style.display = "none"; // Hide the button after expanding
                });
            }
        });

        // Clear inputs
        postContent.value = "";
        tagFriendsInput.value = "";
        mediaUpload.value = "";
        mediaPreviewContainer.innerHTML = "";
    });
});
