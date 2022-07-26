const jobsBoard = document.querySelector("#jobs");
const filtersContainer = document.querySelector("#filters");

const removeFilterButtons = document.querySelectorAll(".remove-filter");
const clearFilters = document.querySelector("#clear-filters");

document.addEventListener("DOMContentLoaded", async () => {
  const jobs = await getJobsData();
  createJobCards(jobs);
  console.log(jobs);
});

const getJobsData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
};

const createJobCards = (jobs) => {
  jobs.forEach((job) => {
    const jobCard = document.createElement("article");
    jobCard.setAttribute("class", `job-card ${job.featured ? "featured" : ""}`);

    const companyLogo = document.createElement("div");
    companyLogo.setAttribute("class", "company-logo");
    const logo = document.createElement("img");
    logo.src = job.logo;
    logo.alt = job.company;
    companyLogo.append(logo);
    jobCard.append(companyLogo);

    const jobDesc = document.createElement("div");
    jobDesc.classList.add("job-desc");
    const company = document.createElement("div");
    company.classList.add("company");
    const companyDetails = document.createElement("div");
    companyDetails.classList.add("company-details");
    const companyName = document.createElement("h2");
    companyName.classList.add("company-name");
    companyName.innerText = job.company;
    const tags = document.createElement("div");
    tags.classList.add("tags");
    jobDesc.append(companyName);
    jobDesc.append(tags);
    jobDesc.append(company);

    jobCard.append(jobDesc);

    if (job.new) {
      const newJob = document.createElement("span");
      newJob.classList.add("tag");
      newJob.innerText = "New!";
      tags.append(newJob);
    }
    if (job.featured) {
      const featured = document.createElement("span");
      featured.classList.add("tag");
      featured.innerText = "Featured";
      tags.append(featured);
    }

    const position = document.createElement("h3");
    position.classList.add("postion");
    position.innerText = job.position;
    company.append(position);

    const details = document.createElement("p");
    details.classList.add("details");
    details.innerText = `${job.postedAt} - ${job.contract} - ${job.location}`;
    company.append(details);

    const tools = document.createElement("div");
    tools.classList.add("tools");
    jobDesc.append(tools);

    for (let i = 0; i < job.tools.length; i++) {
      const tool = document.createElement("span");
      tool.innertext = job.tools[i];
      tools.append(tool);
    }
    //     `<article class="job-card ${job.featured ? "featured" : ""}">
    //     <div class="company-logo">
    //       <img src="${job.logo}" alt="${job.company}" />
    //     </div>
    //     <div class="job-desc">
    //       <div class="company">
    //         <div class="company-details">
    //           <h2 class="company-name">Photosnap</h2>
    //           <div class="tags">
    //             <span class="tag">New!</span>
    //             <span class="tag">Featured</span>
    //           </div>
    //         </div>
    //         <h3 class="position">Senior Frontend Developer</h3>
    //         <p class="details">
    //           1d ago &centerdot; Full Time &centerdot; USA only
    //         </p>
    //       </div>
    //       <div class="tools">
    //         <span>Frontend</span>
    //         <span>Senior</span>
    //         <span>HTML</span>
    //         <span>CSS</span>
    //         <span>JavaScript</span>
    //       </div>
    //     </div>
    //   </article>`;
    jobsBoard.append(jobCard);
  });
};
