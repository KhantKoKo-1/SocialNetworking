document.addEventListener("DOMContentLoaded", () => {
    // const toggleDarkMode = document.getElementById("toggleDarkMode");
    // const tagFriendsInput = document.getElementById("tagFriends");
    // const friendsDropdown = document.getElementById("friendsDropdown");
    // const friends = ["John", "Doe", "Jane", "Alice", "Bob"]; // Example friend list
    const postButton = document.getElementById("postButton");
    const postContent = document.getElementById("postContent");
    const postsContainer = document.getElementById("postsContainer");
    const mediaUpload = document.getElementById("mediaUpload");
    const mediaPreviewContainer = document.getElementById("mediaPreviewContainer");

    // Dark Mode Toggle
    // toggleDarkMode.addEventListener("click", () => {
    //     const darkModeEnabled = document.body.classList.toggle("dark-mode");

    //     // Change navbar styles
    //     const container = document.querySelector(".container");
    //     container.classList.toggle("bg-dark", darkModeEnabled);
    //     container.classList.toggle("navbar-light", !darkModeEnabled);

    //     // Change the button text
    //     toggleDarkMode.textContent = darkModeEnabled ? "Light Mode" : "Dark Mode";

    //     // Toggle text color for all text elements
    //     document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach((element) => {
    //         element.style.color = darkModeEnabled ? "#ffffff" : "#000000"; // Adjust text color
    //     });
    // });

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
    // tagFriendsInput.addEventListener("input", () => {
    //     const query = tagFriendsInput.value.trim().toLowerCase();
    //     friendsDropdown.innerHTML = "";
    //     if (query) {
    //         const matchedFriends = friends.filter((f) => f.toLowerCase().includes(query));
    //         if (matchedFriends.length) {
    //             friendsDropdown.style.display = "block";
    //             matchedFriends.forEach((friend) => {
    //                 const li = document.createElement("li");
    //                 li.className = "dropdown-item";
    //                 li.textContent = friend;
    //                 li.addEventListener("click", () => {
    //                     tagFriendsInput.value = friend;
    //                     friendsDropdown.style.display = "none";
    //                 });
    //                 friendsDropdown.appendChild(li);
    //             });
    //         } else {
    //             friendsDropdown.style.display = "none";
    //         }
    //     } else {
    //         friendsDropdown.style.display = "none";
    //     }
    // });

    // Post Button Logic
    postButton.addEventListener("click", () => {
        const content = postContent.value.trim();
        // const taggedFriend = tagFriendsInput.value.trim();
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
                        <h6 class="card-subtitle">
                            John Doe <span class="text-primary ms-2">• Just now</span>
                            <p class="text-primary mt-2"><i class="fa-solid fa-user-group fa-lg"></i></p>
                        </h6>
                        <div class="ms-auto dropdown mb-3">
                                <p class="mb-0" role="button" id="ellipsisDropdown" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                                </p>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ellipsisDropdown">
                                    <li>
                                        <div class="card" style="width: 11rem;">
                                            <div class="card-body">
                                                <button type="button" class="btn btn-info w-100 text-start"
                                                    data-bs-dismiss="modal"><i class="fa-solid fa-bookmark fa-lg"></i>
                                                    Save post</button>
                                                <hr>
                                                <button type="button" class="btn btn-primary w-100 text-start mb-1"
                                                    data-bs-dismiss="modal"><i
                                                        class="fa-solid fa-circle-xmark fa-lg"></i> Hide post</button>
                                                <button type="button" class="btn btn-warning w-100 text-start mb-1"
                                                    data-bs-dismiss="modal"><i class="fa-solid fa-bug-slash fa-lg"></i>
                                                    Report post</button>
                                                <button type="button" class="btn btn-danger w-100 text-start"
                                                    data-bs-dismiss="modal"><i class="fa-solid fa-ban fa-lg"></i>
                                                    Block</button>
                                                <!-- <p class="fs-6 fw-bold"></p> -->
                                                <!-- <h5 class="card-title">Dropdown Card</h5>
                                            <p class="card-text">This is the new card displayed when the ellipsis is clicked.</p>
                                            <a href="#" class="btn btn-primary">Take Action</a> -->
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                        </div>
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
                                            <div class="reaction-bar d-flex justify-content-start align-items-center">
                            <button class="btn btn-light react-btn me-2">👎</button>
                            <button class="btn btn-light react-btn me-2">👍</button>
                            <button class="btn btn-light react-btn me-2">❤️</button>
                            <button class="btn btn-light react-btn me-2" id="showCommentsBtn"><i
                                    class="fa-solid fa-comment fa-lg"></i></button>
                            <span class="reaction-count ms-auto me-3">Reactions: 0</span>
                            <span class="comment-count me-3">Comment: 0</span>
                            <!-- <span class="share-count">Share: 0</span> -->
                        </div>
                        <section class="content-item mt-4" id="comments">
                            <hr>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-8">
                                        <form>
                                            <h5>New Comment</h5>
                                            <div class="row">
                                                <div class="col-10">
                                                    <div class="mb-3">
                                                        <textarea class="form-control" id="message"
                                                            placeholder="Your message" required></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-2">
                                                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                                                </div>
                                            </div>
                                        </form>

                                        <h5>4 Comments</h5>

                                        <!-- COMMENT 1 - START -->
                                        <div class="d-flex mb-4">
                                            <img class="rounded-circle me-3"
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar"
                                                style="width: 50px; height: 50px;">
                                            <div>
                                                <h5>John Doe</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                <div>
                                                    <small class="text-muted me-3"><i class="bi bi-calendar3"></i>
                                                        27/02/2014</small>
                                                    <small class="text-muted"><i class="bi bi-hand-thumbs-up"></i>
                                                        13</small>
                                                </div>
                                                <div>
                                                    <a href="#" class="text-primary me-2">Like</a>
                                                    <a href="#" class="text-primary">Reply</a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- COMMENT 1 - END -->

                                        <!-- Add other comments here -->
                                    </div>
                                </div>
                            </div>
                        </section>
                </div>
            </div>`;

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

    document.getElementById('showCommentsBtn').addEventListener('click', function() {
        const commentsSection = document.getElementById('comments');
            if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
                commentsSection.style.display = 'block'; // Show the comments section
            } else {
                commentsSection.style.display = 'none'; // Hide the comments section
            }
    });

});

