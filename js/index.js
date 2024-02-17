// main varibales

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

async function getRepos() {
  if (
    /\B@((?!.*(-){2,}.*)[a-z0-9][a-z0-9-]{0,38}[a-z0-9])/gi.test(theInput.value)
  ) {
    reposData.innerHTML = "<span>Please Write Correct Github Username. </span>";
  } else {
    try {
        const response = await fetch(
            `https://api.github.com/users/${theInput.value}/repos`
          ).then((res) => res.json());
          if (response.message == "Not Found") {
            reposData.innerHTML =
              "<span>Please Write Correct Github Username. </span>";
          } else {
            reposData.innerHTML = "";
            response.forEach((repo) => {
              // ===========================create mainDiv========================================
              let mainDiv = document.createElement("div");
              // ========================create repo name text====================================
              let repoName = document.createTextNode(repo.name);
              // append the text to main div
              mainDiv.appendChild(repoName);
              // ==========================create repo url==========================================
              let theUrl = document.createElement("a");
              // create repo Url text
              let theUrlText = document.createTextNode("Visit");
      
              // append the urlText to anchor tag
              theUrl.appendChild(theUrlText);
              // add the Url
              theUrl.href = `${repo.html_url}`;
              // set Attribute target blank
              theUrl.setAttribute("target", "_blank");
              // append  url anchor to mainDiv
              mainDiv.appendChild(theUrl);
              // =============================create the stars count text ============================
              let starSpan = document.createElement("span");
              // create stars text
              let starsText = document.createTextNode(
                `Stars ${repo.stargazers_count}`
              );
              // append stars text to starSpan
              starSpan.appendChild(starsText);
              // append  starSpan to mainDiv
              mainDiv.appendChild(starSpan);
              //   add class on mainDiv
              mainDiv.className = "repo-box";
              // =========================append mainDiv to container=================================
              reposData.appendChild(mainDiv);
            });
          }
    } catch (error) {
        console.log(error);
    }

    
  }
}
